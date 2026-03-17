---
title: Marketplace Pricing and Metering
description: Pricing and metering summary for Google Cloud Marketplace deployments.
sidebar_position: 14
---

# Marketplace Pricing and Metering

This page rewrites the Marketplace pricing and metering source into docs form.

## What customers are billed for

The source material says Marketplace customers are billed for:

- the Marketplace runtime license fee while the entitled deployment is active
- underlying Google Cloud infrastructure costs such as cluster, storage, and network resources, billed separately by Google

## Time-based metering

The current Marketplace policy says billing is time-based for the product license in this version, even though the product produces per-run deliverables.

That means deliverable count and Marketplace license metering are not the same thing.

## How to minimize charges

The source guidance recommends:

- scaling down or stopping workloads when not in use
- using the recommended machine type
- running workloads serially by default

## Important distinction

Marketplace metering and `runMode` selection describe commercial and infrastructure behavior. They do not by themselves determine the scientific routing category of a run.

For product deployment details, see [Google Cloud Marketplace](../deployment-and-operations/google-cloud-marketplace.md).
