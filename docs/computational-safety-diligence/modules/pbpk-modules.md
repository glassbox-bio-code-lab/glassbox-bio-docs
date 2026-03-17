---
title: PBPK Modules
description: Pages for PBPK or related sensitivity-analysis module families.
sidebar_position: 5
---

# PBPK Modules

PBPK-related analysis appears in the example bundle through `raw/pbpk_sensitivity_raw.json` and through references in the module plan and thresholded outputs.

## What this family does

PBPK-related modules contribute pharmacokinetic sensitivity context that can influence:

- dose interpretation
- route or exposure framing
- downstream safety-risk interpretation

## Availability

PBPK analysis is not universal. It depends on the resolved category, available inputs, and plan configuration. That is why it should be read through the module plan rather than assumed to be present in every run.

## Interpretation rule

Treat PBPK output as one component of the evidence base, not as a standalone decision authority. Its value depends on whether the required input context and coverage are actually present for the run.
