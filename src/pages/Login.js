import React from 'react';
import { useHistory } from 'react-router-dom';
import useGetFormsContext from '../contexts/useGetFormContext';
import logo from '../dev_images/logoRecipesApp.svg';
import tomateImage from '../dev_images/tomate.svg';
import '../styles/Login.css';

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
    <div className="login-page-container">
      <img
        alt="recipes app logo"
        src={ logo }
        className="login-page-logo"
      />

      <img
        alt="tomatos background"
        src={ tomateImage }
        className="login-page-tomato-background"
      />

      <form onSubmit={ () => handleSubmit(email) }>
        <h3>Login</h3>

        <label htmlFor="email-input">
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
          <input
            type="password"
            id="password-input"
            value={ password }
            data-testid="password-input"
            placeholder="Password"
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
    </div>
  );
}

export default Login;
