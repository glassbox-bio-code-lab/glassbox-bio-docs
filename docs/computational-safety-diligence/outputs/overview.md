---
title: Overview
description: Map of the core output package and how each artifact should be used.
sidebar_position: 1
tags:
  - computational-safety-diligence
---

# Outputs Overview

The example bundle shows the output package as a layered decision system. The files are grouped by function rather than by audience only.

## Output families in the example bundle

### Run identity and planning

- `run_manifest.json`
- `plans/*_module_plan.json`

These files explain what the run was, which category it resolved to, and which modules were expected.

### Raw module outputs

- `raw/*_raw.json`
- `raw/sar_explorer/*`

These are the module-native artifacts and should be treated as the closest layer to the execution source.

### Results

- `results/summary.json`
- `results/phase_5_fastfail_summary.json`
- `results/phase_5_fastfail_summary.html`
- `results/phase_5_computational_safety.html`
- `results/phase_5_pipeline_analytics_snapshot.*`
- `results/context_of_use.json`
- `results/evidence_state_machine.json`
- `results/failure_mode_ontology_output_v1.json`
- `results/risk_channels_map.json`

These files are the main interpretation surface.

### Threshold and category artifacts

- `thresholds/category_scores.json`
- `thresholds/measurement_profile.json`
- `thresholds/risk_summary.json`

These artifacts explain how raw and aggregated signals are turned into risk bands and evidence statuses.

### Integrity and replay artifacts

- `inputs/input_hashes.json`
- `seal/preseal.json`
- `repro_pack/`

These files support hashing, pre-seal provenance, rebuild recipes, and verification of reproduced outputs.

## How to read the package

Start with `summary.json`, then move to fast-fail, then coverage and evidence-state artifacts, and finally the reproducibility materials if you need audit depth.
