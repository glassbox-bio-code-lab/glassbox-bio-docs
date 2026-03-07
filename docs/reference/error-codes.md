---
title: Error Codes
description: Canonical error-code reference across the platform.
sidebar_position: 7
tags:
  - reference
---

# Error Codes

This page captures the most important currently documented errors across the entitlement flow and Kubernetes deployment path.

## Entitlement and verification API status codes

| Code | Meaning | Typical recovery |
| --- | --- | --- |
| `401` | Identity token missing or invalid | Check Workload Identity, auth mode, and audience settings |
| `403` | Caller is authenticated but blocked by IAM or service policy | Confirm Cloud Run invocation policy and caller permissions |
| `402` | Entitlement exhausted | Issue more runs or use a different entitled principal |
| `409` | `run_id` reuse or duplicate seal redemption | Generate a new `run_id` or use a new verified seal |
| `422` | Missing prerequisite lifecycle state | Ensure the caller performed the required earlier steps, such as `consume` and `run_start` |

## Operational errors that appear in Helm or Kubernetes

These are not HTTP API codes, but they are part of the real operator experience and should be documented alongside the status codes.

### Namespace ownership mismatch

Typical error pattern:

```text
Namespace "<name>" exists and cannot be imported ...
```

Recovery:

- Pass the correct `--namespace`
- Keep the release and namespace aligned
- Pre-create the namespace if needed

### Immutable Job error

Typical error pattern:

```text
cannot patch "<job>" with kind Job ... field is immutable
```

Recovery:

```bash
kubectl -n "${NAMESPACE}" delete job "${APP_NAME}" --ignore-not-found
```

### PVC shrink error

Typical error pattern:

```text
spec.resources.requests.storage: Forbidden: field can not be less than status.capacity
```

Recovery:

- Do not shrink an existing PVC
- Increase the size instead, or recreate the PVC with accepted data loss

### Multi-attach error

Typical error pattern:

```text
Multi-Attach error ... Volume is already used by pod(s) gbx-output-reader
```

Recovery:

- Delete the leftover helper pod
- Rerun the job after the volume is detached

## Documentation rule

Keep this page focused on stable external errors and repeatable operator failures. Do not turn it into a raw dump of internal exception text.
