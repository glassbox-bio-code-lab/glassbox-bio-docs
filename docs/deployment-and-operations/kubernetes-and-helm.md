---
title: Kubernetes and Helm
description: Cluster deployment details and chart-level guidance.
sidebar_position: 5
---

# Kubernetes and Helm

This page is the operator-facing runbook for deploying the job on Kubernetes with Helm.

## Prerequisites

- `kubectl` is authenticated to the target cluster
- `helm` v3 is installed
- `gcloud` is installed when you need to fetch cluster credentials or Workload Identity context from Google Cloud
- The cluster can pull the published image
- One supported storage mode is available:
  - PVC mode with a usable `StorageClass`
  - GCS mode on GKE with the GCS Fuse CSI driver enabled
- Workload Identity is configured when the job must call the entitlement service with Google identity

If you need to install the Kubernetes Application CRD used by some Marketplace flows:

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes-sigs/application/master/config/crd/bases/app.k8s.io_applications.yaml
```

## Supported deployment profiles

The current supported profiles are:

| Profile | Typical use | Expected resources |
| --- | --- | --- |
| Standard | Default production path | 2 to 4 vCPU, 8 to 16 GiB RAM, 50 GiB PVC |
| Deep | Expanded evidence generation and GPU-heavy workflows | 4 to 8 vCPU, 32 to 64 GiB RAM, 1 NVIDIA GPU, 200 GiB PVC |

Standard runs use the default image tag and `config.runMode=standard`. Deep runs use a GPU-tagged image and `config.runMode=deep`.

Run profile is not the same thing as category routing. `config.runMode` controls infrastructure depth and execution profile, while the staged inputs and policy determine the resolved `category_id`. Review [Category Policy and Routing](../computational-safety-diligence/category-policy-and-routing.md) before assuming that a Deep deployment implies a structure-backed or physics-heavy analysis path.

## Recommended install flow

### 1. Set the core variables

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

### 2. Create the namespace

```bash
kubectl create namespace "${NAMESPACE}" 2>/dev/null || true
```

### 3. Install infrastructure only

Install the chart with the job disabled first:

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

### 4. Stage inputs

The runner expects:

```text
<input-root>/<project_id>/01_sources/
```

On the default PVC layout, that is usually:

```text
/data/input/<project_id>/01_sources/
```

For the input contract, see [Prepare Inputs](../computational-safety-diligence/prepare-inputs.md).
For the module-routing policy driven by those inputs, see [Category Policy and Routing](../computational-safety-diligence/category-policy-and-routing.md).

### 5. Enable the job

Delete any previous job before a new install or upgrade because Jobs are immutable:

```bash
kubectl -n "${NAMESPACE}" delete job "${APP_NAME}" --ignore-not-found
```

Then enable execution:

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

### 6. Watch the job

```bash
kubectl -n "${NAMESPACE}" get job "${APP_NAME}" -o wide
kubectl -n "${NAMESPACE}" logs "job/${APP_NAME}" --all-containers --timestamps -f
```

## Storage modes

### PVC mode

```bash
helm upgrade --install glassbox-mol-audit ./manifest/chart \
  --set storage.type=pvc \
  --set storage.pvc.storageClassName=standard \
  --set storage.pvc.size=50Gi
```

### GCS Fuse mode on GKE

```bash
helm upgrade --install glassbox-mol-audit ./manifest/chart \
  --set storage.type=gcs \
  --set storage.gcs.bucket=YOUR_BUCKET \
  --set workloadIdentity.enabled=true \
  --set workloadIdentity.gcpServiceAccount=your-sa@project.iam.gserviceaccount.com
