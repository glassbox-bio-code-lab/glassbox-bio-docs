---
title: CLI Reference Preflight
description: Command-line interface reference for operators or power users.
sidebar_position: 3
---

# CLI Reference

Run these commands from the product root unless noted otherwise.

In `preflight_v2` and exported customer bundles, the chart path is `chart/preflight`.
Some standalone bundle copies also mirror the same chart at `helm/glassbox-preflight`.
Only the chart path changes.

## Shared defaults

- Helm release name: `glassbox-preflight`
- Namespace examples in this page: `glassbox-preflight`
- `service.type=ClusterIP`
- `service.port=8080`
- `app.authDisabled=false`
- `storage.type=pvc`
- `storage.pvc.size=20Gi`
- `storage.pvc.accessMode=ReadWriteOnce`
- default runner image: `us-docker.pkg.dev/glassbox-bio-public/glassbox-bio-molecular-audit/glassbox-mol-audit:1.0.0`

## `helm template glassbox-preflight chart/preflight`

Syntax:

```bash
helm template glassbox-preflight chart/preflight [options]
```

Arguments:

- `glassbox-preflight`: release name used for rendered object names
- `chart/preflight`: chart path in `preflight_v2` and exported bundles
- `-f <values-file>`: optional values overlay
- `--set key=value`: optional inline override

Defaults:

- renders the chart with the values declared in `chart/preflight/values.yaml`
- use `./helm/glassbox-preflight` instead of `chart/preflight` only when working from a standalone bundle that keeps that alternate path

Example:

```bash
helm template glassbox-preflight chart/preflight
```

## `helm upgrade --install glassbox-preflight chart/preflight`

Syntax:

```bash
helm upgrade --install glassbox-preflight chart/preflight --namespace <ns> --create-namespace [options]
```

Arguments:

- `--namespace <ns>`: target namespace
- `--create-namespace`: create the namespace if missing
- `--set app.authToken=<token>`: optional explicit API token
- `--set image.repository=<repo>`: optional image repo override
- `--set image.tag=<tag>` or `--set image.digest=<digest>`: optional image version override
- `--set storage.type=pvc|gcs`: optional storage mode override
- `--set storage.pvc.size=<size>`: optional PVC size override
- `--set storage.pvc.accessMode=ReadWriteOnce|ReadWriteMany`: optional access mode override
- `--set app.runnerImage=<image>`: optional core runner image override
- `--set app.runnerServiceAccount=<ksa>`: optional runtime Job service account override
- `--set billing.enabled=true`: optional metering enablement

Defaults:

- if `app.authToken` is omitted, the chart preserves an existing auth secret or generates a new one on first install
- the default service is `ClusterIP` on port `8080`
- the default shared storage contract is PVC-backed

Example:

```bash
export GBX_PREFLIGHT_TOKEN="change-me-before-real-use"

helm upgrade --install glassbox-preflight chart/preflight \
  --namespace glassbox-preflight \
  --create-namespace \
  --set app.authToken="$GBX_PREFLIGHT_TOKEN"
```

## `kubectl get secret ... K8S_API_TOKENS`

Syntax:

```bash
kubectl -n <ns> get secret <release>-preflight-auth -o jsonpath='{.data.K8S_API_TOKENS}' | base64 -d
```

Arguments:

- `<ns>`: namespace used at install time
- `<release>`: Helm release name; with the default release it resolves to `glassbox-preflight-preflight-auth`

Defaults:

- use this only when `app.authToken` was not supplied explicitly

Example:

```bash
kubectl -n glassbox-preflight get secret glassbox-preflight-preflight-auth \
  -o jsonpath='{.data.K8S_API_TOKENS}' | base64 -d | jq -r '.[0].token'
```

## `kubectl rollout status deployment/glassbox-preflight-preflight`

Syntax:

```bash
kubectl -n <ns> rollout status deployment/<release>-preflight
```

Arguments:

- `<ns>`: namespace used at install time
- `<release>`: Helm release name; default examples use `glassbox-preflight`

Defaults:

- with the default release name, the Deployment name is `glassbox-preflight-preflight`

Example:

```bash
kubectl -n glassbox-preflight rollout status deployment/glassbox-preflight-preflight
```

## `kubectl port-forward svc/glassbox-preflight-preflight 8080:8080`

Syntax:

