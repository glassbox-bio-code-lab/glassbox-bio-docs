---
title: Security Overview
description: High-level security model and control areas.
sidebar_position: 2
tags:
  - security
---

# Security Overview

This page summarizes the current control areas exposed in the customer deployment and Marketplace documentation.

## Identity and access

The current customer deployment path is identity-based:

- The job authenticates to the entitlement service with Google identity
- Workload Identity binds the Kubernetes workload to a GCP service account
- Customers do not manage long-lived entitlement tokens in the normal run path

This keeps run authorization tied to workload identity rather than to a copied secret in customer operations.

## Secret handling

The documented secret classes are narrow:

- Marketplace reporting credentials via `marketplace.reportingSecret`
- Admin-side issuance credentials such as `X-GBX-ADMIN-TOKEN`
- Workload identity configuration for service-to-service auth

The customer docs explicitly distinguish between entitlement auth and Marketplace reporting. They are not the same secret or control boundary.

## Runtime security baseline

The Marketplace review checklist expects the following baseline:

- `allowPrivilegeEscalation: false`
- Containers drop all Linux capabilities
- Runtime containers operate as non-root where applicable
- Network exposure remains conservative, such as `ClusterIP` defaults

These are baseline controls, not optional hardening extras.

## Payment and transaction security

Where direct billing applies, payment processing is delegated to Stripe rather than handled inside the platform. The documented posture is:

- Glassbox does not store full card data
- Stripe handles payment information under PCI-DSS controls
- The platform retains transaction identifiers and billing metadata only as needed for operations and support

## Audit integrity

Security posture also includes output integrity controls:

- SHA-256 checksums over key artifacts
- signed provenance bundles
- seed-locked reproducibility materials where that product tier is enabled
- rendered verification artifacts such as `seal.svg`

These controls are designed to make tampering, substitution, and silent drift detectable after export.

## Data and artifact boundaries

Operationally, the platform distinguishes between:

- Input staging under the configured input root
- Run-scoped outputs under the configured output root
- Verification artifacts bundled with the run output
- External services for entitlement checks and seal verification

That separation matters because a project-scoped input folder can produce multiple run-scoped output bundles.

## Auditability

Security posture is not just preventive. It is also inspectable through:

- `run_manifest.json`
- Usage reporting metadata
- Seal verification artifacts
- Logs for entitlement lifecycle events

## Reporting security issues

Security questions and vulnerability reports should be routed through the documented support or security contact path rather than embedded in ordinary run submissions.

For the verification workflow, see [Auditability](./auditability.md) and [Cryptographic Provenance](./cryptographic-provenance.md).
