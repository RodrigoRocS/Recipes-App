import React from 'react';
import { useHistory } from 'react-router-dom';
import useGetFormsContext from '../hooks/useGetFormContext';

function Login() {
  const {
    email,
    password,
    isValid,
    handlePassword,
    handleEmail } = useGetFormsContext();

  const history = useHistory();

  const handleSubmit = (emailValue) => {
    const saveLocalStorage = { email: emailValue };
    localStorage.setItem('user', JSON.stringify(saveLocalStorage));
    history.push('/meals');
  };

  return (
    <form onSubmit={ () => handleSubmit(email) }>
      <input
        type="email"
        id="email-input"
        value={ email }
        data-testid="email-input"
        placeholder="Insira seu email"
        onChange={ ({ target: { value } }) => handleEmail(value) }
      />
      <input
        type="password"
        id="password-input"
        value={ password }
        data-testid="password-input"
        placeholder="Insira seu password"
        onChange={ ({ target: { value } }) => handlePassword(value) }
      />
      <button
        id="submit-btn"
        value="email"
        data-testid="login-submit-btn"
        disabled={ isValid }
      >
        Entrar

      </button>

    </form>
  );
}

export default Login;