```

### Customer GCS deployment example

```bash
helm upgrade --install glassbox-mol-audit ./manifest/chart \
  --namespace glassbox-mol-audit --create-namespace \
  -f ./manifest/chart/values-standard.yaml \
  -f ./examples/values-gcs.yaml \
  --set storage.gcs.bucket=YOUR_BUCKET \
  --set workloadIdentity.gcpServiceAccount=your-sa@project.iam.gserviceaccount.com \
  --set image.repository=us-central1-docker.pkg.dev/PROJECT/REPO/glassbox-mol-audit \
  --set image.tag=1.0.0 \
  --set config.projectId=YOUR_PROJECT_ID \
  --set ubbagent.enabled=false \
  --set marketplace.reportingSecret=""
```

## Identity-only entitlement flow

The current deployment model is identity-based. The customer job authenticates to the entitlement service with Workload Identity rather than a customer-managed token.

Set all of the following:

- `config.entitlementAuthMode=google`
- `config.entitlementAudience=<entitlement-url>`
- `workloadIdentity.enabled=true`
- `workloadIdentity.gcpServiceAccount=<gsa>`

The customer job then calls these endpoints during a run:

1. `POST /api/entitlement/check`
2. `POST /api/entitlement/consume`
3. `POST /api/entitlement/run_start`
4. `POST /api/entitlement/run_complete`

See [API Overview](../reference/api-overview.md) for the grouped endpoint reference.

## Outputs

Outputs land under a run-scoped directory:

```text
<output-root>/<run_id>/
```

Typical artifacts include:

- `results/summary.json`
- `results/metrics.json`
- HTML report files
- `run_manifest.json`
- `seal/seal.json`
- `seal/seal.sig`
- `seal/seal.svg`

For the full artifact map, see [Output File Reference](../reference/output-file-reference.md).

## Retrieval paths

### PVC retrieval

Use a helper pod mounted to the same claim, then copy the output directory locally.

### GCS retrieval

```bash
gsutil -m cp -r gs://YOUR_BUCKET/<project_id>/results ./gbx_output/results
```

## Clean uninstall

Default teardown keeps the namespace and the external reporting secret:

```bash
./tools/clean_uninstall.sh \
  --namespace "${NAMESPACE}" \
  --release "${APP_NAME}"
```

Full purge teardown is destructive:

```bash
./tools/clean_uninstall.sh \
  --namespace "${NAMESPACE}" \
  --release "${APP_NAME}" \
  --delete-pvc \
  --delete-namespace \
  --yes
```

Delete the Marketplace reporting secret only when that is intentional:

```bash
./tools/clean_uninstall.sh \
  --namespace "${NAMESPACE}" \
  --release "${APP_NAME}" \
  --delete-reporting-secret \
  --reporting-secret "<app-name>-reporting-secret" \
  --yes
```

## Common operational failures

### Namespace ownership mismatch

If Helm reports namespace ownership problems, make sure:

- You always pass `--namespace "${NAMESPACE}"`
- The namespace exists or is created by the same Helm release context

### Immutable Job errors

If an upgrade fails because the Job spec is immutable, delete the job and rerun the Helm command:

```bash
kubectl -n "${NAMESPACE}" delete job "${APP_NAME}" --ignore-not-found
```

### PVC shrink errors

Do not shrink a PVC between installs. Increase capacity or recreate the PVC if you truly need a smaller volume and can accept data loss.

### Multi-attach errors

If a leftover helper pod is still attached to a `ReadWriteOnce` volume, remove the helper pod before rerunning the job:

```bash
kubectl -n "${NAMESPACE}" delete pod gbx-output-reader --ignore-not-found
kubectl -n "${NAMESPACE}" delete job "${APP_NAME}" --ignore-not-found
```

### Entitlement auth errors

`401` and `403` usually mean the identity token or IAM invocation settings are wrong. Review [Error Codes](../reference/error-codes.md) and the entitlement settings above.

## Backup and restore

- In PVC mode, snapshot the persistent disk or copy `/data/output` to a secondary location
- In GCS mode, rely on bucket versioning and lifecycle controls where appropriate

For a day-2 operations view, see [Multi-Component Operations](./multi-component-operations.md).
