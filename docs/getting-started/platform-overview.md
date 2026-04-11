---
title: Platform Overview
description: High-level map of Computational Safety Diligence, PreFlight UI, and Modules.
sidebar_position: 2
---

# Platform Overview

Glassbox Bio is risk verification infrastructure for AI-designed biology. The platform is designed to turn model output and staged inputs into a deterministic, evidence-linked, cryptographically sealed risk artifact that can be reviewed by both humans and software.

## What the platform does

At a high level, the platform helps teams move from raw model output to an auditable risk record with:

- Evidence-linked computational risk ratings
- Channel-level signal decomposition
- Deterministic run manifests and provenance records
- Tamper-evident sealing and offline verification support
- Machine-readable outputs for replay, validation, and system integration

The human-readable report is generated from a deeper machine-readable artifact. That design supports verification, replay, and audit workflows rather than only a PDF-style summary.

## Main workflows

The documentation is organized around three main workflows:

- **Computational Safety Diligence** for the core analysis workflow, outputs, module coverage, and report interpretation
- **PreFlight UI** for packaging, validating, and certifying inputs before a run starts
- **Modules** for optional workflow extensions such as IP and freedom-to-operate analysis

## Verification architecture

The platform separates the verification stack into four layers:

1. Raw computational evidence from individual models and scientific modules
2. Evidence normalization into a stable schema
3. Risk synthesis, including CB-TRI, channel scores, failure modes, coverage, and confidence context
4. Human-readable reporting and verification views generated from the sealed artifact

This separation helps the platform act as verification infrastructure rather than only a report generator.

## What the core audit is and is not

### What it is

- A risk verification layer between AI output and experimental spend
- A reproducible computational audit for tractability, plausibility, and failure-mode signals
- An evidence artifact that shows whether computational evidence remains coherent under controlled assumptions

### What it is not

- A binding affinity predictor
- A free-energy claim
- A biological, translational, or clinical efficacy statement
- A substitute for the user's wet-lab policy, capital allocation policy, or governance decision

A successful run means the computation executed correctly and produced a verifiable artifact. It does not mean the science is guaranteed to be correct.

## Core outputs

The primary output is a machine-verifiable risk artifact that can contain:

- Normalized evidence
- Channel scores
- Evidence IDs
- Execution traces
- Provenance records
- Threshold and confidence context
- Integrity metadata

The report package renders that artifact for a human reader, but the artifact itself remains the canonical record for verification and replay.

## Key ideas to keep separate

- **Risk computation** is performed by Glassbox Bio and produces the artifact, channel signals, manifests, and seal bundle.
- **Decision policy** stays with the customer and determines how those outputs are used for investment, wet-lab execution, or escalation.

## PreFlight UI in context

PreFlight UI validates and packages inputs before they enter the core run workflow. Its job is to reduce failed runs, shorten time to first useful result, and standardize reproducible inputs before execution starts.

## Where to go next

- Start with [Quickstart](./quickstart.md) if you need the fastest route to a first run.
- Use [PreFlight UI](../preflight-ui/overview.md) if you need input validation and packaging guidance.
- Use [Computational Safety Diligence](../computational-safety-diligence/overview.md) if you are ready to work through the core analysis workflow.
