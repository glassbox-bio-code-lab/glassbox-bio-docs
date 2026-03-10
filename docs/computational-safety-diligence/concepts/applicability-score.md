---
title: Applicability Score
description: How applicability or eligibility affects interpretation of results.
sidebar_position: 5
tags:
  - computational-safety-diligence
---

# Applicability Score

The current output bundle does not express applicability as one standalone scalar. Instead, applicability is represented through a set of linked artifacts that together determine whether a claim is supported, limited, or only hypothetical.

## Where applicability is encoded

In the example bundle, applicability is carried by:

- `results/context_of_use.json`
- `claim_acceptance`
- `plans/*_module_plan.json`
- `tier_compliance`
- `thresholds/measurement_profile.json`
- `thresholds/category_scores.json`

## Practical meaning

Applicability answers a narrower question than overall risk:

> Does this run support making this kind of claim for this category and tier?

That is why the example bundle can report:

- a concrete CB-TRI score
- a resolved category profile
- a technically successful run

and still conclude that global claim criteria are not fully met because `uncertainty_quantification` is missing.

## Example interpretation from the sample run

The example context-of-use package shows:

- intended decision: `triage`
- requested tier: `STANDARD`
- required modules per claim category
- claim strength demotion when required modules are missing

In the sample output, structural claims are still marked `SUPPORTED`, while verdict and safety-risk claims are demoted to `HYPOTHESIS`.

## What to check

When you need to assess applicability, read these in order:

1. resolved category profile
2. required modules for the claim category
3. missing required modules and reasons
4. final `claim_strength`

This is the operational form of applicability in the current pipeline.
