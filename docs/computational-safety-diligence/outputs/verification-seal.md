---
title: Verification Seal
description: How the seal works and what claims it supports.
sidebar_position: 8
tags:
  - computational-safety-diligence
---

# Verification Seal

The verification seal is the public-facing integrity artifact for a completed run. It should be described narrowly and precisely.

## What the seal attests to

The seal supports claims about run provenance and integrity, including:

- A specific run completed
- The run has a stable `run_id`
- The seal bundle is linked to the recorded run metadata
- The signed artifact can be verified after export

In practice, the seal is emitted at run completion along with `seal.json`, `seal.sig`, and `seal.svg`.

In the fuller GBX X2 framing, the seal is a machine-verifiable integrity indicator for decision-grade audit packets. It binds inputs, manifest, outputs, and a unique seal identifier into a signed provenance payload.

## Pre-seal versus final seal

The example output bundle currently stops at the pre-seal stage:

- `seal/preseal.json`
- `summary.seal_status = pending_online_verification`
- `summary.seal_reason = run_complete_unreachable`

That is an important operational distinction. A run can finish and still be waiting for the final online verification step that produces the public-facing seal bundle.

## What the seal does not attest to

Do not describe the seal as proof that:

- The scientific conclusion is correct
- The inputs were sufficient for every possible analysis
- A container image cannot be pulled again by a party that already has registry access
- A rerun right has not already been consumed elsewhere

The seal is a provenance and integrity artifact, not a blanket guarantee of scientific validity or distribution control.

## Verification workflow

There are two supported verification patterns:

1. Upload `seal/seal.svg` to the verification UI
2. Verify through the seal verification API flow

The user-facing portal referenced by the current customer runbook is:

```text
https://glassbox-bio.com/verify
```

Offline verification is also supported with the included public key and the contents of the `seal/` folder. That offline path is important for auditors, boards, and counterparties that do not want to rely exclusively on a live vendor endpoint.

## Verification states on reports

When a seal is shown in a report or packet, describe its state explicitly:

- `VERIFIED` means the signature is valid and the dual-channel checks reconcile
- `UNVERIFIED` means the seal is present but not yet checked in the current viewer context
- `INVALID` means a mismatch or signature failure was detected
- `PENDING` or `PARTIAL` means the run lineage is not fully reconciled and should never be treated as verified

Only `VERIFIED` packets should be forwarded as decision-grade artifacts.

## Rerun linkage

The current entitlement model supports a one-time rerun redemption path tied to a previously issued seal:

1. The caller uploads `seal.svg`
2. The service verifies the signature and extracts the `seal_id`
3. The service grants one bonus run only once per `(principal, seal_id)` pair
4. A duplicate redemption returns `409`

This creates replay resistance for the rerun entitlement flow without overstating what the seal itself controls.

## Recommended usage guidance

Use the seal when you need to:

- Demonstrate that a run package can be independently verified
- Support audit and review workflows
- Redeem the one-time rerun flow where that policy is enabled

Do not use the seal as a substitute for full report review, entitlement administration, or legal/compliance approval.

For the API and trust model details, see [Cryptographic Provenance](../../trust-and-security/cryptographic-provenance.md) and [API Overview](../../reference/api-overview.md).
