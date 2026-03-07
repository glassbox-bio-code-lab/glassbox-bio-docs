---
title: Create a Submission
description: How a user starts and structures a new submission in PreFlight UI.
sidebar_position: 2
tags:
  - preflight
---

# Create a Submission

Creating a submission in PreFlight UI should mirror the real operator path from staged inputs to a launch-ready bundle.

## Minimum information needed

A usable submission should define:

- The target project or run context
- The input package located under the expected project-scoped path
- The core manifest file `sources.json`
- The selected portfolio file referenced by that manifest
- Any optional supporting files that the workflow should validate and carry forward

## Recommended setup sequence

1. Confirm cluster and tool access if the workflow will hand off directly to Kubernetes execution
2. Stage the input package under the expected project directory
3. Create the submission and point it at the staged `01_sources/` payload
4. Let the validator inspect the manifest, required files, and key column structure
5. Save the draft state until the submission is either ready or explicitly blocked

## Draft-state expectations

Draft submissions should be allowed when the package is incomplete, but the UI should make the incomplete state obvious. A draft is useful for iterative setup. It should not be easy to mistake a draft for a validated run bundle.

## Inputs to collect up front

At minimum, the UI should surface:

- Project identifier
- Manifest location
- Selection file reference
- Whether optional files such as assays, targets, compounds, or structure files are present

For the exact file contract, see [Supported Inputs](../validation-system/supported-inputs.md).
