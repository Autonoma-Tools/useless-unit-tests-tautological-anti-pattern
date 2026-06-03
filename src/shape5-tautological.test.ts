// Shape 5: The tautological test in its purest form.
//
// The "expected" value is computed by calling the very function under test.
// `actual === expected` is then trivially true for ALL inputs, because both
// sides run the same (possibly broken) code. The assertion is a tautology.

function calculateDiscount(price: number, percentOff: number): number {
  // Whatever this does (right or wrong), the test below will agree with it.
  return price - (price * percentOff) / 100;
}

describe('calculateDiscount (Shape 5: tautological assertion)', () => {
  it('useless: expected value is produced by the function under test', () => {
    const price = 200;
    const percentOff = 25;

    const expected = calculateDiscount(price, percentOff); // same code path
    const actual = calculateDiscount(price, percentOff);

    expect(actual).toBe(expected); // always true; tests nothing

    // HOW TO SEE IT FAIL TO FAIL:
    // Introduce a bug (e.g. `return price + (price * percentOff) / 100;`).
    // Both `expected` and `actual` become equally wrong, so they still match
    // and the test stays green.
  });
});
