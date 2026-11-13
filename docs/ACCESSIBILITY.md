# Accessibility Guidance

This document is a review plan and implementation reference. It is not a claim of WCAG conformance.

## Existing accessible building blocks

The project uses Radix-based primitives for dialogs, dropdowns, checkboxes, tabs, switches, tooltips and related interactions. These can provide good keyboard and screen-reader behaviour when labels, triggers, descriptions and focus rules are applied correctly.

## Areas to review

### Navigation and layout
- Ensure icon-only sidebar controls have accessible names.
- Communicate collapsed/expanded state.
- Keep focus order aligned with visual order.
- Make active route state available beyond colour.
- Ensure theme controls expose their purpose.

### Forms
- Keep email/password labels programmatically associated with inputs.
- Explain that login fields are not verified in demo mode.
- Connect upload inputs with labels and help/error text.
- Announce validation errors and asynchronous state changes.

### Dialogs and menus
- Ensure focus moves into dialogs and returns to the trigger when closed.
- Verify Escape and keyboard interactions.
- Give every icon-only action an accessible name.
- Avoid announcing fake success as if an operation were persisted.

### Files and risk labels
- Do not rely on colour alone for file type or risk.
- Provide a meaningful reading order for name, type, size, owner and action.
- Give informative images descriptive alternative text.
- Keep placeholder previews clearly identified.

### Charts and activity
- Provide textual summaries or accessible tables for charts.
- Do not present sample activity as actual audit events.
- Ensure chart tooltips and legends can be accessed by keyboard where applicable.

## Known usability concern

The preview dialog suppresses context-menu, copy and drag interactions. These handlers do not protect content but can interfere with assistive technology and ordinary browser workflows. They should not be used as a security control.

## Manual checklist

- [ ] Keyboard-only navigation through all pages, dialogs and menus.
- [ ] Visible focus state in light and dark theme.
- [ ] Labels and errors announced by screen reader.
- [ ] Dialog focus trap and return behaviour.
- [ ] 200% zoom and small viewport reflow.
- [ ] Adequate contrast and non-colour status signals.
- [ ] Reduced-motion preference respected.
- [ ] Charts have text alternatives.
