---
title: Backup and Restore
description: Operational recovery guidance for platform state and artifacts.
sidebar_position: 10
tags:
  - deployment
---

# Backup and Restore

Back up the run outputs, manifests, and verification artifacts rather than assuming they can always be reconstructed later.

## What to preserve

- Run-scoped output directories
- `run_manifest.json`
- Seal artifacts under `seal/`
- Any staged input bundle needed for a formal replay or audit workflow

## PVC-backed deployments

For PVC storage, preserve data by:

- Snapshotting the persistent disk
- Copying `/data/output` to a secondary bucket or archive location

## GCS-backed deployments

For GCS storage, use:

- Bucket versioning where appropriate
- Lifecycle policies that match your retention requirements
- Explicit export or archive steps for run bundles that must be retained for audit

## Restore validation

After restoring data, confirm:

- The expected `run_id` directories are present
- `run_manifest.json` and seal artifacts are intact
- Restored outputs match the expected project and run scope

For artifact-level guidance, see [Output File Reference](../reference/output-file-reference.md).
