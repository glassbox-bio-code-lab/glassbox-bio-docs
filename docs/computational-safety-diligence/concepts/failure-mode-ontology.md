---
title: Failure-Mode Ontology
description: The taxonomy of failure signals tracked by the core analysis product.
sidebar_position: 3
---

# Failure-Mode Ontology

The failure-mode ontology is the artifact that translates module outputs into named, ranked, and actionable risk modes.

## Source artifact

In the example bundle, the ontology is emitted as:

```text
results/failure_mode_ontology_output_v1.json
```

## What it contains

The sample file exposes several layers:

- `global` plan and execution context
- `modes` as the full list of emitted failure-mode objects
- `program_classification` for primary and secondary risks
- `tri_projection` for the ontology-linked TRI view
- `render_contract` for deterministic rendering expectations

## Per-mode structure

Each mode record in the sample output contains:

- a stable `mode_id`
- domain and label
- severity and confidence
- matched signatures
- reasons
- actions
- notes for review and prioritization
- narrative-ready fields

This is why the ontology should be treated as more than a label list. It is an explanation and action structure.

## Program-level rollup

The ontology also emits a program-level classification with:

- primary failure modes
- secondary risks
- salvageability framing

That rollup is useful for summarization, but the underlying mode list remains the more detailed record.

## Relationship to TRI

The ontology output includes a `tri_projection` block. That means the failure-mode layer is not separate from the risk index. It is part of the reasoning substrate behind the rendered TRI narrative.
