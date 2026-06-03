// Shape 3: The rubber-stamp snapshot.
//
// A snapshot test asserts "the output matches what it was last time." When the
// component changes, the convention is to rerun with `--updateSnapshot`, which
// silently re-blesses the new output. The test therefore approves any change
// and can never catch a regression on its own.

import { render } from '@testing-library/react';
import * as React from 'react';

function PriceTag({ amount }: { amount: number }): React.ReactElement {
  // A real bug could live here: wrong currency, wrong rounding, wrong label.
  return <span className="price">${amount.toFixed(2)}</span>;
}

describe('PriceTag (Shape 3: rubber-stamp snapshot)', () => {
  it('useless: blesses whatever the component currently renders', () => {
    const { container } = render(<PriceTag amount={19.5} />);

    // Whatever comes out becomes the source of truth on first run.
    expect(container.firstChild).toMatchSnapshot();

    // HOW TO SEE IT FAIL TO FAIL:
    // Change the render output (e.g. `€${amount}` or drop `.toFixed(2)`), then
    // rerun with:  npx jest src/shape3-snapshot.test.ts --updateSnapshot
    // The snapshot is rewritten to the broken output and the test is green.
  });
});
