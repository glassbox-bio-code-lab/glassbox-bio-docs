---
title: Overview
description: Conceptual foundations for how core analysis works and should be interpreted.
sidebar_position: 1
---

# Concepts Overview

This subsection explains the meaning of the pipeline outputs and the conceptual contracts they encode.

## Core concepts surfaced by the example bundle

The example output bundle makes several concepts explicit rather than leaving them implicit in prose:

- category resolution
- context of use
- claim acceptance
- evidence state
- failure mode ontology
- risk channels
- tier compliance
- reproducibility and pre-seal provenance

These are not extra commentary layers. They are emitted machine artifacts that shape how a run should be interpreted.

## Why concepts matter

Without these concepts, a user can easily misread a successful execution as a fully supported claim. The example bundle shows why that is unsafe:

- the run can succeed technically
- some modules can still be skipped because of missing input
- evidence status can still be `UNRESOLVED`
- claim strength can still be demoted to `HYPOTHESIS`

## Keep concepts separate from how-to guides

A user reading concept docs should come away with better interpretation, not a setup walkthrough.

Use the workflow pages for execution guidance and these pages for meaning.
