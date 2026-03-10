---
title: Clinical Precedent
description: Pages for clinical precedent and related evidence modules.
sidebar_position: 6
tags:
  - computational-safety-diligence
---

# Clinical Precedent

The example bundle includes clinical precedent as both a raw module artifact and a major contributor to the final TRI-facing narrative.

## Example artifacts

- `raw/clinical_precedent_prior_raw.json`
- precedent-related metrics in `thresholds/category_scores.json`
- precedent uplift and program rows in `results/failure_mode_ontology_output_v1.json`

## What this module family contributes

Clinical precedent contributes signals such as:

- efficacy-risk framing
- evidence density
- precedent-based uplift in the TRI projection
- program-level historical context

![Clinical precedent report example](../../report_images/clinical_precedent_report.png)

_In the rendered report, precedent appears as an interpretive section that supports aggregate risk framing rather than as an isolated side note._

## Interpretation rule

Historical precedent is useful, but it must remain bounded:

- precedent can sharpen risk interpretation
- precedent does not replace current-run evidence
- precedent can create strong negative context without proving a future outcome

In the sample output, precedent materially affects the TRI projection and should therefore be treated as a major driver, not a decorative appendix.
