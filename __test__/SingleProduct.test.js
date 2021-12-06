import SingleProduct, { SINGLE_ITEM_QUERY } from '../components/SingleProduct';
import { fakeItem } from '../lib/testUtils';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';

const product = fakeItem();
const mocks = [
  {
    request: {
      query: SINGLE_ITEM_QUERY,
      variables: {
        id: '123',
      },
    },
    result: {
      data: {
        Product: product,
      },
    },
  },
];

describe('<SingleProduct />', () => {
  it('renders with proper data', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks}>
        <SingleProduct id="123" />
      </MockedProvider>
    );
    // Wait for the test id to show up (data-testid attribute on the rendering components (ProductStyles))
    await screen.findByTestId('singleProduct');
    expect(container).toMatchSnapshot();
  });

  it('Errors out when an item is no found', async () => {
    const errorMocks = [
      {
        request: {
          query: SINGLE_ITEM_QUERY,
          variables: {
            id: '123',
          },
        },
        result: {
          errors: [{ message: 'Item not found!!!' }],
        },
      },
    ];

    const { container, debug } = render(
      <MockedProvider mocks={errorMocks}>
        <SingleProduct id="123" />
      </MockedProvider>
    );
    await screen.findByTestId('graphql-error');
    expect(container).toHaveTextContent('Shoot!');
    expect(container).toHaveTextContent('Item not found!!!');
  });
});
