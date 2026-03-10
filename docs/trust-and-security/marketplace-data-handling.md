---
title: Marketplace Data Handling
description: Data handling terms for Google Cloud Marketplace deployments.
sidebar_position: 12
tags:
  - security
  - privacy
  - marketplace
---

# Marketplace Data Handling

This page rewrites the Marketplace data-handling addendum into documentation form.

## Data categories

The Marketplace source material distinguishes:

- account or contact information required for support
- customer inputs submitted to the product
- operational metadata such as `run_id`, timestamps, and system metrics

## Default data residency

The source addendum says customer inputs and deliverables are processed and stored in the customer's Google Cloud environment by default.

That means the standard Marketplace deployment is designed around customer-environment execution rather than vendor-side custody of run data.

## External subprocessors

If the customer enables optional external APIs, such as LLM providers, those services process the transmitted data under the customer's own relationship with that provider. The customer supplies the API keys and authorizes the transfer.

## Retention

The Marketplace addendum says:

- artifacts stay in customer-controlled Google Cloud resources until the customer deletes them
- support emails and log snippets shared with Glassbox may be retained for support and compliance purposes for up to 24 months

## Security controls

The source material calls out:

- TLS for transport
- least-privilege IAM recommendations
- integrity artifacts such as checksums and manifests where applicable

For the broader trust model, see [Self-Hosted Trust Model](./self-hosted-trust-model.md).
