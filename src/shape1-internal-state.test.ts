// Shape 1: Asserting internal state instead of observable behavior.
//
// The test reaches into the cart's internal `items` array and asserts on it
// directly. It never calls the public interface (`getTotal()`), so a bug in
// `getTotal()` cannot make this test go red.

class ShoppingCart {
  // "private-ish" implementation detail. Tests should not depend on this.
  items: Array<{ price: number; qty: number }> = [];

  add(price: number, qty: number): void {
    this.items.push({ price, qty });
  }

  // The observable behavior the cart actually promises.
  getTotal(): number {
    return this.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  }
}

describe('ShoppingCart (Shape 1: internal-state assertion)', () => {
  it('useless: asserts on the internal items array, never on behavior', () => {
    const cart = new ShoppingCart();
    cart.add(10, 2);
    cart.add(5, 1);

    // We only check the bookkeeping array, not what the user actually sees.
    expect(cart.items).toHaveLength(2);
    expect(cart.items[0]).toEqual({ price: 10, qty: 2 });

    // HOW TO SEE IT FAIL TO FAIL:
    // Change getTotal() to `return 0;` (or any wrong value) and rerun.
    // This test stays green because getTotal() is never exercised.
  });
});
