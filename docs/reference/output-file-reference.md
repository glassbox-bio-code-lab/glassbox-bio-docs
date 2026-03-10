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
| `run_manifest.json` | Run metadata and configuration snapshot | Core audit artifact at the root of the bundle |
| `plans/*_module_plan.json` | Module planning, category resolution, and tier compliance | Key run-planning artifact |
| `inputs/input_hashes.json` | Per-input hash manifest | Input integrity artifact |
| `raw/*_raw.json` | Module-native outputs | Includes status, result, metadata, and evidence linkage |
| `results/summary.json` | High-level run summary | Good first machine-readable checkpoint |
| `results/metrics.json` | Structured metrics output | Intended for automation and downstream processing |
| `results/*.html` | Human-readable report package | Exact filenames can vary by release |
| `results/context_of_use.json` | Claim scope and acceptance rules | Interpretation and applicability artifact |
| `results/evidence_state_machine.json` | Evidence-state rollup across modules | Coverage and provenance aid |
| `results/failure_mode_ontology_output_v1.json` | Failure-mode taxonomy, actions, and TRI projection | Decision and explanation artifact |
| `results/risk_channels_map.json` | Module-to-channel mapping | TRI and channel interpretation aid |
| `thresholds/*.json` | Category scoring and threshold policy artifacts | Risk rollup support |
| `preseal.json` | Metadata prepared for the sealing step | Useful for provenance review |
| `seal/preseal.json` | Pre-seal provenance record | Example bundle currently ends at this state |
| `seal/seal.json` | Machine-readable final seal record | Present only after final online verification succeeds |
| `seal/seal.sig` | Seal signature artifact | Final verification artifact |
| `seal/seal.svg` | Portable user-facing seal | Final verification artifact |
| `seal/VERIFY.md` | Verification instructions | Companion documentation for the final seal bundle |
| `repro_pack/manifest.json` | Rebuild manifest | Reproducibility artifact |
| `repro_pack/environment/*.json` | Environment capture | Python, system, and binary provenance |
| `repro_pack/container/*` | Rebuild and verification scripts | Dockerfile, run, build, and verify helpers |

## Common HTML report names

Examples seen in the example bundle include:

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
