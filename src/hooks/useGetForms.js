import { useCallback, useEffect, useState } from 'react';

function GetForms() {
  const [isValid, setIsValid] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlePassword = (value) => setPassword(value);
  const handleEmail = (value) => setEmail(value);

  const validateForm = useCallback(() => {
    const minCharPassword = 6;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (re.test(email) && password.length >= minCharPassword) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [email, password]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  return {
    password,
    email,
    isValid,
    handlePassword,
    handleEmail,
  };
}

export default GetForms;
