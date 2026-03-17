---
title: Configuration
description: Platform configuration surfaces and recommended defaults.
sidebar_position: 6
---

# Configuration

The deployment bundle exposes a small but important set of operator-controlled values through Helm and Marketplace schema wiring.

## Primary configuration surfaces

### Helm `values.yaml`

The base chart values define the default runtime contract for:

- images
- config and run behavior
- Marketplace reporting
- `ubbagent`
- optional console
- resources
- storage
- service account and Workload Identity
- job lifecycle controls

### Profile values

The bundle provides profile-specific overlays:

- `values-standard.yaml`
- `values-gpu.yaml`
- example `values-pvc.yaml`
- example `values-gcs.yaml`
- example `values-entitlement.yaml`

These should be treated as supported configuration entry points rather than ad hoc snippets.

### Marketplace schema

`schema.yaml` exposes selected settings for Marketplace-driven installs and maps them into chart values.

## Important configuration groups

### Run configuration

Key runtime settings include:

- `config.projectId`
- `config.runMode`
- `config.inputPath`
- `config.outputPath`
- `config.runId`
- `config.reproPackEnabled`

`config.runMode` selects the execution profile, but it does not by itself choose the scientific routing category. Category resolution still depends on the staged package and the policy in [Category Policy and Routing](../computational-safety-diligence/category-policy-and-routing.md).

### Entitlement configuration

The key entitlement settings are:

- `config.entitlementUrl`
- `config.entitlementAuthMode`
- `config.entitlementAudience`
- `config.entitlementBearerToken`
- `config.entitlementPrincipal`

For customer deployments, the preferred path is identity-based auth with `config.entitlementAuthMode=google`.

### Storage configuration

Storage is selected with:

- `storage.type`
- `storage.pvc.storageClassName`
- `storage.pvc.size`
- `storage.gcs.bucket`
- `storage.gcs.mountPath`

### Billing configuration

Marketplace reporting is controlled with:

- `marketplace.reportingSecret`
- `ubbagent.enabled`
- `ubbagent.metricName`
- `ubbagent.metricNameStandard`
- `ubbagent.metricNameDeep`
- `ubbagent.serviceName`

### Identity configuration

The Workload Identity path is controlled with:

- `workloadIdentity.enabled`
- `workloadIdentity.gcpServiceAccount`

## Operational rules

- Use image digests for production or reviewer-stable releases whenever possible
- Treat Standard and Deep as distinct deployment profiles, not cosmetic variants
- Do not treat Standard or Deep as a substitute for category selection or module-policy review
- Keep `console.enabled=false` unless console exposure is intentionally required
- Use `job.enabled=false` for infrastructure-first installs, then enable the Job explicitly

For the field-level reference, see [Config Reference](../reference/config-reference.md).
