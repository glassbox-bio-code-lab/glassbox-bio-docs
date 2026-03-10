---
title: Resolve Validation Errors
description: How to fix blockers and warnings before submission.
sidebar_position: 4
tags:
  - preflight
---

# Resolve Validation Errors

Resolving validation errors is the main value of PreFlight Certifier. The point is not only to say "no," but to show the fastest path from invalid inputs to a clean, reproducible run bundle.

## Work errors in this order

Use this repair sequence:

1. Fix all `Blocked` issues first
2. Re-run validation
3. Review all `Warning` issues
4. Decide whether the package is still useful for the intended workflow
5. Revalidate before handoff

## Common blocker classes

Typical blockers include:

- missing `sources.json`
- missing or unresolved `portfolio_selected.csv`
- wrong project directory layout
- malformed manifest content
- missing required molecular structure column
- file references that do not exist under `01_sources/`

These should always be fixed before launch because they map directly to runtime failure conditions.

## Common warning classes

Typical warnings include:

- missing optional assays, compounds, targets, or structures
- missing recommended identifiers
- extra unreferenced files
- weak provenance or unclear file-to-claim mapping
- category mismatch signals, such as expecting a structure-backed route without structure files

Warnings do not automatically block submission, but they should change user expectations about downstream coverage and claim strength.

## Fix paths by problem type

### Packaging problems

If the package layout is wrong:

- verify the `<project_id>/01_sources/` directory exists
- confirm `config.projectId` matches the staged folder name
- make sure the manifest points only to files inside the staged source directory

### File-reference problems

If the manifest points to files that are not present:

- correct the file path in `sources.json`
- move the missing file into the staged package
- remove the reference if the file is no longer intended to be part of the run

### Schema and column problems

If the portfolio file is structurally invalid:

- add either `smiles` or `canonical_smiles`
- restore stable identifiers such as `candidate_id` when possible
- make sure the selected file is the same one the manifest references

### Category-readiness problems

If the package is technically valid but scientifically thin for the intended route:

- add structure files for structure-backed paths
- add labeled assay data for assay-aware paths
- review admissibility constraints before treating the package as physics-audit eligible

For the routing rules behind those warnings, see [Category Policy and Routing](../../computational-safety-diligence/category-policy-and-routing.md).

## Operator rule

Do not hand off a package just because it is no longer blocked. Hand it off only when the remaining warnings are understood and acceptable for the intended run outcome.
