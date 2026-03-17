---
title: Architecture
description: High-level architecture of the docs-era Glassbox Bio platform.
sidebar_position: 2
---

# Architecture

The Marketplace customer bundle is a small deployment system rather than a large service mesh. The architecture is centered on one primary execution workload and a few supporting control surfaces.

## Core runtime components

### Helm chart

The Helm chart under `manifest/chart/` is the primary deployment unit. It defines:

- the execution Job
- optional console deployment
- optional Marketplace `ubbagent` sidecar
- storage mode selection
- service account and Workload Identity wiring
- resource profile selection

### Kubernetes Job

The main computational workload runs as a Kubernetes Job. This is the unit that:

- reads inputs from the configured storage root
- executes the audit pipeline
- writes outputs under the configured output root
- calls the entitlement service during the run lifecycle

### Marketplace schema and Application CR

`schema.yaml` collects Marketplace UI inputs and maps them into Helm values. `manifest/application.yaml` groups the deployed resources into a single application object for Marketplace-oriented management.

### Entitlement + Seal API

The runtime calls the external Cloud Run entitlement service for:

- entitlement availability checks
- consumption
- run start recording
- run completion and seal issuance

### Storage layer

The chart supports:

- PVC-backed storage
- GCS-backed storage via GCS Fuse on GKE

## Optional runtime components

### `ubbagent`

The Marketplace reporting sidecar is optional in reviewer mode and enabled in the commercial reporting path.

### Console

The bundle also has an optional console image path, but the default Marketplace path keeps `console.enabled=false`.

## Architecture boundaries

The important boundaries in this deployment are:

- cluster workload versus external entitlement service
- input staging versus run-scoped outputs
- customer execution path versus Marketplace billing path
- reproducibility and seal artifacts versus ordinary runtime logs

This architecture is intentionally narrow. It reduces support surface area for the customer deployment package.
