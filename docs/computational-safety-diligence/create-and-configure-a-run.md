---
title: Create and Configure a Run
description: How a user initiates and configures core analysis.
sidebar_position: 4
tags:
  - computational-safety-diligence
---

# Create and Configure a Run

The best way to understand run configuration is to read the emitted `run_manifest.json` and module-plan artifacts together. The example output bundle shows the fields that matter operationally.

## Required run identity

Every run needs a stable:

- `project_id`
- `run_id`
- generation timestamp
- runner identity

In the example bundle, those appear in `run_manifest.json` together with the input, runner, and entitlement blocks.

## Input-side configuration

The module plan resolves the effective input contract into fields such as:

- `selection_csv`
- `sources_path`
- `project_root`
- `primary_candidate_id`
- `selected_candidate_smiles`
- `target_gene`
- `target_pdb_id`
- `target_pdb_path`
- `input_admissibility`
- `missing_required_inputs`
- `input_warnings`

That means configuration is not just a cluster concern. It also includes the resolved scientific input context that determines what the run is even allowed to claim.

The staged files are also what drive category routing. Structure files, assay tables, and the admissibility state determine whether the run resolves into a ligand-only, structure-backed, assay-aware, or physics-audit-eligible category. See [Category Policy and Routing](./category-policy-and-routing.md).

## Analysis mode and category resolution

The example module plan also shows the analysis-side controls:

- `audit_mode`
- `category_id`
- `plan_resolution`
- `tier_compliance`
- `context_of_use`
- `claim_acceptance`

These fields matter because they decide:

- Which modules are in scope
- Which modules are out of scope by policy
- Which required modules are missing
- Whether the requested tier is fully satisfied
- Whether claims should be treated as supported or demoted to hypothesis

Treat `category_id` as a first-class configuration outcome. If it resolves to the wrong category, the rest of the run can look healthy while still representing the wrong scientific path.

## Planned versus executed modules

The emitted execution block distinguishes:

- planned modules
- executed modules
- skipped modules with reasons
- out-of-scope modules
- failed modules
- partial modules

That distinction is essential. A run can be technically successful while still being incomplete for a specific claim type.

## Practical run-configuration checklist

Before treating a run as ready for interpretation, confirm:

1. `project_id` and `run_id` match the intended submission
2. The resolved category matches the real input profile
3. The required modules for the requested tier are either executed or explicitly accounted for
4. Any skipped modules have understandable reasons such as `missing_input`
5. The resolved category is consistent with the policy in [Category Policy and Routing](./category-policy-and-routing.md)

For the artifact-level view, see [Report Package Overview](./outputs/report-package-overview.md).