```bash
kubectl -n <ns> port-forward svc/<release>-preflight 8080:8080
```

Arguments:

- `<ns>`: namespace used at install time
- `<release>`: Helm release name; default examples use `glassbox-preflight`

Defaults:

- forwards local port `8080` to the in-cluster service port `8080`

Example:

```bash
kubectl -n glassbox-preflight port-forward svc/glassbox-preflight-preflight 8080:8080
```

## `curl /api/health`

Syntax:

```bash
curl -fsSL http://127.0.0.1:8080/api/health
```

Arguments:

- none

Defaults:

- unauthenticated health probe
- expected response includes `{"status":"ok"}`

Example:

```bash
curl -fsSL http://127.0.0.1:8080/api/health
```

## `curl /api/config`

Syntax:

```bash
curl -fsSL http://127.0.0.1:8080/api/config
```

Arguments:

- none

Defaults:

- unauthenticated config probe
- expected response includes the current runtime wiring such as `inCluster`, storage mode, and runner integration fields

Example:

```bash
curl -fsSL http://127.0.0.1:8080/api/config
```

## `curl /api/modules`

Syntax:

```bash
curl -fsSL http://127.0.0.1:8080/api/modules
```

Arguments:

- none

Defaults:

- unauthenticated module registry read
- expected response includes the built-in `computational` module

Example:

```bash
curl -fsSL http://127.0.0.1:8080/api/modules
```

## `curl /api/runs/check`

Syntax:

```bash
curl -fsSL -H "Authorization: Bearer $GBX_PREFLIGHT_TOKEN" \
  "http://127.0.0.1:8080/api/runs/check?runId=<run_id>[&paths=<relpath1>,<relpath2>]"
```

Arguments:

- `runId`: required
- `paths`: optional comma-separated list of relative output paths to require

Defaults:

- requires auth unless the deployment explicitly disables token auth
- when `paths` is omitted, checks:
  - `results/combined_unified_computational_outputs.json`
  - `results/summary.json`

Example:

```bash
curl -fsSL -H "Authorization: Bearer $GBX_PREFLIGHT_TOKEN" \
  "http://127.0.0.1:8080/api/runs/check?runId=smoke-test"
```

## `curl POST /api/modules/computational/smoke`

Syntax:

```bash
curl -fsSL -X POST \
  -H "Authorization: Bearer $GBX_PREFLIGHT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"namespace":"<ns>"}' \
  "http://127.0.0.1:8080/api/modules/computational/smoke"
```

Arguments:

- `namespace`: required JSON body field

Defaults:

- launches a short-lived Kubernetes Job
- with the shipped registry, the smoke command resolves to `python3 -m app.gbx_core_runner_v3 --help`
- verifies image pull, interpreter startup, and module CLI wiring without launching a scientific run

Example:

```bash
curl -fsSL -X POST \
  -H "Authorization: Bearer $GBX_PREFLIGHT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"namespace":"glassbox-preflight"}' \
  "http://127.0.0.1:8080/api/modules/computational/smoke"
```

## `curl /api/modules/computational/status`

Syntax:

```bash
curl -fsSL -H "Authorization: Bearer $GBX_PREFLIGHT_TOKEN" \
  "http://127.0.0.1:8080/api/modules/computational/status?namespace=<ns>"
```

Arguments:

- `namespace`: required query parameter

Defaults:

- returns the configured runner image, runner service account, and latest observed execution verification state for the module

Example:

```bash
curl -fsSL -H "Authorization: Bearer $GBX_PREFLIGHT_TOKEN" \
  "http://127.0.0.1:8080/api/modules/computational/status?namespace=glassbox-preflight"
```

## `curl POST /api/pipeline/run`

Syntax:

```bash
curl -fsSL -X POST \
  -H "Authorization: Bearer $GBX_PREFLIGHT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"projectId":"<project_id>","namespace":"<ns>"[,"runId":"<run_id>","moduleId":"computational","mode":"standard","gpuDocking":false]}' \
  "http://127.0.0.1:8080/api/pipeline/run"
```

Arguments:

- `projectId`: required JSON body field
- `namespace`: required JSON body field
- `runId`: optional
- `moduleId`: optional; defaults to `computational`
- `mode`: optional; defaults to `standard`
- `gpuDocking`: optional boolean; defaults to `false`

Defaults:

