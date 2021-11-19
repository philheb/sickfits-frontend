import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import DisplayError from './ErrorMessage';

const ORDER_QUERY = gql`
  query ORDER_QUERY($id: ID!) {
    order: Order(where: { id: $id }) {
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

export default function Order({ id }) {
  const { loading, error, data } = useQuery(ORDER_QUERY, {
    variables: { id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  return (
    <div>
      order component {id} {data?.order.total}
    </div>
  );
}
