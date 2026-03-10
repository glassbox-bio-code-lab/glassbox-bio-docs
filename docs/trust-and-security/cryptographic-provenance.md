---
title: Cryptographic Provenance
description: How provenance and integrity are established and checked.
sidebar_position: 4
tags:
  - security
---

# Cryptographic Provenance

The current provenance model centers on the GBX X2 seal standard: a signed, dual-channel provenance bundle produced at successful run completion. It is designed to bind inputs, runtime metadata, and outputs into a verifiable artifact that can be checked outside the original execution environment.

## Core artifacts

The provenance bundle can include:

- `run_manifest.json`
- `inputs/input_hashes.json`
- `seal/seal.json`
- `seal/seal.sig`
- `seal/seal.svg`
- `seal/seal.png`
- `seal/VERIFY.md`
- `seal/public_key.pem`
- `results/summary.json`

These files are the operational record for what ran and the verification record for what was sealed.

## Hashing model

The current documented hashing path is:

1. Input files are hashed with SHA-256
2. The run manifest is hashed with SHA-256
3. The output set is hashed with SHA-256 at completion

Core sealed fields include:

- `inputs_sha256`
- `run_manifest_sha256`
- `outputs_sha256`
- `seal_id`

## Provenance lifecycle

The documented lifecycle is:

1. The caller consumes entitlement for a unique `run_id`
2. The caller records run-start metadata including the input hash
3. The pipeline executes and writes outputs
4. The caller records completion metadata including the output hash
5. The service issues a signed seal bundle

This gives the seal a concrete relationship to both the start state and the completion state of a run.

## Signature model

`seal.json` is signed with Ed25519 over canonical JSON bytes. The canonicalization rules are:

- UTF-8 encoding
- Sorted keys
- Compact separators

The signed seal is then distributed with the signature artifact and rendered seal assets.

## Dual-channel seal model

The current seal model documents two visual or scan channels:

- A ring channel
- A barcode channel

The seal is only considered valid when both channels reconcile with the signed payload.

### Ring channel

The ring channel carries the `seal_id` and supports decode-and-match verification against the signed payload.

### Barcode channel

The barcode channel is deterministically derived from:

- `inputs_sha256`
- `outputs_sha256`
- `run_manifest_sha256`
- `seal_id`

The expected barcode digest is stored in the signed seal payload and can also be embedded in the SVG metadata for reconciliation.

## Verification states

The seal shown in a report is stateful rather than decorative. User-facing workflows should distinguish at least:

- `VERIFIED` for valid signature and matching channels
- `UNVERIFIED` for a present seal that has not yet been checked in the current viewer context
- `INVALID` for signature failure or channel mismatch
- `PENDING` or `PARTIAL` for incomplete lineage or unreconciled sealing state

Only `VERIFIED` should be treated as decision-grade.

## Verification rule

A scan should be treated as valid only when:

- The signature is valid
- The ring channel resolves to the expected `seal_id`
- The observed barcode digest matches the expected digest

Any channel failure should be treated as verification failure rather than a partial pass.

## Verification paths

The currently documented verification surfaces are:

- A user-facing verification portal that accepts `seal.svg`
- `POST /api/seal/verify`

Verification can also be performed offline with the shipped public key and bundle artifacts. That is an important trust boundary: customers can validate provenance without depending on a live vendor check.

Use the SVG artifact as the portable verification entry point for user-facing workflows.

## Important boundary

Seal verification proves that the artifact is valid for a recorded run. It does not prove that:

- The scientific conclusion is correct
- The inputs were sufficient for every analysis family
- Registry access has been revoked for every party
- IAM, entitlement issuance, or wet-lab governance controls have been replaced

## Trust boundaries

Public verification materials include:

- the verification process
- seal artifacts in the bundle
- the public verification key

Private issuance materials include:

- signing private keys
- issuance credentials
- entitlement secrets

Private materials are never part of the customer bundle.

For the customer-facing explanation, see [Verification Seal](../computational-safety-diligence/outputs/verification-seal.md).
