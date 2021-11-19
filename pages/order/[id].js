import Order from '../../components/Order';

export default function order({ query }) {
  const { id } = query;
  return (
    <div>
      ORDER page
      <Order id={id} />
    </div>
  );
}
