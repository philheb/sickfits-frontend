import { styled } from 'styled-components';

const Dot = styled.div`
  background: var(--red);
  color: white;
`;

export default function CartCount({ count }) {
  return <Dot>{count}</Dot>;
}
