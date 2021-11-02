import Form from './styles/Form';
import useForm from '../lib/useForm';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from './User';
import DisplayError from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export default function RequestReset() {
  const { inputs, handleChange, clearForm } = useForm({
    email: '',
  });
  const [resetPassword, { data, loading, error }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: {
        email: inputs.email,
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    await resetPassword();
  };

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Request a New Password</h2>
      <DisplayError error={error} />
      <fieldset aria-busy={loading} aria-disabled={loading} disabled={loading}>
        {data?.sendUserPasswordResetLink === null && (
          <p>
            Success! If the user {inputs.email} exist, we will send you a reset
            link.
          </p>
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
            disabled={data?.sendUserPasswordResetLink === null}
          />
        </label>
        <button
          type="submit"
          disabled={data?.sendUserPasswordResetLink === null}
        >
          Request Reset!
        </button>
      </fieldset>
    </Form>
  );
}
