---
title: Storage and Networking
description: Stateful dependencies and network topology guidance.
sidebar_position: 8
---

# Storage and Networking

The customer bundle has a simple storage and network model, but it still needs to be explicit because input paths, output paths, and identity-based external calls are all operationally significant.

## Storage modes

### PVC mode

PVC is the default storage path. In this mode:

- inputs are staged under the mounted `/data` root
- outputs are written under `/data/output/<run_id>`
- helper pods can be used to stage and retrieve files

Typical PVC configuration:

- `storage.type=pvc`
- `storage.pvc.storageClassName=standard`
- `storage.pvc.size=50Gi` for Standard
- larger premium storage for Deep/GPU profiles

Those storage expectations follow execution profile. They do not decide the scientific category or module route, which still comes from the staged package and [Category Policy and Routing](../computational-safety-diligence/category-policy-and-routing.md).

### GCS mode

GCS-backed mode is supported on GKE through GCS Fuse. In this mode:

- the bucket is mounted to the configured `mountPath`
- Workload Identity is typically required
- outputs can be retrieved directly with `gsutil`

Typical GCS configuration:

- `storage.type=gcs`
- `storage.gcs.bucket=YOUR_BUCKET`
- `workloadIdentity.enabled=true`
- `workloadIdentity.gcpServiceAccount=<gsa>`

## Persistent versus ephemeral data

### Persistent

- staged inputs
- run-scoped outputs
- reproducibility artifacts
- seal and report artifacts

### Ephemeral

- helper pods used for staging or retrieval
- temporary execution state inside the Job lifecycle

## Network paths

The main network interactions are:

- pulling images from Artifact Registry
- calling the Entitlement + Seal API over HTTPS
- Marketplace reporting traffic from `ubbagent`
- optional GCS access through the GCS Fuse path

The default application service exposure remains conservative. The bundle documentation expects `ClusterIP` defaults for service types.

## Key operational assumptions

- the cluster can reach the image registry
- the workload can reach the Cloud Run entitlement endpoint
- GCS mode has the required IAM and CSI setup
- any reporting endpoints required by `ubbagent` are reachable when billing is enabled

## Common failure patterns tied to this area

- `ImagePullBackOff` from registry access problems
- `403` or access errors against GCS
- PVC bind or multi-attach issues
- `401/403` against the entitlement endpoint because identity or audience wiring is wrong
- staging the wrong file set for the intended category route even though the mount itself works

See [Troubleshooting](./troubleshooting.md) for the operator-focused failure matrix.
