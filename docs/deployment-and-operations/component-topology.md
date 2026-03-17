---
title: Component Topology
description: How the platform components relate to each other in practice.
sidebar_position: 3
---

# Component Topology

This page describes which components talk to each other during a normal customer run and what trust boundaries matter.

## Topology at a glance

1. Marketplace or the operator supplies values into Helm
2. Helm deploys the chart and associated application resources into the cluster
3. The Job reads inputs from PVC or GCS-backed `/data`
4. The Job calls the Entitlement + Seal API over HTTPS
5. The Job writes outputs back to the configured output path
6. Required `ubbagent` emits usage metrics for Marketplace billing

## Resource relationships

### Marketplace schema to Helm values

`schema.yaml` maps user-visible Marketplace properties such as:

- `projectId`
- `runMode`
- `storageType`
- `reportingSecret`
- image repo and tag fields

into the chart values consumed at deploy time.

`runMode` here still describes execution profile, not scientific category. The actual module-routing category is resolved later from the staged package and policy. See [Category Policy and Routing](../computational-safety-diligence/category-policy-and-routing.md).

### Helm chart to Kubernetes resources

The chart creates or manages:

- Job
- ConfigMap
- PersistentVolumeClaim
- ServiceAccount
- Role and RoleBinding
- optional Secret references

### Workload to storage

The main workload expects the input and output roots to be available at `/data`. That can be satisfied either by:

- a mounted PVC
- a GCS Fuse mount configured through the chart

### Workload to entitlement service

The Job calls:

- `check`
- `consume`
- `run_start`
- `run_complete`

against the configured entitlement URL. In the recommended path, the caller identity is provided by Workload Identity.

### Workload to billing sidecar

The main workload and `ubbagent` cooperate through injected config and the Marketplace reporting secret. Supported Marketplace deployments keep this sidecar enabled.

## Trust boundaries

The main trust boundaries are:

- Kubernetes cluster boundary
- GCS or PVC storage boundary
- Cloud Run entitlement-service boundary
- Marketplace reporting boundary

These are the places where identity, secret handling, and network assumptions need to stay explicit.
