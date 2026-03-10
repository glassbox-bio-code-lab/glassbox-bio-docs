---
title: Hand Off to Analysis
description: What happens when a validated submission moves into core analysis.
sidebar_position: 5
tags:
  - preflight
---

# Hand Off to Analysis

The handoff boundary is where a validated input package stops being a draft submission and becomes a concrete execution request.

## What should carry forward

At handoff time, the following should already be stable:

- Project identifier
- Input package structure
- Resolved manifest and file references
- Validation status and any non-blocking warnings
- Packaging metadata needed by the deployment path

## What should not change silently

Do not allow the following to drift silently between validation and execution:

- `config.projectId`
- Referenced file paths
- Selected portfolio file
- Optional file presence used to determine workflow readiness
- Category-driving inputs such as structure files, assay tables, or admissibility-sensitive fields

If these change, the package should be revalidated rather than passed straight through.

## Operator-facing handoff path

In the CLI-oriented deployment flow, the handoff normally looks like this:

1. Stage the validated `01_sources/` package
2. Install the infrastructure layer with the job disabled
3. Confirm the package is present at the mounted input path
4. Enable the job and start the run

That sequence keeps validation and execution separate while still preserving a smooth operator workflow.

Before execution starts, the operator should still confirm that the staged package matches the intended routing category in [Category Policy and Routing](../../computational-safety-diligence/category-policy-and-routing.md).

## Next step after handoff

Once the bundle is accepted for execution, the user should switch to the core analysis docs:

- [Create and Configure a Run](../../computational-safety-diligence/create-and-configure-a-run.md)
- [Interpret Results](../../computational-safety-diligence/interpret-results.md)
