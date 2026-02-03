# Checkout Flow – Test Plan

## 1. Objective
Validate that a user can successfully complete the checkout process on SauceDemo
from inventory to order confirmation, while ensuring the flow is fast, reliable,
and suitable for high-speed CI execution.

---

## 2. Scope
Automated validation of the following Checkout Flow steps:

- Access Inventory page as an authenticated user (via session file)
- Add product to cart
- View cart
- Enter checkout information
- Complete purchase
- Verify order confirmation ("Thank you for your order")

Additional coverage:
- UI state changes (Add → Remove button)
- Responsive behavior (mobile viewport)
- Basic visual logic validation

---

## 3. Out of Scope
The following are intentionally excluded to optimize execution time:

- Authentication UI testing ( included as a first setup do get a session )
- Payment processing (mocked / non-existent in SauceDemo)
- Backend/database validation
- Cross-browser exhaustive matrix
- Accessibility audits (WCAG)

---

## 4. Test Levels
### Automated UI Tests (Primary)
- End-to-end Checkout Flow
- UI state validation
- Responsive layout validation (mobile viewport)

---

## 5. Test Environment
- Application: https://www.saucedemo.com
- Browser: Chromium (primary)
- Viewports:
  - Desktop (default)
  - Mobile (iPhone 12 Pro dimensions)
- Test User:
  - `standard_user`

---

## 6. Test Data
- User: `standard_user`
- Products:
  - Sauce Labs Backpack
- Checkout details:
  - Dummy static data (first name, last name, postal code)

No dynamic data creation required.

---

## 7. Entry & Exit Criteria
### Entry Criteria
- Application is reachable
- Test user credentials are valid
- Session injection mechanism works

### Exit Criteria
- Checkout completes successfully
- Confirmation message is displayed
- No blocking UI or functional errors observed

---

## 8. Risks & Mitigations
| Risk | Mitigation |
|-----|-----------|
| Session handling changes | Login utility isolated and reusable |
| UI selector changes | Use of `data-test` attributes and ARIA roles |
| Flaky UI timing | Explicit waits for state changes, not static delays |
| Slow CI execution | UI login bypassed using programmatic state injection |

---

## 9. Automation Strategy
- Avoid UI login for main test flows to reduce execution time
- Use browser context state injection (cookies / localStorage)
- Keep authentication covered by a minimal smoke test

---

## 10. Reporting
- Test results generated via Playwright HTML report
- Reports stored as CI artifacts
- Failures provide screenshots and traces for debugging
