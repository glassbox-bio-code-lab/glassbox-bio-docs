---
title: Troubleshooting
description: Common PreFlight issues and how to resolve them.
sidebar_position: 5
tags:
  - preflight
---

# Troubleshooting

Use this page to help users correct packaging and handoff problems before they consume a run.

## Missing project directory

If the runner or validator reports an error similar to:

```text
Project directory not found: <input-root>/<project_id>
```

check the following first:

- `config.projectId` matches the staged folder name exactly
- The files were copied into `<input-root>/<project_id>/01_sources/`
- The files were not copied one level too high or too low

Quick check:

```bash
ls -la /data/input/<project_id>/01_sources/
```

## Missing required files

The minimum valid package needs:

- `sources.json`
- `portfolio_selected.csv`

If either file is missing, or if `sources.json` points to a missing file, treat the package as blocked until the file set is repaired.

## Invalid portfolio file

If `portfolio_selected.csv` is present but the package still fails validation, inspect the header row. One of these columns must exist:

- `smiles`
- `canonical_smiles`

If neither is present, the validator should block the submission because the current runner contract will not be able to resolve the molecular input correctly.

## Optional files are missing

Missing optional files such as `assays.csv`, `compounds.csv`, `targets.csv`, or structure files do not always require a hard stop. The safer behavior is:

- Show a warning
- Explain which downstream analyses may have reduced coverage
- Let the user decide whether the run is still useful

If the missing file changes category routing, say that explicitly. For example, a missing structure file is not just "less detail" when the user expects a structure-backed category. See [Category Policy and Routing](../../computational-safety-diligence/category-policy-and-routing.md).

## Handoff succeeds but runtime later fails

If the package validated in PreFlight UI but the job still fails later, compare the staged inputs with the effective runtime settings:

- `config.projectId`
- `config.runMode`
- Storage mount path or bucket path
- File permissions on the staged directory

This is usually a deployment mismatch rather than a schema mismatch.

It can also be a category mismatch. `config.runMode` may be correct while the staged package still resolves into a different scientific route than the user expected.

## Permission issues on staged PVC data

If helper pods or the runner cannot read the staged files on a PVC, fix the directory permissions before rerunning:

```bash
kubectl -n "${NAMESPACE}" exec gbx-input-writer -- \
  /bin/sh -lc "chmod -R a+rwX /data/input/${PROJECT_ID} || true"
```

## When to escalate

Escalate the submission for operator review when:

- The package structure is correct but the manifest semantics are unclear
- Multiple candidate identifiers conflict
- Referenced structure files cannot be tied confidently to the selected portfolio
- The user is unsure whether a missing optional file is acceptable for the chosen workflow

For the canonical contract, see [Supported Inputs](./supported-inputs.md) and [Prepare Inputs](../../computational-safety-diligence/prepare-inputs.md).
