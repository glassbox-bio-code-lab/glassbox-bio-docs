## [2026-04-11 03:26]

### Summary

Renamed the optional `Add-Ons` documentation surface to `Modules` across the sidebar, homepage navigation, route slugs, and related orientation docs.

### Changes

- Renamed the docs directory from `docs/add-ons` to `docs/modules`
- Updated generated category labels and slugs from `/add-ons` to `/modules`
- Updated homepage navigation cards and product-surface labels to use `Modules`
- Rewrote docs references and descriptions that still referred to `Add-Ons` or `add-ons`
- Clarified the distinction between optional `Modules` and core analysis modules in the Computational Safety Diligence docs

### Decisions

- Changed the public-facing route path to `/modules` instead of only relabeling the sidebar
- Kept the existing core analysis module section intact and differentiated it in copy where naming could become ambiguous
- Created `changelog.md` because it was missing and the repo instructions require turn logging

### Next Steps

- Run the docs site locally and verify internal links resolve under `/docs/modules/...`
- If desired, update any external references or bookmarks that still point to `/docs/add-ons/...`
