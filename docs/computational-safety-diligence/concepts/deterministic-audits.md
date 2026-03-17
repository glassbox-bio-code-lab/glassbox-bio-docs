---
title: Deterministic Audits
description: What deterministic audit behavior means in the context of the product.
sidebar_position: 2
---

# Deterministic Audits

Deterministic audits are the part of the product promise that deals with reproducibility, replay, and audit confidence.

## What determinism means here

For computational analyses, the target operating model is bit-for-bit reruns when the same inputs, configuration, container image, and dependency set are used.

That requires:

- A deterministic container or execution environment
- Locked dependencies
- Stable tool and binary provenance
- A run manifest that captures seeds, parameters, and key configuration
- Artifact verification through hashes and verification tooling

## What the reproducibility pack should preserve

A reproducibility-oriented run bundle should retain:

- Container identity
- Dependency versions and hashes
- Run manifest fields needed for replay
- Artifact hashes
- Verification instructions

## What can still vary

Determinism does not mean every run everywhere will be identical under every condition. Results can still differ when:

- Inputs differ
- The run mode changes
- Module eligibility changes by category
- The execution environment or image changes

The audit guarantee applies to replaying the same run conditions, not to forcing unrelated runs into identical outputs.

## Why this matters

The point of deterministic auditing is not cosmetic consistency. It is to make the computational artifact inspectable, independently reproducible, and suitable for cryptographic sealing.
