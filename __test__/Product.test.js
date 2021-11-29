import { render, screen } from '@testing-library/react';
import Product from '../components/Product';
import { fakeItem } from '../lib/testUtils';
import { MockedProvider } from '@apollo/react-testing';

const product = fakeItem();

describe('<Product />', () => {
  it('renders out the price tag and title', () => {
    const { container, debug } = render(
      <MockedProvider>
        <Product product={product} />
      </MockedProvider>
    );

    const priceTag = screen.getByText('$50');
    expect(priceTag).toBeInTheDocument();

    const link = container.querySelector('a');
    expect(link).toHaveAttribute('href', `/product/${product.id}`);
    expect(link).toHaveTextContent(product.name);
  });
  //Snapshot methodology.
  // it('renders and matches the snapshot', () => {
  //   const { container, debug } = render(
  //     <MockedProvider>
  //       <Product product={product} />
  //     </MockedProvider>
  //   );
  //   expect(container).toMatchSnapshot();
  // });
  it('renders the image properly', () => {
    const { container, debug } = render(
      <MockedProvider>
        <Product product={product} />
      </MockedProvider>
    );
    const img = screen.getByAltText(product.name);
    expect(img).toBeInTheDocument();
  });
});
