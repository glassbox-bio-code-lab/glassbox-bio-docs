---
title: Overview
description: How module families are organized inside the core analysis product.
sidebar_position: 1
---

# Modules Overview

The raw output bundle makes the module layer explicit. Each module is not just a score source. It is an evidentiary producer with its own status, result payload, metadata, and provenance hooks.

## What the example bundle shows

The example `raw/` directory contains module-native artifacts such as:

- `admet_predictions_raw.json`
- `clinical_precedent_prior_raw.json`
- `pbpk_sensitivity_raw.json`
- `toxicity_profile_raw.json`
- `sar_explorer_raw.json`
- `target_biology_risk_raw.json`

Most follow a family shape built around:

- `module_id`
- `generated_at`
- `status`
- `reason`
- `result`
- `metadata`
- provenance and evidence-link fields

## How module status should be read

A module can be:

- executed successfully and evidentiary
- planned but skipped because of missing input
- out of scope by category policy
- partial or failed

That status should always be read together with the module plan and evidence-state machine.

## Required template for every module page

- Purpose
- When it runs
- Required inputs
- Outputs
- Interpretation guidance
- Limitations
- Caveats
