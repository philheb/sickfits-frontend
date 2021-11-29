import formatMoney from '../lib/formatMoney';

describe('format money function', () => {
  it('works with fractional dollars', () => {
    expect(formatMoney(1)).toEqual('$0.01');
  });
});
