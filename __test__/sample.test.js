function add(a, b) {
  const aNum = parseInt(a);
  const bNum = parseInt(b);
  return aNum + bNum;
}

describe('Sample test 101', () => {
  it('works as expected', () => {
    //we run our expected statements to see if the test will pass
    expect(1).toEqual(1);
  });
  it('runs the add function', () => {
    //we run our expected statements to see if the test will pass
    expect(add(1, 2)).toBeGreaterThanOrEqual(3);
  });
  it('can add strings of numbers together', () => {
    expect(add('1', '2')).toBe(3);
  });
});
