---
title: FAQ
description: Common orientation questions for new users and evaluators.
sidebar_position: 6
---

# FAQ

## What is the difference between PreFlight UI and Computational Safety Diligence?
PreFlight UI is for packaging and readiness checks before a run starts. Computational Safety Diligence is for running the analysis and reviewing the resulting risk, evidence, and reproducibility outputs.

## How are Modules different from the analysis modules used in a run?
Modules are optional workflow extensions. The analysis modules are the components used to generate the main run outputs.

## Where should a new customer start?
Start in Getting Started, then move to Quickstart if you need action, or Platform Overview if you need orientation. After that, go to PreFlight UI for input readiness and then Computational Safety Diligence for the run and output interpretation path.

## What is the main output of the pipeline?

The main output is not just an HTML report. It is a run-scoped bundle that includes summary artifacts, threshold and category artifacts, evidence-state outputs, reproducibility materials, and seal-related provenance artifacts.

## Does a successful run mean the science is correct?

No. A successful run means the computation executed and produced a verifiable artifact. Scientific truth, wet-lab validity, and investment policy decisions remain separate from computational execution success.

## Why can a run have a score and still be unresolved?

Because the pipeline separates risk scoring from claim acceptance. A run can produce a valid CB-TRI score while still being unresolved due to missing required evidence, missing-proof handling, or claim-strength demotion.

## What should I read after a first run completes?

Read in this order:

1. `summary.json`
2. Fast-fail summary
3. Full computational safety report
4. Evidence-state and claim-acceptance artifacts
5. Reproducibility and seal artifacts if you need audit depth
