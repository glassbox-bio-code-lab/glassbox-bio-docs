---
title: Module Index
description: Index of module families and their role in the analysis stack.
sidebar_position: 2
tags:
  - computational-safety-diligence
---

# Module Index

The core analysis workflow is composed of internal module families that are selected based on project category, available evidence, and execution profile.

## Distinction to preserve

Modules are internal core-analysis subsystems. They are not the same as customer-facing add-ons.

## Common module families

The current category policy references families spanning:

- Molecular logic and target biology risk
- Clinical precedent
- Chemistry and ADMET prediction
- Toxicity and CYP assessment
- Manufacturability and synthesis audit
- PBPK and uncertainty quantification
- Structure, docking, dynamics, and physics audit paths
- Wet-lab readiness determination

## Category-driven behavior

Module availability is not uniform across every project type. Some modules are:

- Required for a given category
- Optional when supporting evidence exists
- Exploratory for limited use cases
- Disabled because the current evidence profile does not justify them

That category-driven policy is part of how the system avoids overclaiming or running unsupported analyses from thin evidence.

## Practical reading rule

When reviewing a completed run, ask:

1. Which category was the run framed under
2. Which modules were expected for that category
3. Which modules were not eligible or intentionally skipped

That context is necessary to interpret both coverage and missingness correctly.
