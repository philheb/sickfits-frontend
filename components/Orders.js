import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import DisplayError from './ErrorMessage';
import styled from 'styled-components';
import OrderItemStyles from './styles/OrderItemStyles';
import Link from 'next/link';
import formatMoney from '../lib/formatMoney';
import Head from 'next/head';

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    allOrders {
      id
      charge
      total
      user {
        id
      }
      items {
        id
        name
        description
        photo {
          altText
          image {
            publicUrlTransformed
          }
        }
        price
        quantity
      }
    }
  }
`;

const OrderUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 4rem;
`;

function countItems(order) {
  return order.items.reduce((tally, item) => {
    return tally + item.quantity;
  }, 0);
}

export default function Orders() {
  const { loading, error, data } = useQuery(USER_ORDERS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  const { allOrders } = data;
  return (
    <div>
      <Head>
        <title>Your Orders ({allOrders.length})</title>
      </Head>
      <h2>You have {allOrders.length} orders!</h2>
      <OrderUl>
        {allOrders.map((order) => (
          <OrderItemStyles key={order.id}>
            <Link href={`/order/${order.id}`}>
              <a>
                <div className="order-meta">
                  <p>
                    {countItems(order)} item{countItems(order) > 1 ? 's' : ''}
                  </p>
                  <p>
                    {order.items.length} product
                    {order.items.length > 1 ? 's' : ''}
                  </p>
                  <p>{formatMoney(order.total)}</p>
                </div>
                <div className="images">
                  {order.items.map((item) => (
                    <img
                      src={item.photo?.image?.publicUrlTransformed}
                      alt={item.photo.altText}
                      key={item.id}
                    />
                  ))}
                </div>
              </a>
            </Link>
          </OrderItemStyles>
        ))}
      </OrderUl>
    </div>
  );
}
