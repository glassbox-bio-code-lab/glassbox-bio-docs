---
title: CLI Reference Computational Safety Diligence
description: Command-line interface reference for operators or power users.
sidebar_position: 3
tags:
  - computational-safety-diligence
---

# CLI Reference

Run these commands from the `github/` directory unless noted otherwise.

## Shared defaults

- `APP_NAME=glassbox-mol-audit`
- `NAMESPACE=glassbox-mol-audit`
- `CHART_DIR=./manifest/chart`
- `RUN_MODE=standard`
- `INPUT_ROOT=./e2e/sample_input`
- `OUTPUT_DIR=./e2e/downloads`
- `PVC_NAME=glassbox-mol-audit-data`
- `ENTITLEMENT_URL=https://glassbox-seal-662656813262.us-central1.run.app`
- `ENTITLEMENT_AUTH_MODE=google`
- `ENTITLEMENT_AUDIENCE=$(ENTITLEMENT_URL)`

## `make help`

Syntax:

```bash
make help
```

Arguments:

- none

Defaults:

- prints the reviewer workflow, wrapper targets, and the one-command standard/deep paths declared in `Makefile`

Example:

```bash
make help
```

## `python modules/gbx_core_runner_v3.py`

Syntax:

```bash
python ../modules/gbx_core_runner_v3.py --project-id <project_id> [options]
```

Arguments:

- `--project-id`: required project folder name under the input root
- `--input-root`: optional input root; defaults to `GBX_INPUT_ROOT` or `/data/input`
- `--output-dir`: optional output root; defaults to `GBX_OUTPUT_DIR` or `/data/output`
- `--category-preset`: optional scoring preset selector; defaults to `GBX_CATEGORY_PRESET` or `auto`
- `--input-profile-json`: optional inline JSON string or JSON file path; defaults to `GBX_INPUT_PROFILE_JSON` or empty string

Defaults:

- reads `01_sources/sources.json` from `<input-root>/<project-id>/`
- requires `GBX_CATEGORY_ID` to be set in the runtime environment before the run starts
- when the container image is used, the same entrypoint is typically invoked as `python -m app.gbx_core_runner_v3`

Example:

```bash
GBX_CATEGORY_ID=SMALL_MOLECULE__STRUCTURE_PRESENT__NO_MD_TRAJ \
python ../modules/gbx_core_runner_v3.py \
  --project-id test \
  --input-root ./e2e/sample_input \
  --output-dir ./e2e/downloads
```

## `make review-preflight`

Syntax:

```bash
make review-preflight [CHART_DIR=<path>]
```

Arguments:

- `CHART_DIR`: optional Helm chart path; default `./manifest/chart`

Defaults:

- runs `helm lint`
- renders the default, standard, deep, and job-enabled chart variants
- checks shell syntax for `*.sh`
- fails on CRLF shell scripts
- verifies required customer docs, internal release docs, and sample input files are present

Example:

```bash
make review-preflight
```

## `make deploy-manifest-infra`

Syntax:

```bash
make deploy-manifest-infra RUN_MODE=<standard|deep> [options]
```

Arguments:

- `RUN_MODE`: optional; default `standard`
- `STANDARD_IMAGE_TAG` or `STANDARD_IMAGE_DIGEST`: standard image selector
- `DEEP_IMAGE_TAG` or `DEEP_IMAGE_DIGEST`: deep image selector
- `WORKLOAD_IDENTITY_GSA`: optional; when set, enables Workload Identity wiring
- `ENTITLEMENT_URL`: optional; default hosted entitlement URL
- `ENTITLEMENT_AUTH_MODE`: optional; default `google`
- `ENTITLEMENT_AUDIENCE`: optional; default `$(ENTITLEMENT_URL)`

Defaults:

- deploys infra only with `job.enabled=false`
- standard mode applies `values-standard.yaml`
- deep mode applies `values-standard.yaml` plus `values-gpu.yaml`
- reuses the existing PVC storage class and size when the release PVC already exists

