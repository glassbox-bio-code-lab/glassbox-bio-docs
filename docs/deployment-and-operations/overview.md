---
title: Overview
description: Architecture and operational guidance across the platform.
sidebar_position: 1
---

# Overview

This section covers the deployable customer-facing runtime bundle for Glassbox Bio Molecular Audit as it appears in the Marketplace package and CLI install flow.

## What this section is about

The public deployment bundle is organized around:

- a Helm chart under `manifest/chart/`
- a Marketplace schema in `schema.yaml`
- an Application manifest in `manifest/application.yaml`
- example values for PVC, GCS, entitlement, and billing settings
- customer operational docs

These pages explain how those pieces fit together in the supported customer deployment path.

## Supported deployment model

The current supported customer path is a Kubernetes Job deployed by Helm, with:

- Standard CPU and Deep GPU profiles
- PVC storage by default
- optional GCS Fuse storage on GKE
- identity-based entitlement checks through the Entitlement + Seal API
- required Marketplace usage reporting through `ubbagent`

## Recommended reading order

Start with [Architecture](./architecture.md) and [Component Topology](./component-topology.md), then move to [Kubernetes and Helm](./kubernetes-and-helm.md), [Configuration](./configuration.md), [Secrets](./secrets.md), [Storage and Networking](./storage-and-networking.md), and [Troubleshooting](./troubleshooting.md).

## What is intentionally out of scope

This section does not document the science-facing interpretation of the output artifacts. For that, use the Computational Safety Diligence section.
