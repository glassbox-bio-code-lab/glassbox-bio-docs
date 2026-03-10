---
title: Eligibility and Readiness Checks
description: How the system distinguishes acceptable from analysis-ready input packages.
sidebar_position: 4
tags:
  - preflight
---

# Eligibility and Readiness Checks

Eligibility and readiness are related but different checks. PreFlight Certifier should keep them separate so users understand whether a package can run at all versus whether it is strong enough to produce the analysis they expect.

## Eligibility

Eligibility answers a narrow question:

Can this package be ingested safely by the current runner contract?

A package is eligible when the basic structural requirements are met, such as:

- the project-scoped directory exists
- `01_sources/` exists
- `sources.json` exists and parses
- the selection file resolves correctly
- required columns are present
- referenced files exist where the manifest says they do

An ineligible package should be blocked from handoff.

## Readiness

Readiness answers the more useful operational question:

If this package runs, is it likely to produce the level of coverage and evidence the user expects?

Readiness depends on factors such as:

- presence of optional supporting files
- clarity of identifiers and provenance
- consistency between package contents and intended category
- strength of supporting context for the intended analysis route

A package can be eligible but not fully ready.

## Examples

### Eligible but not fully ready

A package with `sources.json` and a valid portfolio file but no structure files may still be eligible. It should not, however, be presented as ready for a structure-backed route without warning.

### Eligible and ready

A package with clean manifest references, stable identifiers, appropriate optional files, and category-consistent evidence should be presented as ready for handoff.

### Ineligible

A package with missing required files, malformed manifest content, or unresolved file references should be blocked.

## How this should appear in the UI

The UI should make all three states obvious:

- `Blocked` for ineligible packages
- `Warning` for eligible-but-not-fully-ready packages
- `Ready` for packages that satisfy both the runner contract and the intended workflow expectations

## Category-sensitive readiness

Readiness must reflect category policy, not just file presence.

Examples:

- no structure files means a structure-backed route is not ready
- no labeled assay data means an assay-driven route is not ready
- physics-audit eligibility must reflect admissibility constraints rather than simple operator preference

For the routing model behind those checks, see [Category Policy and Routing](../../computational-safety-diligence/category-policy-and-routing.md).
