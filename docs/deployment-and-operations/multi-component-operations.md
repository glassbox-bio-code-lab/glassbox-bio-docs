---
title: Multi-Component Operations
description: Operational playbooks for running PreFlight UI, core analysis, and Modules together.
sidebar_position: 11
---

# Multi-Component Operations

This page covers day-2 operational tasks once the deployment is already running and you need to inspect, retrieve, or move artifacts.

## Verify deployment health

```bash
kubectl get jobs -n glassbox-mol-audit
kubectl logs -n glassbox-mol-audit job/glassbox-mol-audit --all-containers=true
```

Use the job state and logs together. A completed job with missing outputs usually indicates a configuration or retrieval-path mismatch rather than a scheduler failure.

## Retrieve outputs from PVC storage

Create a temporary helper pod mounted to the app PVC:

```bash
cat <<'YAML' | kubectl apply -n glassbox-mol-audit -f -
apiVersion: v1
kind: Pod
metadata:
  name: pvc-loader
spec:
  restartPolicy: Never
  containers:
    - name: loader
      image: alpine:3.19
      command: ["sh", "-c", "sleep 3600"]
      volumeMounts:
        - name: mol-audit-data
          mountPath: /data
  volumes:
    - name: mol-audit-data
      persistentVolumeClaim:
        claimName: glassbox-mol-audit-data
YAML

kubectl wait -n glassbox-mol-audit --for=condition=Ready pod/pvc-loader --timeout=120s
kubectl cp glassbox-mol-audit/pvc-loader:/data/output ./gbx_output
kubectl delete pod pvc-loader -n glassbox-mol-audit
```

## Retrieve outputs from GCS

```bash
gsutil -m cp -r gs://YOUR_BUCKET/<project_id>/results ./gbx_output/results
```

## Operational watchpoints

- `CrashLoopBackOff` usually points to image, config, or mount problems
- `ImagePullBackOff` usually points to registry access or image reference problems
- `ubbagent` failures usually point to reporting secret, sidecar image, or egress configuration problems

For the full failure matrix, see [Troubleshooting](./troubleshooting.md).
