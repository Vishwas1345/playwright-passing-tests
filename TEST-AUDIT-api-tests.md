# Playwright Test Quality Audit - `tests/api-tests.spec.js`

## Executive Summary
Overall score is **18/100**. The most critical issue is that this spec (and adjacent suite files) uses synthetic in-memory data and pure JavaScript assertions without exercising real API requests, UI flows, or product state, so passing runs provide little product confidence. Trend direction is negative for release confidence because high pass rates here can mask real regressions.

## Category Snapshot

| Category | Count |
|---|---:|
| surface_level_tests | 2 |
| missing_validation | 1 |
| stability_issues | 1 |
| hard_to_maintain | 1 |
| coverage_gaps | 1 |
| organization_ownership | 0 |
| setup_configuration | 1 |
| duplication_overlap | 1 |
| other | 0 |

## Test Composition

| Type | Count | Notes |
|---|---:|---|
| Full user flows | 0 | No end-to-end journeys with app/API state transitions. |
| Interactions | 0 | No `request.*` or `page.*` interactions in scoped/adjacent specs. |
| Render checks | 0 | No UI checks. |
| Page loads | 0 | No navigation/actions. |
| Accessibility | 0 | No a11y checks. |
| Other | 95 | Pure logic/assertion tests (math/string/object/array transformations). |

## Score Breakdown

| Dimension | Penalty | Reason |
|---|---:|---|
| Behavioral coverage | -30 | Tests do not exercise the product surface (API or UI) despite Playwright runner. |
| Validation depth | -20 | Assertions validate mock literals or local transformations only. |
| Coverage realism | -14 | No real auth/error/data-lifecycle scenarios tied to live or mocked transport layers. |
| Maintainability signal | -10 | Large duplicated toy-test inventory increases noise and false confidence. |
| Reliability configuration | -8 | Retries are always enabled, masking first-failure signal. |

**Overall: 18/100**

## Audit Coverage
- **Primary deep scan:** `tests/api-tests.spec.js`
- **Adjacent suite review:** `tests/assertions.spec.js`, `tests/comparisons.spec.js`, `tests/firefox-tests.spec.js`, `tests/webkit-tests.spec.js`, `tests/mobile-tests.spec.js`, `playwright.config.js`
- **Repo-wide critical/high sweep performed for:** shallow tests, write validation, synchronization risks, setup masking, and duplication
- **Bounded prevalence:**
  - 95 test cases across 6 spec files are assertion-only and synthetic
  - 0 matches for `request.` and 0 matches for `page.` in spec files
  - 1 `setTimeout` timing pattern found in mobile tests
  - Global retries always enabled (`retries: isCI ? 1 : 1`)

## Findings by severity

### Critical
1. **Suite is predominantly synthetic and disconnected from product behavior** (`surface_level_tests`)
   - Most tests assert hardcoded in-memory objects and language operations.
   - This invalidates confidence for real API/UI functionality because regressions in the product can ship while all tests pass.

2. **Target “API tests” do not perform real API requests** (`missing_validation`)
   - `api-tests.spec.js` simulates responses and request-building logic locally instead of calling endpoints.
   - Assertions validate mocked literals, not server behavior, schema contracts, or persistence outcomes.

### High
3. **Mass duplication of low-value assertion patterns across browser-tagged files** (`duplication_overlap`)
   - Browser-specific specs repeat basic JavaScript checks (math/string/object operations) rather than browser/product behaviors.
   - This inflates suite size and execution signal without increasing defect detection.

4. **Retry policy masks first-run failures in all environments** (`setup_configuration`)
   - Retries are enabled both in CI and local runs, obscuring instability and reducing urgency to fix flakes or weak tests.

### Medium
5. **Time-based async pattern appears without deterministic app synchronization target** (`stability_issues`)
   - A `setTimeout` promise pattern exists in mobile tests, introducing timing-based behavior unrelated to product readiness checks.

6. **Feature and error-path coverage gaps for real API lifecycle** (`coverage_gaps`)
   - No scenarios for real authentication failures, contract drift on live endpoints, write/read-back persistence, or transport-level error handling.

7. **High maintenance overhead from broad toy-test inventory** (`hard_to_maintain`)
   - Many tests are educational/demo-like and not tied to owners, features, or acceptance criteria.

## Critical & High Issue Map

| Cluster | Affected scope | Why it matters | Strongest evidence |
|---|---|---|---|
| Synthetic suite invalidates confidence | 6 spec files | Product regressions can ship undetected while suite remains green. | 95 assertion-only tests; no `request.`/`page.` usage in specs. |
| API tests without API I/O | `tests/api-tests.spec.js` | No network or contract verification for the area under test. | Mock-only response objects and request-building assertions (`tests/api-tests.spec.js` lines 10-19, 21-33, 70-100). |
| Duplicate low-signal patterns | `assertions/comparisons/firefox/webkit/mobile` specs | Test volume grows without meaningful risk coverage. | Repeated primitive assertions (`tests/comparisons.spec.js` lines 7-100; `tests/assertions.spec.js` lines 7-91). |
| Retry masking | Global config | First-failure signal is reduced in both local and CI runs. | `playwright.config.js` line 15 (`retries: isCI ? 1 : 1`). |

## Config Issues
- `playwright.config.js` sets retries for all environments (`isCI ? 1 : 1`).
- `fullyParallel: true` with high worker count can hide order/race issues when real shared-state tests are later introduced.
- Project `grep` tagging is configured, but current test content is not behavior-oriented per platform.

## Duplication & Overlap
- Multiple browser-targeted files contain near-identical categories of pure JS assertions.
- `api-tests.spec.js` overlaps with utility-style unit testing rather than API integration behavior.
- Consolidating toy assertions into a separate unit-test layer would reduce Playwright-suite noise.

## Recommendations

### Quick Wins
- Replace one synthetic block in `tests/api-tests.spec.js` with real `request.get/post/put` calls and strict status/schema assertions.
- Change retries to `retries: isCI ? 1 : 0` to expose local first-run failures.
- Add at least one negative API contract test with exact expected status and error fields.

### Medium Effort
- Rework `api-tests.spec.js` into true API integration flows: create/update/delete plus read-back validation.
- Convert browser-tagged toy specs into actual browser behaviors (navigation, rendering, form submission, state persistence).

### Deep Refactors
- Split this repository into two layers: lightweight unit tests (Jest/Vitest) for pure JS logic and Playwright for product/integration behavior.
- Introduce feature-owned Playwright specs with traceable acceptance criteria and environment-stable fixtures.
