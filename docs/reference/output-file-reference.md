---
title: Output File Reference
description: Reference for emitted files, manifests, and exported artifacts.
sidebar_position: 6
tags:
  - reference
---

# Output File Reference

All run outputs are written under a run-scoped directory:

```text
<output-root>/<run_id>/
```

Use this page as the canonical map of the files a completed run can emit.

## Core output files

| Path or pattern | Purpose | Notes |
| --- | --- | --- |
| `results/summary.json` | High-level run summary | Good first machine-readable checkpoint |
| `results/metrics.json` | Structured metrics output | Intended for automation and downstream processing |
| `results/*.html` | Human-readable report package | Exact filenames can vary by release |
| `run_manifest.json` | Run metadata and configuration snapshot | Core audit artifact |
| `preseal.json` | Metadata prepared for the sealing step | Useful for provenance review |
| `seal/seal.json` | Machine-readable seal record | Verification artifact |
| `seal/seal.sig` | Seal signature artifact | Verification artifact |
| `seal/seal.svg` | Portable user-facing seal | Used in the verification portal and rerun flow |
| `seal/VERIFY.md` | Verification instructions | Companion documentation for the seal bundle |

## Common HTML report names

Examples seen in the current customer documentation include:

- `results/phase5_combined_report.html`
- `results/phase5_comprehensive_report.html`
- `results/phase5_unified_report.html`
- `phase_5_computational_safety.html`
- `phase_5_conclusion_decision.html`

Treat the file family as stable even when exact filenames evolve between releases.

## Lifecycle notes

- Input discovery is project-scoped
- Output emission is run-scoped
- Multiple runs for the same project should not overwrite each other when `run_id` is unique
- Verification artifacts should remain bundled with the run output directory after export

For interpretation guidance, see [Report Package Overview](../computational-safety-diligence/outputs/report-package-overview.md).
