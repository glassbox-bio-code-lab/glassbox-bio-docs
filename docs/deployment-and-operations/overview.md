---
title: Overview
description: Architecture and operational guidance across the platform.
sidebar_position: 1
---

# Overview

This section covers the deployable customer-facing runtime bundle for Glassbox Bio Molecular Audit as it appears in the Marketplace package and CLI install flow.

## What this section is about

The source deployment bundle under `gbx_marketplace_cloud_customer_docs/` is organized around:

- a Helm chart under `manifest/chart/`
- a Marketplace schema in `schema.yaml`
- an Application CR in `manifest/application.yaml`
- example values for PVC, GCS, and entitlement settings
- customer and reviewer operational docs

These pages explain how those pieces fit together in production and review environments.

## Supported deployment model

The current supported customer path is a Kubernetes Job deployed by Helm, with:

- Standard CPU and Deep GPU profiles
- PVC storage by default
- optional GCS Fuse storage on GKE
- identity-based entitlement checks through the Entitlement + Seal API
- optional Marketplace usage reporting through `ubbagent`

## Recommended reading order

1. [Architecture](./architecture.md)
2. [Component Topology](./component-topology.md)
3. [Kubernetes and Helm](./kubernetes-and-helm.md)
4. [Configuration](./configuration.md)
5. [Secrets](./secrets.md)
6. [Storage and Networking](./storage-and-networking.md)
7. [Troubleshooting](./troubleshooting.md)

## What is intentionally out of scope

This section does not document the science-facing interpretation of the output artifacts. For that, use the Computational Safety Diligence section.