Example:

```bash
make deploy-manifest-infra \
  RUN_MODE=standard \
  STANDARD_IMAGE_DIGEST=sha256:c48760f3e5f089fe0c35f2f11c6d6c876b8cc210632913bef82b98537faae065 \
  WORKLOAD_IDENTITY_GSA=your-sa@project.iam.gserviceaccount.com
```

## `make stage-manifest-input`

Syntax:

```bash
make stage-manifest-input PROJECT_ID=<project_id> [options]
```

Arguments:

- `PROJECT_ID`: required project folder name under `INPUT_ROOT`
- `RUN_MODE`: optional; default `standard`
- `INPUT_ROOT`: optional; default `./e2e/sample_input`
- `PVC_LOADER_POD`: optional; default `pvc-loader`
- `HELPER_IMAGE_REPO`: optional; default `alpine`
- `HELPER_IMAGE_TAG` or `HELPER_IMAGE_DIGEST`: optional helper image selector; default tag `3.20`

Defaults:

- copies `$(INPUT_ROOT)/$(PROJECT_ID)` into `/data/input/$(PROJECT_ID)` on the shared volume
- creates and then removes a short-lived helper pod for the copy operation

Example:

```bash
make stage-manifest-input PROJECT_ID=test
```

## `make deploy-manifest-job`

Syntax:

```bash
make deploy-manifest-job PROJECT_ID=<project_id> CATEGORY_ID=<category_id> WORKLOAD_IDENTITY_GSA=<gsa> [options]
```

Arguments:

- `PROJECT_ID`: required
- `CATEGORY_ID`: required runtime category identifier
- `WORKLOAD_IDENTITY_GSA`: required
- `RUN_MODE`: optional; default `standard`
- `RUN_ID`: optional; default `reviewer_<run_mode>_<utc timestamp>`
- `ENTITLEMENT_URL`: optional; default hosted entitlement URL
- `ENTITLEMENT_AUTH_MODE`: optional; default `google`
- `ENTITLEMENT_AUDIENCE`: optional; default `$(ENTITLEMENT_URL)`
- mode-specific image tag or digest variables as in `deploy-manifest-infra`

Defaults:

- creates the Helm release with `job.enabled=true`
- waits up to `7200s` for Job completion
- writes the resolved run id to `RUN_ID_FILE`
- standard wrapper uses `./.last_manifest_run_id.standard`
- deep wrapper uses `./.last_manifest_run_id.deep`

Example:

```bash
make deploy-manifest-job \
  PROJECT_ID=test \
  CATEGORY_ID=SMALL_MOLECULE__STRUCTURE_PRESENT__NO_MD_TRAJ \
  WORKLOAD_IDENTITY_GSA=your-sa@project.iam.gserviceaccount.com
```

## `make fetch-manifest-output`

Syntax:

```bash
make fetch-manifest-output [RUN_ID=<run_id>] [options]
```

Arguments:

- `RUN_ID`: optional; if omitted, reads the last value from `RUN_ID_FILE`
- `RUN_MODE`: optional; default `standard`
- `RUN_ID_FILE`: optional; default `./.last_manifest_run_id`
- `OUTPUT_DIR`: optional; default `./e2e/downloads`
- `PVC_LOADER_POD`: optional; default `pvc-loader`
- `HELPER_IMAGE_REPO`: optional; default `alpine`
- `HELPER_IMAGE_TAG` or `HELPER_IMAGE_DIGEST`: optional helper image selector; default tag `3.20`

Defaults:

- copies `/data/output/<run_id>` from the shared volume to `$(OUTPUT_DIR)/<run_id>`
- removes the helper pod after download

Example:

```bash
make fetch-manifest-output-standard
```

## `make deploy-manifest-infra-standard`

Syntax:

```bash
make deploy-manifest-infra-standard [options]
```

