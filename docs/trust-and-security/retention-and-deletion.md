---
title: Retention and Deletion
description: How long data persists and how deletion requests are handled.
sidebar_position: 6
tags:
  - security
---

# Retention and Deletion

Document retention classes, deletion boundaries, and the difference between customer-controlled and system-controlled artifacts.

## Customer-controlled artifacts

In the default deployment model, run inputs, outputs, and verification artifacts remain in customer-controlled infrastructure until the customer deletes them.

That usually includes:

- staged input bundles
- run-scoped outputs
- reproducibility packs
- seal and report artifacts

If the platform is deployed in the customer's environment, Glassbox is not the default retention owner for those artifacts.

## Glassbox-retained materials

The main materials Glassbox may retain are narrower operational records such as:

- account and commercial records
- billing and transaction identifiers
- support emails or support log excerpts
- compliance or audit records needed for business operations

The Marketplace data-handling material also states that support emails and log snippets shared with Glassbox may be retained for up to 24 months for support and compliance purposes.

## Deletion model

Deletion needs to be described by boundary:

- customer-hosted run artifacts are deleted by the customer in customer infrastructure
- vendor-retained support or account records follow Glassbox retention policy and legal obligations
- third-party subprocessors follow their own applicable retention terms under the customer's relationship with them

## What users should understand

Users should be able to answer all of these questions:

- Which artifacts are deleted only by customer action
- Which records Glassbox may retain for support, billing, or compliance
- Whether optional external integrations create their own retention obligations
- Which deletion requests are operational and which are legal or contractual

For the broader boundary model, see [Data Boundaries](./data-boundaries.md).
