---
title: Schemas
description: Input and output schemas for the platform.
sidebar_position: 5
tags:
  - reference
---

# Schemas

The example output bundle exposes the major schema families used by the pipeline. This page maps the top-level files to their visible `schema_version` values and structural role.

## Core run and planning schemas

| Artifact | Observed schema/version | Purpose |
| --- | --- | --- |
| `run_manifest.json` | `1.0.0` | Run identity, inputs, runner, entitlement |
| `plans/*_module_plan.json` | `orchestrator_v1` | Category resolution, module plan, tier compliance, claim acceptance |
| `repro_pack/manifest.json` | `repro_manifest_v1`-style manifest shape with explicit run fields | Rebuild and replay contract |

## Results schemas

| Artifact | Observed schema/version | Purpose |
| --- | --- | --- |
| `results/summary.json` | `1.0.0` | Top-line run outcome and output pointers |
| `results/context_of_use.json` | `context_of_use_pack_v1` plus nested `context_of_use_v1` and `cou_claim_acceptance_v1` | Claim scope and acceptance rules |
| `results/evidence_state_machine.json` | `evidence_state_machine_pack_v1` with nested `evidence_state_machine_v1` | Module evidence state tracking |
| `results/failure_mode_ontology_output_v1.json` | `fmos_v1_1` | Failure-mode ontology and TRI projection |
| `results/phase_5_wetlab_readiness_machine.json` | `wetlab_readiness_machine_signal_v1` | Machine-readable wet-lab readiness artifact |
| `results/cbtri_policy_v1.json` | `cbtri_policy_v1` | Channel weights, bands, and evidence-strength policy |

## Threshold schemas

| Artifact | Observed schema/version | Purpose |
| --- | --- | --- |
| `thresholds/category_scores.json` | `1.0.0` | Metric values and risk levels for the resolved category |
| `thresholds/measurement_profile.json` | `1.0.0` | Threshold rules and comparison logic |
| `thresholds/risk_summary.json` | `1.0.0` | Rollup risk and evidence-status breakdown |

## Integrity schemas

| Artifact | Observed schema/version | Purpose |
| --- | --- | --- |
| `inputs/input_hashes.json` | file-keyed hash map | Per-input hashing manifest |
| `seal/preseal.json` | `1.0.0` | Pre-seal provenance state before final online verification |

## Raw module artifact shape

Most `raw/*_raw.json` files follow a common shape built around:

- `module_id`
- `generated_at`
- `status`
- `reason`
- `result`
- `metadata`
- `_inputs`
- `_run`
- `_certificate`
- `_artifact`
- module-scoped evidence ID fields

The exact fields vary by module, but the pattern is stable enough to document as a family.

## Documentation rule

When adding new schema docs, record both:

- the file-level schema version
- the nested schema objects that matter for interpretation

That is necessary because some emitted files are wrapper packs that contain smaller versioned subdocuments.
