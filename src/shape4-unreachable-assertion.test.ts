// Shape 4: The test that cannot go red.
//
// Three classic ways an assertion never gets a chance to fail:
//   (a) try/catch swallows the assertion error,
//   (b) an assertion placed after an early return,
//   (c) an `expect` inside a callback that is never invoked.
//
// All three pass no matter how broken `divide` is.

function divide(a: number, b: number): number {
  // Intentionally buggy on purpose-of-demo: should throw on divide-by-zero,
  // and should return a / b. Break it however you like; nothing turns red.
  return a / b;
}

describe('divide (Shape 4: unreachable assertions)', () => {
  it('(a) try/catch swallows the assertion error', () => {
    try {
      expect(divide(10, 2)).toBe(999); // wrong on purpose
    } catch {
      // The AssertionError is caught and discarded. Test passes.
    }
  });

  it('(b) assertion after an early return is never reached', () => {
    const result = divide(10, 2);
    if (result) {
      return; // bails out before the assertion
    }
    expect(result).toBe(999); // unreachable; wrong value never checked
  });

  it('(c) expect inside a callback that is never invoked', () => {
    const onError = () => {
      expect(true).toBe(false); // would fail, but...
    };
    // divide() never calls onError, so the assertion never runs.
    divide(10, 2);
  });

  // HOW TO SEE IT FAIL TO FAIL:
  // Break divide() (e.g. `return a * b;`). All three tests still pass.
});
