import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import Pagination from '../components/Pagination';
import { makePaginationMocksFor } from '../lib/testUtils';

describe('<Pagination />', () => {
  it('Display a loading message', () => {
    const { container } = render(
      <MockedProvider mocks={makePaginationMocksFor(1)}>
        <Pagination page={1} />
      </MockedProvider>
    );
    expect(container).toHaveTextContent('Loading...');
  });

  it('Renders pagination for 18 items', async () => {
    const { container } = render(
      <MockedProvider mocks={makePaginationMocksFor(18)}>
        <Pagination page={1} />
      </MockedProvider>
    );
    await screen.findByTestId('pagination');
    expect(container).toHaveTextContent('18 Items Total');
    expect(container).toHaveTextContent('Page 1 of 5');
    expect(container).toMatchSnapshot();
  });

  it('Disable the prev button on page 1', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(18)}>
        <Pagination page={1} />
      </MockedProvider>
    );
    await screen.findByTestId('pagination');
    debug();
    const prevButton = screen.getByText('← Prev');
    expect(prevButton).toHaveAttribute('aria-disabled', 'true');
    const nextButton = screen.getByText('→ Next');
    expect(nextButton).toHaveAttribute('aria-disabled', 'false');
  });
  it('Disable the next button last page', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(18)}>
        <Pagination page={5} />
      </MockedProvider>
    );
    await screen.findByTestId('pagination');
    debug();
    const nextButton = screen.getByText('→ Next');
    expect(nextButton).toHaveAttribute('aria-disabled', 'true');
    const prevButton = screen.getByText('← Prev');
    expect(prevButton).toHaveAttribute('aria-disabled', 'false');
  });
  it('Enable all on middle page', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(18)}>
        <Pagination page={2} />
      </MockedProvider>
    );
    await screen.findByTestId('pagination');
    debug();
    const prevButton = screen.getByText('← Prev');
    expect(prevButton).toHaveAttribute('aria-disabled', 'false');
    const nextButton = screen.getByText('→ Next');
    expect(nextButton).toHaveAttribute('aria-disabled', 'false');
  });
});
