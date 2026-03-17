---
title: Module Coverage Ratio
description: How to read coverage, ineligibility, and missingness in the output package.
sidebar_position: 5
---

# Module Coverage Ratio

Coverage is not just a technical metric. It determines how much of the requested evidentiary contract was actually satisfied.

## Coverage layers in the example bundle

The sample output expresses coverage through several linked fields:

- `execution.counts` in `summary.json`
- `tier_compliance`
- `claim_acceptance`
- `modules_run_count`
- `modules_total_count`
- `modules_evidence_coverage`
- `claim_coverage`

## What counts as covered

In practice, a module contributes to coverage when it is:

- in scope for the resolved category
- planned for the run
- executed successfully
- able to contribute evidentiary output for the relevant claim type

## What does not count as covered

The example bundle distinguishes several reasons a module may not contribute to coverage:

- out of scope by category policy
- skipped because of missing input
- non-evidentiary for the current claim
- unresolved or incomplete for the requested tier

These states should not be collapsed into one generic "not run" bucket.

## Why coverage changes interpretation

The example run shows a concrete case:

- the run is technically successful
- the requested tier is `STANDARD`
- `uncertainty_quantification` is still missing because of `missing_input`

That missing required module does not erase every output, but it does change claim strength and defensibility.

## Practical reading rule

When a run looks strong but remains unresolved, check coverage before you trust the headline score. Coverage usually explains the gap between an informative run and a fully supported claim.
