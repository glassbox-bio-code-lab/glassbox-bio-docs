---
title: TRI and Risk Signals
description: How to read the Translational Risk Index and related risk indicators.
sidebar_position: 4
---

# TRI and Risk Signals

CB-TRI is the top-line computational risk index in the report package. It is designed to summarize risk signals while keeping the underlying components inspectable.

## What CB-TRI summarizes

CB-TRI should be read as an aggregate view over the current computational evidence scope. The score is intended to surface overall risk magnitude under the executed workflow, not to hide the underlying evidence channels.

![CB-TRI example](../../report_images/cbtri_report.png)

_A rendered CB-TRI panel is the top-line synthesis view, not the whole argument._

## Risk channels

The current framing separates risk into channels such as:

- Biology
- Chemistry
- Safety
- Manufacturability
- Clinical precedent

Those channels are part of the explanation layer for the score and should remain visible to the user.

The biology-risk sections in the report are one example of how a channel should remain inspectable:

![Target biology risk summary example](../../report_images/target_biology_risk_summary.png)

## What CB-TRI does not do

Do not present CB-TRI as:

- A deterministic go or no-go decision
- A replacement for wet-lab policy
- A proof of biological efficacy
- A substitute for reviewing evidentiary gaps and coverage limitations

The user still owns the investment or execution policy applied to the score.

## How to interpret missing evidence

Coverage and confidence context should remain separate from the risk score itself. If evidence is missing, ineligible, or weak, that should be shown explicitly rather than hidden inside a single composite number.

Projected failure-mode panels help make that distinction visible by showing what is risky because of evidence content versus what is risky because of evidence absence:

![Projected failure modes example](../../report_images/projected_failure_modes.png)

## Recommended reading order

1. Read the top-line CB-TRI value
2. Review the underlying risk channels
3. Check coverage, missingness, and applicability context
4. Read the evidence-linked findings before making a decision
