---
title: Self-Hosted Trust Model
description: What changes when customers deploy the platform in their own environment.
sidebar_position: 7
---

# Self-Hosted Trust Model

Define responsibility boundaries clearly for the self-hosted model.

## Core trust shift

When the platform is deployed into the customer's own Google Cloud or Kubernetes environment, the operational trust model changes in an important way:

- Glassbox provides the application, policy surface, and support path
- the customer controls the runtime environment, IAM, storage, networking, and lifecycle of run data

This means the customer is not just a user of outputs. The customer is also the primary operator of the execution boundary.

## Customer responsibilities

In the self-hosted model, the customer is responsible for:

- cluster configuration and workload scheduling
- storage provisioning and retention
- IAM and Workload Identity setup
- network access to required services
- billing account and cloud-resource costs
- environment security configuration

These are not support-only details. They are part of the trust model itself.

## Glassbox responsibilities

Glassbox remains responsible for:

- the application image and deployment artifacts
- documented product behavior in supported configurations
- entitlement and sealing service behavior where those services are used
- support guidance, bug triage, and published updates

Glassbox is not the default host of customer inputs and deliverables in this model.

## Optional external services

The trust boundary can widen when the customer enables:

- third-party APIs
- optional sealing or verification calls
- Marketplace reporting paths

Those services should be documented explicitly so customers understand which data remains fully local and which data crosses out of their environment.

## Practical operator rule

In the self-hosted model, trust should be evaluated across two separate questions:

1. Is the run artifact authentic, reproducible, and verifiable?
2. Is the customer-operated environment configured and governed correctly?

The first question is addressed by provenance and verification artifacts. The second remains a customer operations responsibility.
