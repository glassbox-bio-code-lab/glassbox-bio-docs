---
title: Secrets
description: How secrets are managed across platform components.
sidebar_position: 7
tags:
  - deployment
---

# Secrets

The deployment bundle uses a small number of secret classes, and the docs should keep them clearly separated because they serve different trust boundaries.

## Secret classes

### Marketplace reporting secret

The main customer-facing secret in the Marketplace path is:

- `marketplace.reportingSecret`

This secret is injected by Marketplace and used by `ubbagent` for usage reporting. It is expected to contain the Marketplace reporting material, including fields such as:

- `consumer-id`
- `entitlement-id`
- `reporting-key`

### Admin issuance credential

On the publisher or admin side, entitlement issuance uses an admin credential path documented as:

- `X-GBX-ADMIN-TOKEN`

This is not a customer-managed runtime secret.

### Identity token path

The preferred customer entitlement flow is identity-based rather than long-lived token-based. That means the job usually relies on:

- Workload Identity
- an automatically minted Google identity token

instead of storing a customer entitlement token in a Kubernetes Secret.

## Where secrets are consumed

- `marketplace.reportingSecret` is consumed by the Marketplace reporting path and sidecar
- admin issuance credentials are consumed by publisher-side operational workflows
- Workload Identity configuration is consumed by the Kubernetes job when calling Cloud Run services

## Documentation rules

- Do not mix entitlement auth material with billing secret material
- Do not imply that customers should manually manage an entitlement token in the normal production path
- Do not publish secret contents or internal-only tokens in docs

## Operational notes

When billing is disabled for reviewer testing:

- `ubbagent.enabled: false`
- `marketplace.reportingSecret: ""`

In that mode, no reporting secret should be required by the runtime path.
