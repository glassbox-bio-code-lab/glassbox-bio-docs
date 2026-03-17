---
title: Interpret Results
description: How to move from a finished run to actionable decisions.
sidebar_position: 6
---

# Interpret Results

The output bundle is designed to be read in layers. Start with the decision-oriented summary, then descend into coverage, evidence, and provenance only as far as the current question requires.

## Recommended reading order

1. `results/summary.json`
2. `results/phase_5_fastfail_summary.json` or the matching HTML
3. `results/phase_5_computational_safety.html`
4. `results/risk_channels_map.json`
5. `results/evidence_state_machine.json`
6. `plans/*_module_plan.json`
7. `run_manifest.json` and the reproducibility artifacts

## What each layer answers

### Summary

`summary.json` gives the top-line outcome:

- aggregate risk band
- technical integrity risk band
- CB-TRI score and band
- evidence status
- category preset and resolution
- seal status and tamper status

This is the fastest way to determine whether the run is low risk, elevated, unresolved, or missing final verification.

If you are reviewing the rendered report first rather than the JSON, the CB-TRI and summary-style panels serve the same role:

![CB-TRI example panel](../report_images/cbtri_report.png)

_Use the score and band for orientation, then move down into the underlying channels before treating it as decision-ready._

### Fast-fail summary

The fast-fail summary explains why the run should stop, escalate, or proceed cautiously. In the example bundle it includes:

- prioritized risk signals
- missing proofs
- unresolved evidence
- out-of-scope modules
- tier compliance
- evidence coverage
- recommended next checks

The projected-failure-modes section is usually the most direct visual expression of this layer:

![Projected failure modes example](../report_images/projected_failure_modes.png)

_This is the section to read when the key question is not "what is the score?" but "what is likely to fail next and why?"_

### Full computational safety report

The full HTML report is the human-readable narrative layer. Use it after you know the high-level verdict and want the report framing rather than just the machine fields.

Common examples in the rendered report include domain-specific panels such as:

![Target biology risk summary example](../report_images/target_biology_risk_summary.png)

![Target biology risk detail example](../report_images/target_biology_risk_detailed.png)

### Evidence and coverage

When you need to understand why a claim was downgraded or left unresolved, inspect:

- `evidence_state_machine.json`
- `context_of_use.json`
- `claim_acceptance`
- `tier_compliance`

These files explain not just what ran, but whether the run supports a claim category at the requested confidence level.

Clinical precedent is another example of a section that should be interpreted as evidence context rather than as a standalone decision:

![Clinical precedent example](../report_images/clinical_precedent_report.png)

### Provenance and reproducibility

When you need to support review, export, or replay, move to:

- `run_manifest.json`
- `inputs/input_hashes.json`
- `seal/preseal.json`
- `repro_pack/`

## Goal

A reader should leave this page knowing which artifact to consult for:

- top-line risk
- failure drivers
- evidentiary gaps
- claim acceptance
- audit and replay support
