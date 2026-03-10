---
title: Overview
description: Entry point for the core analysis product and its report workflow.
sidebar_position: 1
tags:
  - computational-safety-diligence
---

# Overview

This section covers the primary analysis surface that turns a staged input bundle into a run-scoped risk artifact, report package, thresholds, provenance records, and reproducibility materials.

## What the example output demonstrates

The `example_output/` bundle shows the major artifact families produced by the computational safety diligence pipeline:

- `run_manifest.json` for run identity and execution metadata
- `plans/` for plan resolution and tier compliance
- `raw/` for module-native outputs
- `results/` for the report-oriented and decision-oriented outputs
- `thresholds/` for category-aware scoring and measurement policy
- `inputs/` for input hashing
- `seal/` for sealing state
- `repro_pack/` for rebuild and verification materials

This section explains how to read those outputs as one coherent system rather than as an unrelated file dump.

## What belongs here

- How a run is configured and categorized
- How outputs are grouped and interpreted
- How evidence state, failure modes, and risk channels are represented
- How plan resolution and missing-proof handling affect claim strength
- How reproducibility and verification artifacts fit into the final package

## What does not belong here

- Pre-submission validation mechanics that belong in PreFlight UI
- Marketplace packaging and deployment concerns that belong in Deployment and Operations
- Optional extension products that belong under Add-Ons

## Recommended reading order

1. [Supported Project Types](./supported-project-types.md)
2. [Create and Configure a Run](./create-and-configure-a-run.md)
3. [Outputs Overview](./outputs/overview.md)
4. [Interpret Results](./interpret-results.md)
