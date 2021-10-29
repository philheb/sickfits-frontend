import SingleProduct from '../../components/SingleProduct';

const Product = ({ query }) => {
  return <SingleProduct id={query.id} />;
};

export default Product;
