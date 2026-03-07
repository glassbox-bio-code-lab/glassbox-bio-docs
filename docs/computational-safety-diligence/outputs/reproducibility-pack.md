---
title: Reproducibility Pack
description: What the reproducibility package contains and how it should be used.
sidebar_position: 7
tags:
  - computational-safety-diligence
---

# Reproducibility Pack

The reproducibility pack is the subset of run artifacts that lets an operator or auditor reconstruct what was executed and verify that the reported outputs belong to that run.

## Core artifacts

Expect the reproducibility pack to include at least:

- `run_manifest.json`
- `preseal.json`
- `seal/seal.json`
- `seal/seal.sig`
- `seal/seal.svg`
- `seal/VERIFY.md`

Depending on the release, the results directory may also include summary and metrics artifacts that are useful for spot-checking completeness.

## What `run_manifest.json` should capture

The run manifest is the operational backbone of the pack. It should retain:

- `run_id`
- Effective run mode
- Selected usage metric metadata when Marketplace billing is enabled
- Input and output path context
- Image identity or container reference
- Core configuration needed to interpret the run

This file is the first place to look when a reviewer asks, "What exactly ran?"

## What `preseal.json` adds

`preseal.json` captures the metadata that feeds the sealing step. Use it when you need to compare the final seal bundle with the run state that immediately preceded signature generation.

## What the seal bundle adds

The seal bundle provides:

- A machine-readable seal document
- A signature artifact
- A portable SVG representation for user-facing verification
- Verification instructions

Together, these artifacts let you verify that the run package was sealed and that the seal can be checked independently of the original runtime.

## Recommended audit workflow

1. Confirm the `run_id` and runtime metadata in `run_manifest.json`
2. Review `preseal.json` to understand the state presented to the sealing stage
3. Verify the seal using `seal.svg` and the published verification flow
4. Cross-check any customer-facing report claims against the manifest and evidence-linked outputs

For the output inventory view, see [Report Package Overview](./report-package-overview.md).
