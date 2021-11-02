import Form from './styles/Form';
import useForm from '../lib/useForm';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from './User';
import DisplayError from './ErrorMessage';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $token: String!
    $password: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;

export default function Reset({ token }) {
  const { inputs, handleChange, clearForm } = useForm({
    email: '',
    password: '',
  });
  const [reset, { data, loading, error }] = useMutation(RESET_MUTATION, {
    variables: {
      email: inputs.email,
      password: inputs.password,
      token: token,
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await reset();
    console.log(res);
    clearForm();
  };

  const successfulError = data?.redeemUserPasswordResetToken?.code
    ? {
        message:
          'The link used to reset your password is incorrect or expired.',
      }
    : undefined;

  if (error) {
    console.log(error.message);
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Change Your Password</h2>
      <DisplayError error={error || successfulError} />
      <fieldset aria-busy={loading} aria-disabled={loading} disabled={loading}>
        {data?.redeemUserPasswordResetToken === null && (
          <p>Success! Your password as been changed.</p>
        )}
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          New Password
          <input
            type="password"
            name="password"
            placeholder="Your New Password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button
          type="submit"
          disabled={data?.sendUserPasswordResetLink === null}
        >
          Submit!
        </button>
      </fieldset>
    </Form>
  );
}
