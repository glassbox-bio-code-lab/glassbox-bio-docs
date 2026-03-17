---
title: Create a Submission
description: How a user starts and structures a new submission in PreFlight UI.
sidebar_position: 2
tags:
  - preflight
---

# Create a Submission

Use this page to create a submission from staged inputs and turn it into a launch-ready bundle.

## Minimum information needed

A usable submission defines:

- The target project or run context
- The input package located under the expected project-scoped path
- The core manifest file `sources.json`
- The selected portfolio file referenced by that manifest
- Any optional supporting files that the workflow validates and carries forward

## Recommended setup sequence

1. Confirm cluster and tool access if the workflow will hand off directly to Kubernetes execution
2. Stage the input package under the expected project directory
3. Create the submission and point it at the staged `01_sources/` payload
4. Let the validator inspect the manifest, required files, and key column structure
5. Save the draft state until the submission is either ready or explicitly blocked

## Draft-state expectations

Draft submissions are useful when the package is incomplete, but the UI should make that state obvious. A draft should not be easy to mistake for a validated run bundle.

## Recommended submission modes

The intake flow can support two equally valid UX patterns:

- a guided wizard for first-time or less technical users
- a direct form view for operators who already know the contract

Both modes should collect the same core information and end in the same validation path.

## Inputs to collect up front

At minimum, the UI should show:

- Project identifier
- Manifest location
- Selection file reference
- Whether optional files such as assays, targets, compounds, or structure files are present

For higher-level intake workflows, also capture:

- indication
- context of use
- positive supporting evidence
- negative or risk evidence
- target metadata such as symbol, UniProt ID, modality, and mechanism of action

If the workflow supports structured intake beyond the file picker, also collect:

- whether the request is single-target or explicitly approved as multi-target
- known liabilities or historical failure modes
- specific questions the user wants the diligence run to answer
- any submission notes that should survive into the packaged bundle

## Authenticated versus unauthenticated submissions

If the product supports signed-in users, a successful submission can create a trackable job record after intake. If the user is not signed in, the system can still allow submission or draft creation, but it should make clear which tracking and follow-up features are unavailable.

For the exact file contract, see [Supported Inputs](../validation-system/supported-inputs.md).
