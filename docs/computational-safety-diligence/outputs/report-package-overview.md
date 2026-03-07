---
title: Report Package Overview
description: What is included in a completed analysis package.
sidebar_position: 2
tags:
  - computational-safety-diligence
---

# Report Package Overview

Completed runs write their artifacts under a run-scoped output directory:

```text
<output-root>/<run_id>/
```

This page describes the major artifact families a reviewer should expect to find in that folder.

## Output structure at a glance

| Artifact | Typical location | Primary audience | Purpose |
| --- | --- | --- | --- |
| Run summary | `results/summary.json` | Reviewer, operator, integrator | High-level run outcome and top-line results |
| Metrics | `results/metrics.json` | Operator, downstream automation | Structured machine-readable metrics |
| HTML reports | `results/*.html` | Reviewer, customer-facing decision workflow | Human-readable report package |
| Run manifest | `run_manifest.json` | Auditor, operator | Configuration, run identity, and runtime metadata |
| Pre-seal metadata | `preseal.json` | Auditor | Inputs to the final sealing step |
| Seal bundle | `seal/seal.json`, `seal/seal.sig`, `seal/seal.svg` | Auditor, customer, verifier | Integrity and verification artifacts |

## Summary and metrics artifacts

Use the structured JSON files when you need stable machine-readable outputs for automation, indexing, or downstream integrations.

Common files include:

- `results/summary.json`
- `results/metrics.json`

Treat these as the fastest way to understand whether a run completed and what the top-level signals were.

## HTML report artifacts

The runner can emit multiple HTML reports depending on release and packaging. Common examples include:

- `results/phase5_combined_report.html`
- `results/phase5_comprehensive_report.html`
- `results/phase5_unified_report.html`
- `phase_5_computational_safety.html`
- `phase_5_conclusion_decision.html`

File names can vary by release, but the product role is stable: these artifacts are the main human-readable review surface.

## Verification-oriented artifacts

The verification set normally includes:

- `run_manifest.json`
- `preseal.json`
- `seal/seal.json`
- `seal/seal.sig`
- `seal/seal.svg`
- `seal/VERIFY.md`

These files support audit, provenance review, and public verification workflows.

## How to use the package

Recommended reading order:

1. Review `results/summary.json` or the top-level summary in the HTML report
2. Read the human-facing HTML report for context and interpretation
3. Inspect `run_manifest.json` when you need to confirm the exact run identity and configuration
4. Use the seal bundle when you need to validate provenance or support a rerun-verification workflow

For the audit-specific view, see [Reproducibility Pack](./reproducibility-pack.md) and [Verification Seal](./verification-seal.md).
