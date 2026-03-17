---
title: Evidence-Linked Outputs
description: How findings connect back to source evidence and provenance.
sidebar_position: 6
---

# Evidence-Linked Outputs

Every important claim in the report package should be traceable back to emitted machine artifacts.

## Where evidence linkage appears in the example bundle

The sample outputs show evidence linkage in four main places:

1. raw module outputs under `raw/`
2. evidence IDs embedded in module or render artifacts
3. `results/evidence_state_machine.json`
4. `evidence_refs` inside the fast-fail summary

## Raw-output linkage

Most raw module JSON artifacts follow a stable pattern that includes:

- `module_id`
- `status`
- `result`
- `metadata`
- `_inputs`
- `_run`
- `_certificate`
- `_artifact`
- module-scoped evidence ID fields

That structure makes it possible to trace a rendered signal back to both the module and the specific machine artifact.

## Render-layer linkage

The fast-fail summary and failure-mode ontology show how evidence is lifted into decision-facing views:

- risk signals carry `evidence_id`
- ontology reasons include evidence paths and values
- wet-lab readiness artifacts carry a content hash and artifact evidence ID

This is the key design rule: the render layer should summarize, not sever provenance.

## How to verify a claim

To verify a claim:

1. find the report-level statement or risk signal
2. capture the `evidence_id` or source path
3. open the corresponding raw module or combined output artifact
4. confirm that the machine record actually supports the rendered statement

## Supported versus inferred statements

The example bundle also shows that not all statements are equally supported. `claim_acceptance` and evidence-state artifacts must be consulted before treating a rendered statement as a strong claim. Some outputs remain intentionally demoted to hypothesis when required evidence is missing.
