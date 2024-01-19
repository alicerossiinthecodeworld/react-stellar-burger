import { useState } from 'react';

interface InputValues {
  [key: string]: string;
}

function useForm(inputValues: InputValues = {}) {
  const [values, setValues] = useState<InputValues>(inputValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}

export const createSyntheticEvent = (name: string, value: string) => {
  return {
    target: { name, value } as HTMLInputElement
  } as React.ChangeEvent<HTMLInputElement>;
};


export default useForm;
