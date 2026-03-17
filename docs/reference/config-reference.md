---
title: Config Reference
description: Reference for configuration keys and environment variables.
sidebar_position: 4
---

# Config Reference

This page captures the most important chart values and runtime settings used in the current customer deployment model. It is not yet an exhaustive schema dump.

## Core run settings

| Key | Type or example | Purpose |
| --- | --- | --- |
| `config.projectId` | `test` | Resolves the input directory name under the input root |
| `config.runId` | `run_20260307T010203Z` | Forces outputs into a stable run-scoped directory |
| `config.runMode` | `standard` or `deep` | Selects the execution profile and billing metric |
| `config.inputPath` | `/data/input` | Root path used to discover `<project_id>/01_sources/` |
| `config.outputPath` | `/data/output` | Root path where run-scoped outputs are written |

## Entitlement settings

| Key | Type or example | Purpose |
| --- | --- | --- |
| `config.entitlementUrl` | `https://YOUR_CLOUD_RUN_SERVICE` | Base URL for the entitlement and seal API |
| `config.entitlementAuthMode` | `google` | Enables identity-based auth for the customer job |
| `config.entitlementAudience` | same as entitlement URL | Audience used when minting the identity token |
| `config.entitlementPrincipal` | `local-dev` | Local or test principal for non-Google development flows |

For the customer deployment path, prefer `config.entitlementAuthMode=google`.

## Storage settings

| Key | Type or example | Purpose |
| --- | --- | --- |
| `storage.type` | `pvc` or `gcs` | Selects the backing storage mode |
| `storage.pvc.storageClassName` | `standard` | Storage class for PVC mode |
| `storage.pvc.size` | `50Gi` | Requested PVC capacity |
| `storage.gcs.bucket` | `YOUR_BUCKET` | Bucket used for GCS-backed storage mode |

## Workload Identity settings

| Key | Type or example | Purpose |
| --- | --- | --- |
| `workloadIdentity.enabled` | `true` | Enables Workload Identity plumbing in the chart |
| `workloadIdentity.gcpServiceAccount` | `your-sa@project.iam.gserviceaccount.com` | GSA used by the job when calling Google-protected services |

## Marketplace and usage reporting settings

| Key | Type or example | Purpose |
| --- | --- | --- |
| `marketplace.reportingSecret` | Kubernetes Secret reference | Injects the Marketplace reporting credential |
| `ubbagent.enabled` | `true` | Keeps Marketplace metering enabled in supported deployments |
| `ubbagent.metricName` | `standard_audit_run` | Legacy hard override for usage metric selection |
| `ubbagent.metricNameStandard` | `standard_audit_run` | Explicit Standard metric name |
| `ubbagent.metricNameDeep` | `deep_audit_run` | Explicit Deep metric name |

Supported Marketplace deployments require both a non-empty `marketplace.reportingSecret` and `ubbagent.enabled=true`.

If `ubbagent.metricName` is set, it acts as a hard override. Leave it empty unless you have a controlled release reason to override the mode-aware defaults.

## Operational notes

- `config.projectId` must match the staged input folder name exactly
- `config.runId` must be unique per run to avoid `409` reuse conflicts
- Standard and Deep should be treated as separate operational profiles, not just cosmetic labels
- Do not change storage size downward on an existing PVC-backed release

See also [Kubernetes and Helm](../deployment-and-operations/kubernetes-and-helm.md).
