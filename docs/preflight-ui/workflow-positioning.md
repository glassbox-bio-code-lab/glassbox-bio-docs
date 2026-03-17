---
title: Workflow Positioning
description: Where PreFlight UI sits in the overall user journey.
sidebar_position: 2
---

# Workflow Positioning

Glassbox Preflight Certifier sits between raw preparation work and the core target-diligence run.

PreFlight UI sits between preparation and analysis:

Prepare → **PreFlight UI** → Submit → Analyze → Review → Decide

## What PreFlight is for

PreFlight checks inputs before compute starts.

It is designed to:

- validate format and schema before launch
- reduce failed runs caused by packaging mistakes
- shorten time to first result
- standardize reproducible input bundles
- generate manifest-ready packaging for Glassbox Target Diligence Core

## What happens before PreFlight

Before a submission reaches PreFlight, the user is still assembling the source materials:

- target identifiers and context
- selection files and manifest data
- optional assays, compounds, targets, and structures
- evidence framing and supporting references

At that stage, the package may still be incomplete, ambiguous, or inconsistent.

## What happens inside PreFlight

PreFlight turns a loose package into a launch-ready bundle by:

- checking required files and field structure
- surfacing warnings and blockers
- distinguishing ingestible from analysis-ready packages
- preserving the category implications of the staged inputs
- preparing a validated bundle that can hand off cleanly to the runtime environment

## What happens after PreFlight

Once a package is certified or accepted with understood warnings, the user moves from packaging into execution:

- the validated bundle is staged at the expected path
- the run is launched into the customer environment
- the core pipeline resolves category and module plan
- outputs are written as run-scoped artifacts for interpretation and verification

PreFlight improves run reliability, but result interpretation still happens in the analysis workflow.
