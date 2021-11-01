import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

const update = (cache, payload) => {
  console.log(payload);
  console.log('running the update function');
  cache.evict(cache.identify(payload.data.deleteProduct));
};

const DeleteProduct = ({ children, id }) => {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
    update: update,
  });
  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => {
        if (confirm('Are you sure you want to delete this item?')) {
          // delete
          console.log('deleting');
          deleteProduct().catch((err) => alert(err.message));
        }
      }}
    >
      {children}
    </button>
  );
};

export default DeleteProduct;
