---
title: Missing Proof Detection
description: How the system treats absent, incomplete, or insufficient supporting data.
sidebar_position: 6
---

# Missing Proof Detection

Missing proof is represented explicitly in the current output model. It is not supposed to disappear inside a single composite score.

## What counts as missing proof

The example bundle shows several concrete missing-proof signals:

- required modules missing from the executed set
- in-scope modules skipped with `reason: missing_input`
- unresolved evidence notes in `risk_summary.json`
- `claim_strength` demoted to `HYPOTHESIS`
- fast-fail outputs listing `missing_proofs` and `missing_proof_details`

## How the system flags it

The sample artifacts surface missing-proof state in multiple places:

- `tier_compliance.missing_required_modules`
- `claim_acceptance.global.missing_required_modules`
- `phase_5_fastfail_summary.json`
- `risk_summary.evidence_notes`

In the example run, `uncertainty_quantification` is missing because of `missing_input`, and that directly affects whether verdict and safety claims are treated as supported.

## How it changes interpretation

Missing proof changes more than the explanation text. It can change:

- claim strength
- recommendation mode
- evidence status
- whether a claim is treated as supported or only hypothetical

That is why the sample run can have a concrete risk score and still require `MISSING_PROOF_ACTIONS_ONLY`.

## Recommended reading rule

When a run is unresolved, check missing-proof handling before you react to the headline score. The missing-proof layer often explains why a run that looks informative is still not fully decision-ready.
