---
title: Evidence IDs
description: How evidence identifiers and provenance links are structured.
sidebar_position: 4
---

# Evidence IDs

Evidence IDs are the glue that ties rendered findings back to the machine-native artifacts that produced them.

## What the example output shows

The example bundle surfaces evidence IDs in several places:

- raw module outputs often include module-scoped evidence ID fields
- fast-fail risk signals include `evidence_id`
- the wet-lab readiness machine artifact includes an `artifact.evidence_id`
- paths inside failure-mode evidence records can point back into orchestrator outputs

Example IDs use the `EID-...` pattern and appear alongside specific risk or artifact records rather than only in one central index.

## Why evidence IDs matter

An evidence ID should let a reviewer answer:

- which module produced this signal
- which artifact should be opened next
- whether the claim is traceable to emitted machine output

Without evidence IDs, narrative findings become much harder to audit.

## How evidence travels

In the current output model, evidence can move through several layers:

1. raw module artifact
2. combined or orchestrated result
3. fast-fail or failure-mode render layer
4. report narrative or recommendation layer

Evidence IDs make those hops inspectable.

## Recommended documentation rule

Whenever a result page surfaces a specific finding, document:

- the artifact where the signal originates
- the evidence ID, if emitted
- the field path used in render or aggregation layers

That keeps the report linked to the machine-native record.