- requires `GBX_RUNNER_IMAGE` and `GBX_APP_FULLNAME` to be configured on the preflight server
- if `runId` is omitted, the server generates `run_<timestamp>`
- GPU scheduling is enabled only when `mode=deep` and `gpuDocking=true`

Example:

```bash
curl -fsSL -X POST \
  -H "Authorization: Bearer $GBX_PREFLIGHT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"projectId":"test","namespace":"glassbox-preflight","mode":"standard"}' \
  "http://127.0.0.1:8080/api/pipeline/run"
```

## `curl /api/k8s/pods`

Syntax:

```bash
curl -fsSL -H "Authorization: Bearer $GBX_PREFLIGHT_TOKEN" \
  "http://127.0.0.1:8080/api/k8s/pods?namespace=<ns>[&jobName=<job_name>][&label=<selector>][&context=<kubectl_context>]"
```

Arguments:

- `namespace`: required query parameter
- `jobName`: optional query parameter
- `label`: optional query parameter
- `context`: optional query parameter

Defaults:

- returns pod names, phases, containers, and start times
- use `jobName` when you want only the pods for one launched Job

Example:

```bash
curl -fsSL -H "Authorization: Bearer $GBX_PREFLIGHT_TOKEN" \
  "http://127.0.0.1:8080/api/k8s/pods?namespace=glassbox-preflight"
```

## `curl /api/outputs/list`

Syntax:

```bash
curl -fsSL -H "Authorization: Bearer $GBX_PREFLIGHT_TOKEN" \
  "http://127.0.0.1:8080/api/outputs/list?runId=<run_id>[&prefix=<relative_prefix>]"
```

Arguments:

- `runId`: required query parameter
- `prefix`: optional relative output prefix

Defaults:

- when `prefix` is omitted, the response prefers the well-known top-level directories:
  - `results/`
  - `thresholds/`
  - `seal/`
  - `repro_pack/`

Example:

```bash
curl -fsSL -H "Authorization: Bearer $GBX_PREFLIGHT_TOKEN" \
  "http://127.0.0.1:8080/api/outputs/list?runId=run_20260325T010203"
```

## `curl /api/outputs/download`

Syntax:

```bash
curl -fsSL -H "Authorization: Bearer $GBX_PREFLIGHT_TOKEN" \
  -o <local_file> \
  "http://127.0.0.1:8080/api/outputs/download?runId=<run_id>&path=<relative_path>"
```

Arguments:

- `runId`: required query parameter
- `path`: required relative path under the run output root
- `-o <local_file>`: recommended local output filename

Defaults:

- downloads a single file under `GBX_OUTPUT_ROOT/<run_id>/`

Example:

```bash
curl -fsSL -H "Authorization: Bearer $GBX_PREFLIGHT_TOKEN" \
  -o summary.json \
  "http://127.0.0.1:8080/api/outputs/download?runId=run_20260325T010203&path=results/summary.json"
```

## `curl /api/outputs/repro-pack.tgz`

Syntax:

```bash
curl -fsSL -H "Authorization: Bearer $GBX_PREFLIGHT_TOKEN" \
  -o repro_pack_<run_id>.tgz \
  "http://127.0.0.1:8080/api/outputs/repro-pack.tgz?runId=<run_id>"
```

Arguments:

- `runId`: required query parameter
- `-o repro_pack_<run_id>.tgz`: recommended local filename

Defaults:

- archives and streams the `repro_pack/` directory for the run
- returns `404` if that directory does not exist yet

Example:

```bash
curl -fsSL -H "Authorization: Bearer $GBX_PREFLIGHT_TOKEN" \
  -o repro_pack_run_20260325T010203.tgz \
  "http://127.0.0.1:8080/api/outputs/repro-pack.tgz?runId=run_20260325T010203"
```

## `APP_BASE_URL=... ./apptest/tester/tester.sh`

Syntax:

```bash
APP_BASE_URL=http://127.0.0.1:8080 ./apptest/tester/tester.sh
```

Arguments:

- `APP_BASE_URL`: required environment variable pointing at the running preflight app

Defaults:

- checks `/api/health`
- checks `/api/config`
- checks `/api/modules` for the `computational` registry entry

Example:

```bash
APP_BASE_URL=http://127.0.0.1:8080 ./apptest/tester/tester.sh
```
