---
title: Fast-Fail Summary
description: How to interpret the fastest no-go or escalation signals.
sidebar_position: 3
---

# Fast-Fail Summary

The fast-fail summary is the shortest path from a completed run to a disciplined stop, escalate, or next-check decision.

## Source artifacts

The example bundle emits the fast-fail view as both:

- `results/phase_5_fastfail_summary.json`
- `results/phase_5_fastfail_summary.html`

## What it contains

The JSON artifact includes fields for:

- aggregate risk band
- evidence status
- confidence
- category ID
- TRI display
- risk signals
- priority findings
- missing proofs
- unresolved evidence
- out-of-scope modules
- tier compliance
- claim coverage
- next checks
- evidence references

This makes it more than a banner. It is a compact decision packet.

## How to use it

Read the fast-fail summary when you need to answer:

- Is there a clear blocker or escalation signal
- Which missing proofs matter most
- Which modules were intentionally out of scope
- Which next checks would most improve defensibility

## Example interpretation from the sample run

The sample run shows:

- aggregate risk band: `ELEVATED`
- evidence status: `UNRESOLVED`
- confidence: `Low`
- category: `SMALL_MOLECULE__HAS_LABELED_ASSAYS`

That combination means the run is informative, but not fully claim-ready.

## What to do next

Use the fast-fail summary as the first interpretation layer, then move to:

- `context_of_use.json`
- `tier_compliance`
- `evidence_state_machine.json`

when you need to understand whether the unresolved state is a policy problem, an evidence gap, or a coverage limitation.
