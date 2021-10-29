import { useState, useEffect } from 'react';

export default function useForm(initial = {}, loading) {
  // create a state object for our inputs
  const [inputs, setInputs] = useState(initial);
  const initialValues = Object.values(initial).join('');

  useEffect(() => {
    setInputs(initial);
  }, [initialValues]);

  const handleChange = (e) => {
    let { value, name, type, files } = e.target;
    if (type === 'number') {
      value = parseInt(value);
    }
    if (type === 'file') {
      value = files[0];
    }
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  }

  //TODO: return the things we want to surface from this custom hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
