---
title: End-to-End Workflow
description: Recommended lifecycle from preparation to decision-making.
sidebar_position: 3
tags:
  - platform
---

# End-to-End Workflow

Use this workflow as the backbone of the docs and of the actual product journey.

## Recommended workflow

1. Stage and prepare the input package
2. Validate readiness and resolve packaging issues
3. Configure the run and execute the job
4. Review the summary, fast-fail, and full report outputs
5. Check evidence coverage, claim acceptance, and reproducibility artifacts
6. Decide whether to proceed, escalate, rerun, or collect missing proof

## What each stage maps to

### 1. Prepare inputs

Use:

- [Prepare Inputs](../computational-safety-diligence/prepare-inputs.md)
- [Supported Inputs](../preflight-ui/validation-system/supported-inputs.md)

### 2. Validate readiness

Use the PreFlight UI section when you need packaging and readiness guidance. If those pages are still in placeholder state, use the validation-system and input-contract pages already completed in the repo.

### 3. Configure and run

Use:

- [Quickstart](./quickstart.md)
- [Kubernetes and Helm](../deployment-and-operations/kubernetes-and-helm.md)
- [Create and Configure a Run](../computational-safety-diligence/create-and-configure-a-run.md)

### 4. Review outputs

Use:

- [Report Package Overview](../computational-safety-diligence/outputs/report-package-overview.md)
- [Fast-Fail Summary](../computational-safety-diligence/outputs/fast-fail-summary.md)
- [Interpret Results](../computational-safety-diligence/interpret-results.md)

### 5. Review evidence and reproducibility

Use:

- [Evidence-Linked Outputs](../computational-safety-diligence/outputs/evidence-linked-outputs.md)
- [Module Coverage Ratio](../computational-safety-diligence/outputs/module-coverage-ratio.md)
- [Reproducibility Pack](../computational-safety-diligence/outputs/reproducibility-pack.md)

### 6. Decide or iterate

If the run is unresolved, look at:

- missing-proof handling
- tier compliance
- skipped or out-of-scope modules
- follow-up checks recommended by the fast-fail summary

## Why this matters

The workflow should feel linear to the user even though the emitted artifacts are detailed and layered. The docs should preserve that forward motion.
