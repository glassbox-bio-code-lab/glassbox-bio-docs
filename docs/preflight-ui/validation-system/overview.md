---
title: Overview
description: How the PreFlight validation engine is organized and applied.
sidebar_position: 1
tags:
  - preflight
---

# Validation System Overview

The validation system is the decision engine behind Glassbox Preflight Certifier. It inspects a staged submission, classifies its problems, and determines whether the package is ready to hand off to core analysis.

## What the validation system does

The validation layer is responsible for:

- checking the required file and directory contract
- validating manifest structure and resolvable references
- checking key field and column requirements
- distinguishing blockers from warnings
- surfacing category implications of the staged package
- producing a clean, manifest-ready bundle when the package is acceptable

## Why it exists

The system exists to reduce failed runs and standardize reproducible inputs before compute starts.

Instead of letting packaging mistakes fail deep in the runtime path, PreFlight Certifier catches them at the customer boundary and turns them into actionable corrections.

## Validation outputs

The validation system should produce:

- a package status of ready, warning, or blocked
- machine-stable rule identifiers
- file- or field-specific explanations
- clear fix recommendations
- a validated bundle suitable for one-click deployment into the customer environment

## Main validation pages

- [Validation Rules](./validation-rules.md)
- [Supported Inputs](./supported-inputs.md)
- [Eligibility and Readiness Checks](./eligibility-and-readiness-checks.md)
- [Troubleshooting](./troubleshooting.md)

## Boundary of responsibility

The validation system certifies input readiness. It does not certify scientific truth, replace module planning, or interpret final outputs. Once the bundle is accepted, responsibility shifts to the core analysis workflow.
