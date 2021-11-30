import { render } from '@testing-library/react';
import wait from 'waait';
import CartCount from '../components/CartCount';

describe('<CartCount />', () => {
  it('Renders', () => {
    render(<CartCount count={10} />);
  });
  it('Matches snapshot', () => {
    const { container } = render(<CartCount count={11} />);
    expect(container).toMatchSnapshot();
  });
  it('updates via props', () => {
    const { container } = render(<CartCount count={11} />);
    expect(container.textContent).toBe('11'); // Same thing as expect(container).toHaveTextContent('11)
  });
});
