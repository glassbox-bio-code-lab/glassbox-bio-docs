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

- `repro_pack/manifest.json`
- `repro_pack/environment/python.json`
- `repro_pack/environment/system.json`
- `repro_pack/environment/binaries.json`
- `repro_pack/container/Dockerfile`
- `repro_pack/container/build.sh`
- `repro_pack/container/run.sh`
- `repro_pack/container/verify.sh`
- `repro_pack/outputs/expected_output_hashes.json`

Depending on the release, the results directory may also include summary and metrics artifacts that are useful for spot-checking completeness.

## What the example reproducibility pack captures

The example pack captures:

- base image and entrypoint module
- environment defaults
- input references
- output artifact root
- Python package inventory
- OS package inventory
- binary presence and hashes
- container rebuild scripts
- output-hash verification support

This is the first place to look when a reviewer asks, "Can I rebuild or verify this run environment?"

## What `run_manifest.json` still adds

The main `run_manifest.json` outside the pack still matters because it connects the repro materials to the run identity, input context, and entitlement/execution metadata.

## What `verify.sh` is for

The example verification helper compares reproduced outputs against `expected_output_hashes.json`. That is different from seal verification. It is replay verification for the output files themselves.

## Recommended audit workflow

1. Confirm the `run_id` and runtime metadata in `run_manifest.json`
2. Review the captured environment and build scripts
3. Rebuild or rerun in a controlled workspace if needed
4. Use the output-hash verifier to compare reproduced outputs
5. Cross-check customer-facing report claims against the main manifest and result artifacts

For the output inventory view, see [Report Package Overview](./report-package-overview.md).
