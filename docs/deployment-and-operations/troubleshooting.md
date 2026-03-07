---
title: Troubleshooting
description: Common deployment, storage, runtime, and verification failure modes.
sidebar_position: 12
tags:
  - deployment
---

# Troubleshooting

Use this page for the highest-frequency operational issues seen during deployment and run execution.

## ImagePullBackOff

### What it means

The cluster cannot pull the container image for one or more pods.

### Common causes

- Wrong image repository, tag, or digest
- Missing registry credentials or permissions
- Image not yet published or not visible to the cluster

### What to check

- Pod events for pull and auth failures
- The exact image reference in Helm values
- Cluster access to Artifact Registry or the target registry

### Typical fix

Correct the image reference, fix registry access, or publish the missing image and redeploy.

## CrashLoopBackOff

### What it means

A container starts and repeatedly crashes.

### Common causes

- Invalid Helm values
- Missing files, mounts, or secret references
- Startup failures caused by insufficient memory or CPU

### Typical fix

Review the crashing container logs, then correct values, mounts, or resource settings before rerunning.

## Job Pending

### What it means

The job pod cannot be scheduled.

### Common causes

- Not enough CPU, memory, or GPU capacity
- Resource requests larger than the available node pool
- Selectors, taints, tolerations, or affinity rules that prevent scheduling

### Typical fix

Scale the node pool, reduce requests if safe, or align node selection settings with the available nodes.

## PVC Pending

### What it means

The PersistentVolumeClaim cannot be bound.

### Common causes

- Missing or wrong `StorageClass`
- Provisioner failure
- Unsupported access mode or size request

### Typical fix

Confirm the `StorageClass`, adjust the request, or fix the storage provisioner path.

## 403 or AccessDenied on GCS

### What it means

The workload does not have permission to read or write the configured bucket path.

### Common causes

- Missing IAM bindings
- Broken Workload Identity binding
- Incorrect bucket or prefix configuration

### Typical fix

Fix IAM, correct the Workload Identity binding, or repair the bucket path configuration.

## Job completed but outputs are missing

### What it means

The job reached a terminal state, but the expected artifacts are not in the expected location.

### Common causes

- Wrong bucket prefix or PVC path
- Incorrect `config.projectId`
- Misconfigured or skipped output upload step

### Typical fix

Compare the runtime config to the expected storage path, then inspect the logs for copy or upload steps.

## `ubbagent` not ready

### What it means

The Marketplace reporting sidecar cannot start or report usage.

### Common causes

- Reporting secret is missing or malformed
- Sidecar image cannot be pulled
- Network restrictions block reporting endpoints

### Typical fix

Recreate the secret, fix the image reference, or allow the required egress path.

## Verification failure

### What it means

The downloaded or restored bundle does not pass verification.

### Common causes

- Incomplete download
- Bundle files modified after retrieval
- Wrong bundle version or mismatched manifest

### Typical fix

Re-download the bundle, avoid mutating the files, and verify against the correct run artifact set.
