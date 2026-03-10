---
title: Aggregation and Risk Synthesis
description: How module-level signals combine into system-level outputs.
sidebar_position: 7
tags:
  - computational-safety-diligence
---

# Aggregation and Risk Synthesis

The aggregation layer is where module-native outputs become category scores, risk summaries, fast-fail packets, and TRI-facing report artifacts.

## Artifacts involved in aggregation

The example bundle exposes the aggregation chain through:

- `results/combined_unified_computational_outputs.json`
- `thresholds/category_scores.json`
- `thresholds/measurement_profile.json`
- `thresholds/risk_summary.json`
- `results/risk_channels_map.json`
- `results/cbtri_policy_v1.json`
- `results/summary.json`

## What aggregation does

Aggregation combines:

- raw module outputs
- category policy
- threshold logic
- risk-channel mapping
- claim and tier rules

into the final report-facing artifacts.

## Why this is not a black box

The example output keeps the aggregation inputs inspectable:

- category scores show individual metric-level risk assignments
- measurement profile shows threshold rules
- risk summary shows category-by-category breakdown
- risk channels map shows how modules feed report channels
- CB-TRI policy shows channel weighting and band thresholds

That makes the aggregation layer auditable rather than purely narrative.