Arguments:

- same arguments as `make deploy-manifest-infra`

Defaults:

- hard-codes `RUN_MODE=standard`

Example:

```bash
make deploy-manifest-infra-standard \
  STANDARD_IMAGE_DIGEST=sha256:c48760f3e5f089fe0c35f2f11c6d6c876b8cc210632913bef82b98537faae065 \
  WORKLOAD_IDENTITY_GSA=your-sa@project.iam.gserviceaccount.com
```

## `make stage-manifest-input-standard`

Syntax:

```bash
make stage-manifest-input-standard PROJECT_ID=<project_id> [options]
```

Arguments:

- same arguments as `make stage-manifest-input`

Defaults:

- hard-codes `RUN_MODE=standard`

Example:

```bash
make stage-manifest-input-standard PROJECT_ID=test
```

## `make deploy-manifest-job-standard`

Syntax:

```bash
make deploy-manifest-job-standard PROJECT_ID=<project_id> CATEGORY_ID=<category_id> WORKLOAD_IDENTITY_GSA=<gsa> [options]
```

Arguments:

- same arguments as `make deploy-manifest-job`

Defaults:

- hard-codes `RUN_MODE=standard`
- writes the last run id to `./.last_manifest_run_id.standard`

Example:

```bash
make deploy-manifest-job-standard \
  PROJECT_ID=test \
  CATEGORY_ID=SMALL_MOLECULE__STRUCTURE_PRESENT__NO_MD_TRAJ \
  WORKLOAD_IDENTITY_GSA=your-sa@project.iam.gserviceaccount.com
```

## `make fetch-manifest-output-standard`

Syntax:

```bash
make fetch-manifest-output-standard [RUN_ID=<run_id>] [options]
```

Arguments:

- same arguments as `make fetch-manifest-output`

Defaults:

- hard-codes `RUN_MODE=standard`
- reads `./.last_manifest_run_id.standard` when `RUN_ID` is not supplied

Example:

```bash
make fetch-manifest-output-standard
```

## `make deploy-manifest-infra-deep`

Syntax:

```bash
make deploy-manifest-infra-deep [options]
```

Arguments:

- same arguments as `make deploy-manifest-infra`

Defaults:

- hard-codes `RUN_MODE=deep`
- applies the GPU values overlay in addition to the standard values overlay

Example:

```bash
make deploy-manifest-infra-deep \
  DEEP_IMAGE_DIGEST=sha256:7754aa922cffe73963027d20d9b71aa0edcc015f1ae8445ec021b6032b84db28 \
  WORKLOAD_IDENTITY_GSA=your-sa@project.iam.gserviceaccount.com
```

## `make stage-manifest-input-deep`

Syntax:

```bash
make stage-manifest-input-deep PROJECT_ID=<project_id> [options]
```

Arguments:

- same arguments as `make stage-manifest-input`

Defaults:

- hard-codes `RUN_MODE=deep`

Example:

```bash
make stage-manifest-input-deep PROJECT_ID=test
```

## `make deploy-manifest-job-deep`

Syntax:

```bash
make deploy-manifest-job-deep PROJECT_ID=<project_id> CATEGORY_ID=<category_id> WORKLOAD_IDENTITY_GSA=<gsa> [options]
```

Arguments:

- same arguments as `make deploy-manifest-job`

Defaults:

- hard-codes `RUN_MODE=deep`
- writes the last run id to `./.last_manifest_run_id.deep`

Example:

```bash
make deploy-manifest-job-deep \
  PROJECT_ID=test \
  CATEGORY_ID=SMALL_MOLECULE__STRUCTURE_PRESENT__NO_MD_TRAJ \
  WORKLOAD_IDENTITY_GSA=your-sa@project.iam.gserviceaccount.com
```

## `make fetch-manifest-output-deep`

Syntax:

