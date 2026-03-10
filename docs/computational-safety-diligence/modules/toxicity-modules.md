---
title: Toxicity Modules
description: Pages for toxicity and safety-signal module families.
sidebar_position: 4
tags:
  - computational-safety-diligence
---

# Toxicity Modules

The example bundle contains a substantial safety-oriented module family, including:

- `raw/toxicity_profile_raw.json`
- `raw/gcn_toxicity_raw.json`
- `raw/cyp_assessment_raw.json`
- `raw/metabolite_prediction_raw.json`
- safety-related threshold metrics and fast-fail signals

## What this family contributes

These modules feed:

- DILI and safety-risk interpretation
- CYP inhibition risk
- metabolite burden and reactive-metabolism signals
- broader toxicity and hazard framing

## Where the signals appear downstream

In the sample bundle, toxicity-family outputs reappear in:

- `thresholds/category_scores.json`
- `results/phase_5_fastfail_summary.json`
- `results/failure_mode_ontology_output_v1.json`

That means toxicity is not isolated to raw outputs. It is one of the families that strongly shapes downstream risk narratives and action recommendations.

## Interpretation rule

Read toxicity-family outputs together. A single hazard signal is less informative than the combined picture across toxicity, CYP, metabolite, and uncertainty-related modules.
