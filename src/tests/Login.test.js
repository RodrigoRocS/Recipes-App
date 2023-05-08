import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import GetFormsProvider from '../context/GetFormsProvider';

describe('Teste da pagina Login', () => {
  test('O input de Email é renderizado nela', () => {
    renderWithRouter(<App />);
    const emailElement = screen.getByRole('textbox', {
      name: /Email/i,
    });
    expect(emailElement).toBeInTheDocument();
  });
  test('O input de Password é renderizado nela', () => {
    renderWithRouter(<App />);
    const passwordElement = screen.getByLabelText(/senha:/i);
    expect(passwordElement).toBeInTheDocument();
  });
  test('Se existe um botão para entrar e ele está desabilitado', () => {
    renderWithRouter(
      <GetFormsProvider>
        <App />
      </GetFormsProvider>,
    );
    const buttonElement = screen.getByRole('button', {
      name: /entrar/i,
    });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toBeDisabled();
  });
  test('Se após digitar dados válidos o botão é liberado e se após o click é redirecionado para a pagina de receitas', async () => {
    const { history } = renderWithRouter(
      <GetFormsProvider>
        <App />
      </GetFormsProvider>,
    );
    const emailElement = screen.getByRole('textbox', {
      name: /Email/i,
    });
    const passwordElement = screen.getByLabelText(/senha:/i);
    const buttonElement = screen.getByRole('button', {
      name: /entrar/i,
    });

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toBeDisabled();

    userEvent.type(emailElement, 'teste@teste.com');
    userEvent.type(passwordElement, '1234567');
    expect(buttonElement).toBeEnabled();
    userEvent.click(buttonElement);

    expect(history.location.pathname).toEqual('/meals');
  });
});
