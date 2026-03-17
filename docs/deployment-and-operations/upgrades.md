---
title: Upgrades
description: How to upgrade platform components safely.
sidebar_position: 9
---

# Upgrades

Use this page for safe upgrade sequencing of the Kubernetes job and its supporting Marketplace configuration.

## Upgrade principles

- Pin runtime images by digest for release upgrades whenever possible
- Delete and recreate Kubernetes Jobs instead of trying to patch immutable job specs
- Do not shrink PVC sizes between releases
- Keep namespace, release name, and storage ownership aligned across upgrades
- Validate the chart with `helm lint` and `helm template` before upgrading a customer environment

## Recommended upgrade sequence

1. Validate the new chart and values locally
2. Confirm the target image tag or digest and intended run mode
3. Delete the existing job object if the spec will change
4. Run `helm upgrade --install` with the new values
5. Watch the new job from start to completion
6. Verify the output package and seal artifacts after the run

## Job immutability

Kubernetes Jobs cannot be upgraded in place when the pod template changes. Use:

```bash
kubectl -n "${NAMESPACE}" delete job "${APP_NAME}" --ignore-not-found
```

before re-running the Helm upgrade command.

## Profile changes

Moving between Standard and Deep is not just a cosmetic change. It can involve:

- Different image tags
- Different run modes
- Different resource requests
- Different PVC size expectations
- Different Marketplace usage metrics

Treat this as a real upgrade event, not a small patch.

Keep this separate from category routing. A run can stay in the same scientific category while moving from Standard to Deep, and a Deep-capable deployment still depends on the staged package for category resolution. See [Category Policy and Routing](../computational-safety-diligence/category-policy-and-routing.md).

## PVC sizing rules

Do not shrink an existing PVC. If the current claim is larger than the new requested size, Kubernetes will reject the change.

If you must reduce the size, delete and recreate the PVC with explicit acceptance of data loss.

## Helper pod cleanup

If helper pods such as `gbx-output-reader` are still attached to a `ReadWriteOnce` volume, remove them before upgrading or rerunning:

```bash
kubectl -n "${NAMESPACE}" delete pod gbx-output-reader --ignore-not-found
```

## Post-upgrade verification

After a successful upgrade, verify:

- The job starts with the intended image and run mode
- Entitlement calls succeed
- Expected output files appear under the new `run_id`
- The seal bundle is present and verifiable

See [Output File Reference](../reference/output-file-reference.md) and [Verification Seal](../computational-safety-diligence/outputs/verification-seal.md).
