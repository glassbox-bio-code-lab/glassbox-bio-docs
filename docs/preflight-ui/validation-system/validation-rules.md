---
title: Validation Rules
description: The ruleset used to classify submissions as ready, warning, or blocked.
sidebar_position: 2
tags:
  - preflight
---

# Validation Rules

This ruleset should mirror the current runner contract so that PreFlight UI catches packaging problems before a job starts.

## Severity classes

Use three outward-facing statuses:

| Status | Meaning | User action |
| --- | --- | --- |
| Ready | The package satisfies the current runner contract | Proceed to submission |
| Warning | The package is ingestible but likely incomplete for some downstream analyses | Review and decide whether to continue |
| Blocked | The package cannot be submitted safely because the current runner contract would fail or become ambiguous | Fix before submission |

## Blocking rules

Treat these conditions as `Blocked`:

- The `<project_id>` directory does not exist at the configured input root
- The `01_sources/` directory is missing
- `sources.json` is missing
- `sources.json` cannot be parsed
- The selection file referenced by `sources.json` cannot be found
- `portfolio_selected.csv` does not contain either `smiles` or `canonical_smiles`
- A file is referenced in `sources.json` but does not exist under `01_sources/`
- The package layout is staged at the wrong directory level for the configured `config.projectId`

These are not cosmetic issues. They correspond directly to known runtime failure conditions in the deployed runner.

## Warning rules

Treat these conditions as `Warning` rather than `Blocked` unless a selected workflow explicitly requires them:

- `assays.csv`, `compounds.csv`, `targets.csv`, or structure files are absent
- `primary_candidate_id` is missing for a multi-candidate submission
- Recommended identifier columns such as `candidate_id` or `compound_id` are absent
- Extra files are present but unreferenced by `sources.json`
- Input provenance is incomplete enough to reduce interpretability without breaking the run
- The staged package appears inconsistent with the intended category route, such as expecting a structure-backed workflow without any usable structure files
- The package is technically runnable but too thin to justify the module families implied by the intended category

## Readiness versus eligibility

Keep these two ideas separate:

- Eligibility answers whether the package matches a supported input contract
- Readiness answers whether the package is strong enough to produce useful downstream outputs

A package can be technically eligible but still deserve warnings because evidence depth, identifiers, or optional files are weak.

## Category-policy checks

Validation should explicitly distinguish packaging validity from category validity.

Examples:

- If labeled assay data is absent, the UI should not present the package as assay-routed without warning.
- If no receptor structure is staged, the UI should not imply that docking or other structure-backed modules will become required.
- If physics-audit-eligible paths are exposed in the UI, the underlying admissibility constraints should be checked before the package is presented as ready for that route.

Those checks should be explained with a link to [Category Policy and Routing](../../computational-safety-diligence/category-policy-and-routing.md).

## Rules that should be surfaced in the UI

Each rule should expose:

- A short machine-stable rule ID
- Human-readable problem text
- Severity
- The exact file or field that triggered the rule
- A concrete fix recommendation

## Recommended fix messaging

Prefer direct messages such as:

- `sources.json is missing from <project_id>/01_sources`
- `portfolio_selected.csv must contain smiles or canonical_smiles`
- `config.projectId does not match the staged input directory`

Avoid vague messages that force the user to infer the real packaging error.

For common resolution patterns, see [Troubleshooting](./troubleshooting.md).
