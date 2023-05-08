import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Teste de comportamento da página Profile', () => {
  test('Se possui três botões na tela ', () => {
    renderWithRouter(<App />, '/profile');
    const doneButton = screen.getByRole('button', {
      name: /done recipes/i,
    });
    const favoriteButton = screen.getByRole('button', {
      name: /favorite recipes/i,
    });
    const logoutButton = screen.getByRole('button', {
      name: /logout/i,
    });
    expect(doneButton).toBeInTheDocument();
    expect(favoriteButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });
  test('Se o botão de done recipes redireciona para rota `/done-recipes`', () => {
    const { history } = renderWithRouter(<App />, '/profile');
    const doneButton = screen.getByRole('button', {
      name: /done recipes/i,
    });
    userEvent.click(doneButton);
    expect(history.location.pathname).toEqual('/done-recipes');
  });
  test('Se o botão de favorites recipes redireciona para rota `/favorite-recipes`', () => {
    const { history } = renderWithRouter(<App />, '/profile');
    const favoriteButton = screen.getByRole('button', {
      name: /favorite recipes/i,
    });
    userEvent.click(favoriteButton);
    expect(history.location.pathname).toEqual('/favorite-recipes');
  });
  test('Se o botão de logout redireciona para rota `/` e limpa o localStorage', () => {
    localStorage.setItem('user', JSON.stringify({ email: 'test@test.com' }));

    const { history } = renderWithRouter(<App />, '/profile');
    const logoutButton = screen.getByRole('button', {
      name: /logout/i,
    });
    userEvent.click(logoutButton);
    expect(history.location.pathname).toEqual('/');
    expect(localStorage.length).toBe(0);
  });
  test('Se exibe o email salvo no localStorage', () => {
    const savedEmail = localStorage.setItem('user', JSON.stringify({ email: 'test@test.com' }));
    renderWithRouter(<App />, '/profile');
    const emailElement = screen.getByRole('heading', {
      name: savedEmail,
      level: 3,
    });
    expect(emailElement).toBeInTheDocument();
  });
});
