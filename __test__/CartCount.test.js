import { render, screen } from '@testing-library/react';
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
  it('updates via props', async () => {
    const { container, rerender, debug } = render(<CartCount count={11} />);
    expect(container.textContent).toBe('11'); // Same thing as expect(container).toHaveTextContent('11')
    rerender(<CartCount count={12} />);
    expect(container.textContent).toBe('1211');
    //wait for at least 700ms because of the css animation
    await wait(700);
    expect(container.textContent).toBe('12');
    expect(container).toMatchSnapshot();
  });
});
