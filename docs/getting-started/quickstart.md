---
title: Quickstart
description: Fastest path from initial setup to a valid first run.
sidebar_position: 5
tags:
  - platform
---

# Quickstart

This quickstart gets a new operator from initial setup to a completed first run with a minimum number of decisions.

## Before you start

- A Kubernetes cluster is available and `kubectl` is already authenticated.
- `helm` v3 is installed locally.
- The cluster can pull the published runner image.
- You have one of the supported storage setups:
  - PVC mode with a usable `StorageClass`
  - GCS mode on GKE with the GCS Fuse CSI driver enabled
- Workload Identity is configured for the job service account when you are using the entitlement service.

For the full deployment runbook, see [Kubernetes and Helm](../deployment-and-operations/kubernetes-and-helm.md).

## Choose a run profile

Use one of the two supported execution profiles:

| Profile | When to use it | Typical requirements |
| --- | --- | --- |
| Standard | Default choice for most audits | CPU-only cluster, 2 to 4 vCPU, 8 to 16 GiB RAM, 50 GiB PVC |
| Deep | Expanded evidence generation or GPU-accelerated workflows | 1 NVIDIA GPU, 4 to 8 vCPU, 32 to 64 GiB RAM, 200 GiB PVC |

Deep runs use the same image repository with a GPU-tagged image and `config.runMode=deep`.

This profile choice does not select the scientific category. Category routing is determined by the staged package and the policy in [Category Policy and Routing](../computational-safety-diligence/category-policy-and-routing.md).

## 1. Set the core variables

```bash
export APP_NAME="glassbox-mol-audit"
export NAMESPACE="glassbox-mol-audit"

export IMAGE_REPO="REGION-docker.pkg.dev/PROJECT/REPO/glassbox-mol-audit"
export IMAGE_TAG="PUBLISHED_VERSION_TAG"

export PROJECT_ID="test"
export RUN_ID="run_$(date +%Y%m%dT%H%M%SZ)"

export ENTITLEMENT_URL="https://YOUR_CLOUD_RUN_SERVICE"
export ENTITLEMENT_AUTH_MODE="google"
export ENTITLEMENT_AUDIENCE="${ENTITLEMENT_URL}"
export WORKLOAD_IDENTITY_GSA="your-sa@project.iam.gserviceaccount.com"
```

If you are running Deep, use a GPU image tag such as `PUBLISHED_VERSION_TAG-gpu` and set `config.runMode=deep` during installation.

## 2. Install the chart without starting the job

Create the namespace first:

```bash
kubectl create namespace "${NAMESPACE}" 2>/dev/null || true
```

Install the infrastructure layer with the job disabled:

```bash
helm upgrade --install "${APP_NAME}" ./manifest/chart \
  --namespace "${NAMESPACE}" --create-namespace \
  -f ./manifest/chart/values-standard.yaml \
  --set job.enabled=false \
  --set image.repository="${IMAGE_REPO}" \
  --set image.tag="${IMAGE_TAG}" \
  --set config.projectId="${PROJECT_ID}" \
  --set config.entitlementUrl="${ENTITLEMENT_URL}" \
  --set config.entitlementAuthMode="${ENTITLEMENT_AUTH_MODE}" \
  --set config.entitlementAudience="${ENTITLEMENT_AUDIENCE}" \
  --set workloadIdentity.enabled=true \
  --set workloadIdentity.gcpServiceAccount="${WORKLOAD_IDENTITY_GSA}" \
  --set config.runId="${RUN_ID}"
```

No customer entitlement secret is required for the identity-only flow.

## 3. Stage a valid input package

Inputs are discovered from:

```text
<input-root>/<project_id>/01_sources/
```

At minimum, stage:

- `sources.json`
- `portfolio_selected.csv`

Prepare the full package using [Prepare Inputs](../computational-safety-diligence/prepare-inputs.md). If you are using PreFlight UI, validate the package before you hand it off to analysis.

Before you start the job, confirm that the staged package actually supports the category you expect. Structure files, assay tables, and admissibility constraints change which module path the pipeline will take.

### Customer-onboarding shorthand

Some customer-facing onboarding materials describe a higher-level intake pair rather than the full runtime bundle:

- `targets.csv`
- `sources.json`

That shorthand is still useful for early intake and target-diligence setup. In that flow:

- `targets.csv` carries target identifiers and modality context
- `sources.json` carries indication, context of use, and positive or negative evidence statements

By execution time, the staged package still needs to satisfy the deployed runner contract described in [Prepare Inputs](../computational-safety-diligence/prepare-inputs.md).

## 4. Enable the job and start the run

Delete any previous job first because Kubernetes Jobs are immutable:

```bash
kubectl -n "${NAMESPACE}" delete job "${APP_NAME}" --ignore-not-found
```

Then enable the job:

```bash
helm upgrade --install "${APP_NAME}" ./manifest/chart \
  --namespace "${NAMESPACE}" \
  -f ./manifest/chart/values-standard.yaml \
  --set job.enabled=true \
  --set image.repository="${IMAGE_REPO}" \
  --set image.tag="${IMAGE_TAG}" \
  --set config.projectId="${PROJECT_ID}" \
  --set config.entitlementUrl="${ENTITLEMENT_URL}" \
  --set config.entitlementAuthMode="${ENTITLEMENT_AUTH_MODE}" \
  --set config.entitlementAudience="${ENTITLEMENT_AUDIENCE}" \
  --set workloadIdentity.enabled=true \
  --set workloadIdentity.gcpServiceAccount="${WORKLOAD_IDENTITY_GSA}" \
  --set config.runId="${RUN_ID}"
```

## 5. Watch the run

```bash
kubectl -n "${NAMESPACE}" get job "${APP_NAME}" -o wide
kubectl -n "${NAMESPACE}" logs "job/${APP_NAME}" --all-containers --timestamps -f
```

Common entitlement failures are documented in [Error Codes](../reference/error-codes.md).

## 6. Retrieve the outputs

Outputs are written under:

```text
<output-root>/<run_id>/
```

The default container path is typically `/data/output/<RUN_ID>` when `config.runId` is set.

List available run folders:

```bash
kubectl -n "${NAMESPACE}" exec gbx-output-reader -- bash -lc 'ls -1 /data/output | sort'
```

Download the completed run folder:

```bash
mkdir -p ./e2e-downloads
kubectl -n "${NAMESPACE}" cp \
  gbx-output-reader:/data/output/"${RUN_ID}" \
  ./e2e-downloads/"${RUN_ID}"
```

Use [Report Package Overview](../computational-safety-diligence/outputs/report-package-overview.md) and [Verification Seal](../computational-safety-diligence/outputs/verification-seal.md) to interpret what you retrieved.

## Next steps

- Use [Prepare Inputs](../computational-safety-diligence/prepare-inputs.md) if you need the full input contract.
- Use [Supported Inputs](../preflight-ui/validation-system/supported-inputs.md) and [Validation Rules](../preflight-ui/validation-system/validation-rules.md) if you are enabling PreFlight UI.
- Use [Kubernetes and Helm](../deployment-and-operations/kubernetes-and-helm.md) for the full operational runbook, storage modes, and uninstall steps.
