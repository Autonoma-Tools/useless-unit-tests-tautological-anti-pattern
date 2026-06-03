// Shape 2: Asserting on a mock you configured in the same test.
//
// We configure a jest.fn() to return a value, call the code under test, then
// assert that the mock returned the value we told it to return. That is
// circular: we are testing jest's mocking, not `getDisplayName`. The function
// under test's own output is never asserted.

interface UserRepository {
  findName(id: number): string;
}

function getDisplayName(repo: UserRepository, id: number): string {
  const name = repo.findName(id);
  return name.trim().toUpperCase();
}

describe('getDisplayName (Shape 2: mock self-assertion)', () => {
  it('useless: only asserts the mock returned what we configured', () => {
    const findName = jest.fn().mockReturnValue('  ada  ');
    const repo: UserRepository = { findName };

    getDisplayName(repo, 1);

    // Circular: we configured the return value above and now "verify" it.
    expect(findName).toHaveBeenCalledWith(1);
    expect(findName.mock.results[0].value).toBe('  ada  ');

    // HOW TO SEE IT FAIL TO FAIL:
    // There is NO assertion on getDisplayName's output. Break the
    // transformation (e.g. `return name.toLowerCase();`) and this stays green
    // because we never assert the function returns 'ADA'.
  });
});
