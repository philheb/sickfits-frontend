import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import Nav from '../components/Nav';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser, fakeCartItem } from '../lib/testUtils';
import { CartStateProvider } from '../context/cartState';

// Logged Out
const notSignedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { authenticatedItem: null } },
  },
];

const signedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { authenticatedItem: fakeUser() } },
  },
];

const signedInMocksWithCartItems = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        authenticatedItem: fakeUser({
          cart: [fakeCartItem()],
        }),
      },
    },
  },
];

describe('<Nav />', () => {
  it('Renders a minimal nav when signed out', () => {
    const { container, debug } = render(
      <CartStateProvider>
        <MockedProvider mocks={notSignedInMocks}>
          <Nav />
        </MockedProvider>
      </CartStateProvider>
    );

    // Menu is ok
    expect(container).toHaveTextContent('Products');
    expect(container).toHaveTextContent('Sign In');

    // Links are ok
    const linkSignIn = screen.getByText('Sign In');
    expect(linkSignIn).toHaveAttribute('href', '/signin');
    const linkProducts = screen.getByText('Products');
    expect(linkProducts).toHaveAttribute('href', '/products');

    expect(container).toMatchSnapshot();
  });
  it('Renders a full nav when signed in', async () => {
    const { container, debug } = render(
      <CartStateProvider>
        <MockedProvider mocks={signedInMocks}>
          <Nav />
        </MockedProvider>
      </CartStateProvider>
    );
    await screen.findByText('Account');
    expect(container).toHaveTextContent('Sign out');
    expect(container).toHaveTextContent('My Cart');
    expect(container).toHaveTextContent('Sell');
    expect(container).toHaveTextContent('Orders');
    expect(container).toMatchSnapshot();
  });
  it('Renders the amount in the cart', async () => {
    const { container, debug } = render(
      <CartStateProvider>
        <MockedProvider mocks={signedInMocksWithCartItems}>
          <Nav />
        </MockedProvider>
      </CartStateProvider>
    );
    await screen.findByText('My Cart');
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
