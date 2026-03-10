---
title: Google Cloud Marketplace
description: Marketplace-specific deployment guidance.
sidebar_position: 4
tags:
  - deployment
---

# Google Cloud Marketplace

This page covers the Marketplace-specific packaging, publisher prerequisites, verification path, and usage reporting model for the public customer bundle.

## Package layout

The public repository layout should include the deployable chart, Marketplace wiring, and reviewer documentation in a stable structure such as:

```text
LICENSE
README.md
schema.yaml
manifest/
  application.yaml
  manifests.yaml
  chart/
deployer/
apptest/
docs/
examples/
```

Operationally, the deployer image is expected to package `manifest/` and reference `schema.yaml` plus `manifest/application.yaml` during Marketplace deployment.

## Publisher prerequisites

Before publishing to Cloud Marketplace, make sure the publisher environment is prepared:

### Google Cloud project

- Use a dedicated project for Marketplace assets
- Grant the required IAM roles to Marketplace onboarding identities
- Set the appropriate security or operational contact for the project

### Artifact Registry

- Create the Artifact Registry repository for application images
- Enable vulnerability scanning and the related analysis APIs
- Grant the onboarding identities the minimum required read permissions

### Producer Portal

- Create the product entry
- Capture the service name assigned by Producer Portal
- Configure pricing and billing before submission

### Release management

- Use Semantic Versioning for release tags
- Publish exact version tags
- Prefer immutable image digests in release documentation and manifests

## Verification flow for reviewers

The Marketplace verification path should cover installation, functionality, and uninstall:

### Install

```bash
helm upgrade --install glassbox-mol-audit ./manifest/chart \
  --namespace glassbox-mol-audit --create-namespace \
  --set image.repository=REGION-docker.pkg.dev/PROJECT/REPO/glassbox-mol-audit \
  --set image.tag=1.0.0 \
  --set storage.type=gcs \
  --set storage.gcs.bucket=YOUR_BUCKET \
  --set workloadIdentity.enabled=true \
  --set workloadIdentity.gcpServiceAccount=your-sa@project.iam.gserviceaccount.com \
  --set marketplace.reportingSecret="" \
  --set ubbagent.enabled=false
```

### Functionality check

```bash
kubectl logs -n glassbox-mol-audit job/glassbox-mol-audit --all-containers=true
gsutil ls gs://YOUR_BUCKET/<project_id>/results
```

### Uninstall

```bash
helm uninstall glassbox-mol-audit -n glassbox-mol-audit
kubectl delete namespace glassbox-mol-audit
```

If PVC storage is used instead of GCS, delete the PVC only when you intend to remove retained outputs.

## Marketplace usage reporting and `ubbagent`

Marketplace usage reporting is optional for reviewer testing but required for the full commercial path.

### Billing contract

| Item | Value |
| --- | --- |
| Plan ID | `gbx_target_diligence_core` |
| Standard metric | `standard_audit_run` |
| Deep metric | `deep_audit_run` |

The intended behavior is:

- One usage metric per completed run
- Metric choice is determined by `config.runMode`
- Usage emission happens only on successful completion
- Reporting remains idempotent per `run_id`

This billing distinction is separate from category routing. Marketplace usage reporting only cares about Standard versus Deep metering, while module eligibility still follows the staged package and [Category Policy and Routing](../computational-safety-diligence/category-policy-and-routing.md).

### Readiness requirements

The Hub-side or deployment-side billing flow is considered ready only when:

- `UBBAGENT_ENABLED=true`
- `MARKETPLACE_REPORTING_SECRET` is set
- The reporting secret exists in the namespace
- The `ubbagent` ConfigMap exists in the namespace
- The `UBBAGENT_IMAGE` is configured

### Metric selection

Mode-aware metric selection should prefer:

- `UBBAGENT_METRIC_NAME_STANDARD` for Standard runs
- `UBBAGENT_METRIC_NAME_DEEP` for Deep runs
- `UBBAGENT_METRIC_NAME` only as the legacy fallback

### Reviewer mode

For reviewer testing, it is valid to disable billing explicitly:

- `ubbagent.enabled: false`
- `marketplace.reportingSecret: ""`

That path should run the workload without the sidecar and without emitting usage.

## Reviewer checklist

Reviewers should be able to confirm:

- Images are pinned and provenance is documented
- The chart validates with `helm lint` and `helm template`
- Security baseline settings are present
- Reporting secrets and metric IDs are wired correctly
- Run manifest and verification artifacts are emitted
- Install and uninstall instructions are runnable as written

## Recommended submission checks

```bash
make review-gate
helm lint ./manifest/chart
helm template review-default ./manifest/chart >/dev/null
helm template review-standard ./manifest/chart -f ./manifest/chart/values-standard.yaml >/dev/null
```

## Related pages

- [Kubernetes and Helm](./kubernetes-and-helm.md)
- [Category Policy and Routing](../computational-safety-diligence/category-policy-and-routing.md)
- [Config Reference](../reference/config-reference.md)
- [Security Overview](../trust-and-security/security-overview.md)
