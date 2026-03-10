---
title: Supported Inputs
description: What input types and formats the validator understands.
sidebar_position: 3
tags:
  - preflight
---

# Supported Inputs

This page documents the current file and directory structures that PreFlight UI should accept and validate before handoff to core analysis.

## Supported root structure

PreFlight UI should validate the same runner contract used by the deployed pipeline:

```text
<input-root>/<project_id>/01_sources/
```

The required file at that location is:

```text
<input-root>/<project_id>/01_sources/sources.json
```

## Required inputs

The minimum valid package contains:

1. `sources.json`
2. `portfolio_selected.csv`

The selection file must be resolvable through `sources.json`.

## Optional supported inputs

PreFlight UI should recognize, validate, and classify these as optional rather than required:

- `assays.csv`
- `compounds.csv`
- `targets.csv`
- `structures/*.pdb`

Optional inputs can unlock additional downstream analysis depth, but their absence should not be treated as an automatic submission failure unless a selected workflow explicitly depends on them.

## Inputs that affect category resolution

PreFlight UI should also explain when a package changes category rather than simply becoming richer.

The current policy source in `CATEGORIES.txt` means the validator should treat these as category-driving signals:

- presence or absence of receptor structure
- presence or absence of labeled assay data
- admissibility state for physics-audit-eligible paths

The validator does not need to promise the final runtime category on its own, but it should surface the likely category implications of the staged package and link users to [Category Policy and Routing](../../computational-safety-diligence/category-policy-and-routing.md).

## Supported file expectations

### `sources.json`

The manifest should point only to files that exist under `01_sources/`. Common keys include:

- `portfolio_selected_csv`
- `primary_candidate_id`
- `assays_csv`
- `compounds_csv`
- `targets_csv`
- `pdbs`

### `portfolio_selected.csv`

The selected portfolio file must include one of:

- `smiles`
- `canonical_smiles`

Recommended identifiers and metadata:

- `candidate_id`
- `compound_id`
- `name`
- Customer metadata columns that should flow into analysis context

### Structure files

When structure files are included, they should be staged as `.pdb` files under a structure directory referenced by the manifest.

## What PreFlight should check exactly

At a minimum, the validator should confirm:

- The `<project_id>` folder exists
- The `01_sources` directory exists
- `sources.json` exists and is parseable
- `portfolio_selected.csv` resolves from the manifest
- The portfolio file contains at least one supported structure column for molecules
- Referenced optional files exist when listed in the manifest

## Known limitations

- The validator can confirm structural readiness, but it does not guarantee scientific sufficiency for every module family.
- Missing optional files may be acceptable for ingestion but can still reduce module coverage later.
- Support for formats other than the current CSV and PDB-centric contract should be documented explicitly before being presented as supported.

For the analysis-side interpretation of these constraints, see [Prepare Inputs](../../computational-safety-diligence/prepare-inputs.md).
