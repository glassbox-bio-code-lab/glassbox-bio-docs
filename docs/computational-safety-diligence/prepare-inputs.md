---
title: Prepare Inputs
description: How to assemble input packages for core analysis.
sidebar_position: 5
tags:
  - computational-safety-diligence
---

# Prepare Inputs

This page defines the current input contract for the runner and the core analysis workflow.

## Input root layout

Inputs are discovered from:

```text
<input-root>/<project_id>/01_sources/
```

With the published chart defaults, that usually maps to:

```text
/data/input/<project_id>/01_sources/
```

The required entry point is:

```text
<input-root>/<project_id>/01_sources/sources.json
```

## Minimum required files

At minimum, provide:

1. `sources.json`
2. `portfolio_selected.csv`

The `portfolio_selected.csv` file is resolved through `sources.json`, so both must be present and consistent.

## Optional files

Add these when they are available for your project:

- `assays.csv`
- `compounds.csv`
- `targets.csv`
- `structures/*.pdb`

Missing optional files do not necessarily prevent a run, but they can reduce downstream module coverage and interpretation confidence.

## `sources.json` expectations

`sources.json` should reference files located under the same `01_sources/` directory. Typical keys include:

- `portfolio_selected_csv`
- `primary_candidate_id`
- `assays_csv`
- `compounds_csv`
- `targets_csv`
- `pdbs`

The exact key names can vary slightly by pipeline generation path, but the operational rule is stable: the manifest must point to real files under `01_sources/` that the runner can resolve at runtime.

## `portfolio_selected.csv` expectations

The selected portfolio file must include one of the following columns:

- `smiles`
- `canonical_smiles`

Recommended additional columns:

- `candidate_id`
- `compound_id`
- `name`
- Any customer metadata columns you want carried forward into downstream context

If you are using multiple candidates, make sure the row identifiers and `primary_candidate_id` in `sources.json` do not conflict.

## Input provenance expectations

Prepare inputs so a reviewer can answer these questions without guesswork:

- Which files were supplied by the customer
- Which file is the authoritative selection file
- Which structure files belong to which candidate or target
- Which identifiers should be preserved in exported reports

Keeping that mapping clean improves reproducibility and reduces manual support work later in the run.

## Common failure mode

If the runner fails with an error similar to:

```text
Project directory not found: <input-root>/<project_id>
```

the usual causes are:

- `config.projectId` does not match the staged folder name
- Files were copied into the wrong directory level
- The runner does not have read access to the staged path

Quick check:

```bash
ls -la /data/input/<project_id>/01_sources/
```

## Output scoping note

Input lookup is project-scoped, but outputs are run-scoped:

```text
<output-root>/<run_id>/
```

This is expected behavior and prevents collisions when the same project is run multiple times.

## Recommended validation path

If PreFlight UI is part of your workflow, validate the package before submission:

- [Supported Inputs](../preflight-ui/validation-system/supported-inputs.md)
- [Validation Rules](../preflight-ui/validation-system/validation-rules.md)
- [Troubleshooting](../preflight-ui/validation-system/troubleshooting.md)
