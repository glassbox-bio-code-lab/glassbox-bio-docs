---
title: Data Boundaries
description: What data the system touches and where the trust boundaries sit.
sidebar_position: 3
tags:
  - security
---

# Data Boundaries

Be explicit about what enters the system, where it is processed, and what leaves it.

## Data categories

The current documentation distinguishes between several categories of data:

- account and contact information needed for support or account management
- customer inputs submitted for audit, such as targets, assay references, compound data, configs, and supporting evidence
- operational metadata such as `run_id`, timestamps, and system metrics
- deliverables and verification artifacts produced by the run

These categories should not be treated as interchangeable because they have different handling paths and retention expectations.

## Default processing boundary

In the default Marketplace and customer-deployment model, customer inputs and deliverables remain in the customer environment:

- customer GKE workloads
- attached PVC storage or Cloud Storage
- customer-controlled logs and runtime resources

That boundary changes only when the customer explicitly enables an external integration or shares materials for support.

## What Glassbox may receive

The documented model is intentionally narrow. Glassbox may receive or process:

- account or contact information needed for commercial and support workflows
- entitlement-verification traffic
- optional sealing or verification service traffic when that path is enabled
- support emails, log excerpts, or troubleshooting artifacts that the customer chooses to share

Outside those paths, the default model is customer-environment execution rather than vendor-side custody.

## External subprocessors and integrations

If the customer enables optional third-party APIs such as external LLM services, those providers process the transmitted data under the customer's relationship with that provider.

This matters because data boundaries are not defined only by the core product. They are also defined by which optional integrations the customer turns on.

## Prohibited data

The current policy says customers should not submit:

- protected health information
- human-subject data with identifiers
- export-controlled data without authorization
- data the customer does not have rights to use

These restrictions should be surfaced as policy boundaries, not buried in troubleshooting text.
