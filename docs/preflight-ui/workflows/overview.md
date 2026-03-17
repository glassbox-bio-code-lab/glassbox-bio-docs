---
title: Overview
description: User workflows inside PreFlight UI from draft submission to handoff.
sidebar_position: 1
tags:
  - preflight
---

# Workflows Overview

PreFlight workflows move users from raw inputs to a validated, manifest-ready bundle with as little ambiguity as possible.

## Workflow sequence

The standard PreFlight path is:

1. Create a submission
2. Validate the input package
3. Resolve blockers and warnings
4. Hand the certified bundle off to analysis

This sequence keeps packaging, certification, and execution separate, which is exactly what reduces failed runs.

## Workflow outcomes

At the end of the PreFlight workflow, you should have:

- a validated input bundle
- explicit status for the package
- clear visibility into warnings versus blockers
- a manifest-ready package that can be deployed into the run environment

## Core workflow pages

- [Create a Submission](./create-a-submission.md)
- [Validate Inputs](./validate-inputs.md)
- [Resolve Validation Errors](./resolve-validation-errors.md)
- [Hand Off to Analysis](./hand-off-to-analysis.md)

## Relationship to the validation system

Workflows explain what the user does. The validation system pages explain how the certifier decides whether the package is ready, warning-level, or blocked.

For that engine view, see [Validation System Overview](../validation-system/overview.md).
