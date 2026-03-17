---
title: Overview
description: How the PreFlight validation engine is organized and applied.
sidebar_position: 1
tags:
  - preflight
---

# Validation System Overview

The validation system is the decision engine behind Glassbox Preflight Certifier. It inspects a staged submission, classifies its problems, and determines whether the package is ready for analysis.

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

Instead of letting packaging mistakes fail deep in the runtime path, PreFlight Certifier catches them early and turns them into actionable corrections.

## Validation outputs

The validation system produces:

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

## What validation covers

The validation system confirms that the input package is structurally ready for analysis. It does not evaluate scientific correctness or interpret analysis results. After a package is accepted, continue with the run configuration and results documentation.
