---
title: Marketplace Support and SLA
description: Support scope and response targets for Marketplace deployments.
sidebar_position: 15
---

# Marketplace Support and SLA

This page rewrites the Marketplace support and SLA source into documentation form.

## Support channel

**Email:** `support@glassbox-bio.com`

**Hours:** Monday through Friday, 9am to 6pm ET, excluding holidays

## Severity levels and response targets

The source support terms describe:

- `SEV1` for service down or unable to run: initial response within 4 business hours
- `SEV2` for degraded service or suspected incorrect outputs: initial response within 1 business day
- `SEV3` for configuration questions or general help: initial response within 2 business days

## Included support

The current source includes support for:

- deploying the Marketplace application into the customer's GKE environment
- configuring required environment variables and credentials
- interpreting logs and run IDs
- bug triage and patch releases

## Not included

The source terms explicitly exclude:

- custom scientific consulting or target-specific interpretation
- customer cloud-architecture design
- data labeling, literature curation, or wet-lab execution
- dedicated enterprise support channels unless separately agreed

## Patch and availability model

The source states that security patches and bugfixes are shipped through updated Marketplace container images or deployment artifacts, and the customer is responsible for updating deployments.

Because the product runs in the customer's own environment, uptime depends on the customer's GCP configuration rather than on a vendor-hosted SaaS availability boundary.
