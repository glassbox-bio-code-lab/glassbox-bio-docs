---
title: API Overview
description: Summary of the externally exposed APIs.
sidebar_position: 2
tags:
  - reference
---

# API Overview

This page groups the externally relevant APIs by workflow.

## Entitlement and run lifecycle API

These endpoints are used by the customer job during a normal entitled run:

| Endpoint | Purpose | Typical caller |
| --- | --- | --- |
| `POST /api/entitlement/check` | Confirms entitlement availability for a proposed `run_id` | Runner |
| `POST /api/entitlement/consume` | Consumes one run from the entitlement balance | Runner |
| `POST /api/entitlement/run_start` | Records run-start metadata such as hashes, image, and project ID | Runner |
| `POST /api/entitlement/run_complete` | Marks successful completion and returns the seal bundle | Runner |

## Seal verification API

These endpoints support verification and controlled reruns:

| Endpoint | Purpose | Typical caller |
| --- | --- | --- |
| `POST /api/seal/verify` | Verifies an uploaded `seal.svg` and returns verification data | User, operator, portal |
| `POST /api/entitlement/redeem_seal_once` | Grants a one-time rerun for a verified `(principal, seal_id)` pair | Authenticated user or operator |

The one-time redemption flow is replay-resistant. A second attempt for the same `(principal, seal_id)` pair should return `409`.

## Admin issuance API

This endpoint is used by the partner or publisher side of the workflow:

| Endpoint | Purpose | Typical caller |
| --- | --- | --- |
| `POST /api/entitlement/issue` | Issues entitlement runs to a customer principal | Partner or admin operator |

## Authentication model

The current customer deployment path is identity-only:

- The job authenticates with Google identity
- The service uses the caller identity as the principal
- Customers do not manage long-lived entitlement tokens in the normal flow

For admin issuance, the current customer docs also reference an admin token header:

- `X-GBX-ADMIN-TOKEN`

## What belongs in API docs versus product docs

Use the API docs to define:

- Endpoint purpose
- Auth expectations
- Required sequencing
- Expected status codes

Use product and trust docs to explain:

- Why the entitlement model exists
- What the seal means
- How rerun policy works in user terms

For status codes, see [Error Codes](./error-codes.md).
