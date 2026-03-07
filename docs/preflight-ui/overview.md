---
title: Overview
description: Entry point for the validation and submission-readiness product surface.
sidebar_position: 1
tags:
  - preflight
---

# Overview

PreFlight UI is the customer-boundary workflow surface for validating and packaging inputs before a target diligence run starts.

Its goal is operationally simple:

- Reduce failed runs
- Shorten time to first useful result
- Standardize reproducible inputs
- Hand validated submissions into the core analysis workflow cleanly

## What PreFlight UI produces

PreFlight UI should leave the user with:

- A validated input bundle
- Clear pass, warning, or block status for the current package
- Manifest-ready packaging that can hand off to the core run workflow
- A smaller set of predictable operator failure modes

## What belongs in this section

- Input verification
- Submission readiness
- Error resolution workflow
- Packaging rules and supported inputs
- Handoff to core analysis

## What does not belong here

This section should not carry the burden of post-run report interpretation. Once a submission is accepted and launched, the user should move to the core analysis documentation.

## Product positioning

PreFlight UI is bundled with the core product, but it should be documented as a distinct workflow surface. Users need to understand that it certifies input readiness rather than replacing the downstream analysis engine.
