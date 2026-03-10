---
title: Validate Inputs
description: How users run validation checks and interpret initial results.
sidebar_position: 3
tags:
  - preflight
---

# Validate Inputs

Validation in PreFlight UI should happen before the user commits to a compute run.

## What is validated

The validator should check the same operational contract the runner depends on:

- The project directory exists
- `01_sources/` exists under that project
- `sources.json` exists and can be parsed
- The referenced portfolio file exists
- The portfolio file contains the required molecular structure column
- Referenced optional files exist when declared

Validation should also surface category implications. A package that lacks structure files or assay data may still be valid, but it should not be presented as if it supports the same module route as a structure-backed or assay-aware submission. See [Category Policy and Routing](../../computational-safety-diligence/category-policy-and-routing.md).

## Validation timing

Run validation:

- When a submission is first created
- After any file or manifest change
- Before the UI allows handoff to the analysis workflow

## How to interpret outcomes

### Ready

The package satisfies the current runner contract and can proceed to handoff.

### Warning

The package is structurally ingestible but likely incomplete for some downstream analyses. The UI should show exactly what is missing and how that affects expected coverage.

### Blocked

The package cannot be handed off safely. Missing required files, malformed manifest structure, or unresolved references should stop the workflow here rather than consuming cluster time.

## Manual operator cross-check

If you are validating a staged PVC or mounted filesystem path, the simplest confirmation is still:

```bash
ls -la /data/input/<project_id>/01_sources/
```

Use this when the UI and the underlying storage state appear to disagree.