```bash
make fetch-manifest-output-deep [RUN_ID=<run_id>] [options]
```

Arguments:

- same arguments as `make fetch-manifest-output`

Defaults:

- hard-codes `RUN_MODE=deep`
- reads `./.last_manifest_run_id.deep` when `RUN_ID` is not supplied

Example:

```bash
make fetch-manifest-output-deep
```

## `make reviewer-run-standard`

Syntax:

```bash
make reviewer-run-standard PROJECT_ID=<project_id> CATEGORY_ID=<category_id> STANDARD_IMAGE_DIGEST=<sha256> WORKLOAD_IDENTITY_GSA=<gsa> [options]
```

Arguments:

- `PROJECT_ID`: required
- `CATEGORY_ID`: required
- `STANDARD_IMAGE_DIGEST` or `STANDARD_IMAGE_TAG`: required in practice for explicit reviewer installs
- `WORKLOAD_IDENTITY_GSA`: required
- all optional shared variables from the step-by-step targets

Defaults:

- runs `deploy-manifest-infra-standard`
- runs `stage-manifest-input-standard`
- runs `deploy-manifest-job-standard`
- runs `fetch-manifest-output-standard`

Example:

```bash
make reviewer-run-standard \
  PROJECT_ID=test \
  CATEGORY_ID=SMALL_MOLECULE__STRUCTURE_PRESENT__NO_MD_TRAJ \
  STANDARD_IMAGE_DIGEST=sha256:c48760f3e5f089fe0c35f2f11c6d6c876b8cc210632913bef82b98537faae065 \
  WORKLOAD_IDENTITY_GSA=your-sa@project.iam.gserviceaccount.com
```

## `make reviewer-run-deep`

Syntax:

```bash
make reviewer-run-deep PROJECT_ID=<project_id> CATEGORY_ID=<category_id> DEEP_IMAGE_DIGEST=<sha256> WORKLOAD_IDENTITY_GSA=<gsa> [options]
```

Arguments:

- `PROJECT_ID`: required
- `CATEGORY_ID`: required
- `DEEP_IMAGE_DIGEST` or `DEEP_IMAGE_TAG`: required in practice for explicit reviewer installs
- `WORKLOAD_IDENTITY_GSA`: required
- all optional shared variables from the step-by-step targets

Defaults:

- runs `deploy-manifest-infra-deep`
- runs `stage-manifest-input-deep`
- runs `deploy-manifest-job-deep`
- runs `fetch-manifest-output-deep`

Example:

```bash
make reviewer-run-deep \
  PROJECT_ID=test \
  CATEGORY_ID=SMALL_MOLECULE__STRUCTURE_PRESENT__NO_MD_TRAJ \
  DEEP_IMAGE_DIGEST=sha256:7754aa922cffe73963027d20d9b71aa0edcc015f1ae8445ec021b6032b84db28 \
  WORKLOAD_IDENTITY_GSA=your-sa@project.iam.gserviceaccount.com
```

## `./tools/clean_uninstall.sh`

Syntax:

```bash
./tools/clean_uninstall.sh --namespace <ns> --release <name> [options]
```

Arguments:

- `--namespace`: required Kubernetes namespace
- `--release`: required Helm release name
- `--delete-pvc`: optional; delete `<release>-data`
- `--delete-namespace`: optional; delete the namespace after uninstall
- `--delete-reporting-secret`: optional; delete the Marketplace reporting secret
- `--reporting-secret`: optional explicit reporting secret name
- `--timeout`: optional per-phase timeout in seconds; default `180`
- `--yes`: optional non-interactive mode
- `-h`, `--help`: show usage

Defaults:

- safe default keeps the PVC, namespace, and reporting secret
- removes leftover helper pods `gbx-input-writer` and `gbx-output-reader`

Example:

```bash
./tools/clean_uninstall.sh \
  --namespace glassbox-mol-audit \
  --release glassbox-mol-audit \
  --yes
```
