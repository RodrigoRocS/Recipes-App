import React from 'react';
import { useHistory } from 'react-router-dom';
import useGetFormsContext from '../contexts/useGetFormContext';

function Login() {
  const {
    email,
    password,
    isValid,
    handlePassword,
    handleEmail } = useGetFormsContext() || {};

  const history = useHistory();

  const handleSubmit = (emailValue) => {
    const saveLocalStorage = { email: emailValue };
    localStorage.setItem('user', JSON.stringify(saveLocalStorage));
    history.push('/meals');
  };

  return (
    <form onSubmit={ () => handleSubmit(email) }>
      <label htmlFor="email-input">
        Email:
        <input
          type="email"
          id="email-input"
          value={ email }
          data-testid="email-input"
          placeholder="Email"
          onChange={ ({ target: { value } }) => handleEmail(value) }
        />
      </label>
      <label htmlFor="password-input">
        Senha:
        <input
          type="password"
          id="password-input"
          value={ password }
          data-testid="password-input"
          placeholder="Senha"
          onChange={ ({ target: { value } }) => handlePassword(value) }
        />
      </label>
      <button
        id="submit-btn"
        value="submit-btn"
        data-testid="login-submit-btn"
        disabled={ isValid }
      >
        Entrar

      </button>

    </form>
  );
}

export default Login;
