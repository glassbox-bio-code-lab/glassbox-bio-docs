---
title: Auditability
description: How an auditor can verify what happened in a run.
sidebar_position: 5
---

# Auditability

Auditability in the current deployment model comes from preserving a stable run identity, recording the lifecycle metadata, and bundling verification artifacts with the output package.

## Core audit artifacts

The minimum audit set should include:

- `run_manifest.json`
- `preseal.json`
- `seal/seal.json`
- `seal/seal.sig`
- `seal/seal.svg`

These files give an auditor or operator both the operational record and the verification record for the run.

## What an auditor should confirm

At minimum, an auditor should be able to answer:

1. Which `run_id` produced this output package
2. Which project and run mode were used
3. Which image or execution package ran
4. Whether Marketplace usage emission matched the run mode
5. Whether the seal can be verified independently

## Billing and audit linkage

The current customer validation evidence shows that usage reporting is intended to be:

- Completion-only
- One metric per run
- Idempotent for an already reported `run_id`

That is part of the audit story, not just a billing concern, because it ties reported consumption back to a specific run identity.

## Recommended review workflow

1. Open `run_manifest.json`
2. Confirm the effective `run_id`, run mode, and any reporting metadata
3. Review the human-facing report package
4. Verify `seal.svg`
5. Preserve the manifest and seal bundle with any exported run folder

## What auditability does not replace

Audit artifacts help confirm what ran and how the output bundle was linked to that run. They do not replace scientific review, legal review, or entitlement administration.
