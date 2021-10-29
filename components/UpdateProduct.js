import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/client';
import { SINGLE_ITEM_QUERY } from './SingleProduct';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import Router from 'next/router';

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      price
      description
    }
  }
`;

const UpdateProduct = ({ id }) => {
  const { loading, error, data } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id },
  });

  const [
    updateProduct,
    { loading: updateLoading, error: updateError, data: updateData },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);

  const { inputs, handleChange, clearForm, resetForm } = useForm(
    data?.Product,
    loading
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await updateProduct({
          variables: {
            id,
            name: inputs.name,
            description: inputs.description,
            price: inputs.price,
          },
        });
        Router.push({
          pathname: `/product/${res.data.updateProduct.id}`,
        });
      }}
    >
      <DisplayError error={error || updateError} />
      <fieldset aria-busy={updateLoading} disabled={updateLoading}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        {inputs.name}
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Update Product</button>
      </fieldset>
    </Form>
  );
};

export default UpdateProduct;
