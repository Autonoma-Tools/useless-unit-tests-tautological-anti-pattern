# Useless Unit Tests: The Tautological Anti-Pattern (and 4 Other Shapes)

Five runnable Jest/TypeScript examples illustrating each shape of useless unit test: internal-state assertion, mock self-assertion, rubber-stamp snapshot, unreachable assertion, and the tautological test.

> Companion code for the Autonoma blog post: **[Useless Unit Tests: The Tautological Anti-Pattern (and 4 Other Shapes)](https://www.getautonoma.com/blog/useless-unit-tests-tautological-anti-pattern)**

Every test in this repo is **green right now**. That is the point. Each one is a self-contained example of a test that looks like it verifies something but cannot actually fail when the code it "covers" breaks. Run them, break the implementation, watch them stay green.

## Requirements

Node 18+ and npm. (No global tooling needed; everything is a dev dependency.)

## Quickstart

```bash
git clone https://github.com/Autonoma-Tools/useless-unit-tests-tautological-anti-pattern.git
cd useless-unit-tests-tautological-anti-pattern
npm install
npm test          # runs all five shapes
```

## The catalogue

Each shape lives in its own self-contained test file under `src/`. The minimal implementation it "tests" is inlined in the same file, so you can break it in one place and immediately rerun.

### Shape 1 — Internal-state assertion

Asserts on a private-ish implementation detail (a cart's internal `items` array) instead of the observable behavior (`getTotal()`).

```bash
npx jest src/shape1-internal-state.test.ts
```

**See it fail to fail:** change `getTotal()` to `return 0;` and rerun. Still green, because the test never calls `getTotal()`.

### Shape 2 — Mock self-assertion

Configures a `jest.fn()` to return a value, then "verifies" the mock returned that value. Circular: the function under test's own output is never asserted.

```bash
npx jest src/shape2-mock-assertion.test.ts
```

**See it fail to fail:** break the transformation (e.g. `return name.toLowerCase();`) and rerun. Still green, because nothing asserts the function's output.

### Shape 3 — Rubber-stamp snapshot

A React component snapshot test that re-blesses on every change via `--updateSnapshot`, so it approves any output.

```bash
npx jest src/shape3-snapshot.test.tsx
```

**See it fail to fail:** change the component's render output, then rerun with `npx jest src/shape3-snapshot.test.tsx --updateSnapshot`. The snapshot is rewritten to the broken output and stays green.

### Shape 4 — Unreachable assertion

The test that cannot go red. Three variants in one file: (a) a `try/catch` that swallows the assertion error, (b) an assertion after an early `return`, (c) an `expect` inside a callback that is never invoked.

```bash
npx jest src/shape4-unreachable-assertion.test.ts
```

**See it fail to fail:** break `divide()` (e.g. `return a * b;`). All three variants still pass.

### Shape 5 — The tautological test

The purest form. The expected value is produced by calling the function under test itself, so `actual === expected` is trivially true for all inputs.

```bash
npx jest src/shape5-tautological.test.ts
```

**See it fail to fail:** introduce a bug in `calculateDiscount()` (e.g. `+` instead of `-`). Both sides become equally wrong, so they still match and the test stays green.

## Project structure

```
useless-unit-tests-tautological-anti-pattern/
├── README.md
├── LICENSE
├── package.json
├── jest.config.js
├── tsconfig.json
└── src/
    ├── shape1-internal-state.test.ts      # internal-state assertion
    ├── shape2-mock-assertion.test.ts      # mock self-assertion
    ├── shape3-snapshot.test.tsx           # rubber-stamp snapshot
    ├── shape4-unreachable-assertion.test.ts  # unreachable assertion
    └── shape5-tautological.test.ts        # tautological test
```

- `src/` — one self-contained example per shape; the implementation under test is inlined.

## About

This repository is maintained by [Autonoma](https://getautonoma.com) as reference material for the linked blog post. Autonoma builds autonomous AI agents that plan, execute, and maintain end-to-end tests directly from your codebase.

If something here is wrong, out of date, or unclear, please [open an issue](https://github.com/Autonoma-Tools/useless-unit-tests-tautological-anti-pattern/issues/new).

## License

Released under the [MIT License](./LICENSE) © 2026 Autonoma Labs.
