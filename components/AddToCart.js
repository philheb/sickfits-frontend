import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($productId: String!) {
    addToCart(productId: $productId) {
      id
    }
  
`;

const AddToCart = ({ id }) => {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id },
  });
  return <p>yo</p>;
};

export default AddToCart;
