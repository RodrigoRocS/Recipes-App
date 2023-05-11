import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testes de comportamento da pagina Done-Recipes', () => {
  const elementos = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      doneDate: '23/06/2020',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      name: 'Spicy Arrabiata Penne',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      doneDate: '23/06/2020',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      name: 'Aquamarine',
      tags: [],
    },
  ];

  const ROUTE_DONE_RECIPES = '/done-recipes';

  beforeEach(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(elementos));
  });
  afterEach(() => {
    localStorage.clear();
  });
  test('Testa se os itens do localStorage são renderizados na tela ', () => {
    renderWithRouter(<App />, ROUTE_DONE_RECIPES);

    const firstElement = screen.getByRole('heading', {
      name: /Spicy Arrabiata Penne/i,
      level: 4,
    });
    const secondElement = screen.getByRole('heading', {
      name: /Aquamarine/i,
      level: 4,
    });
    expect(firstElement).toBeInTheDocument();
    expect(secondElement).toBeInTheDocument();
  });
  test('Testa se o botão renderizado na tela funciona ', async () => {
    renderWithRouter(<App />, ROUTE_DONE_RECIPES);

    const firstElement = screen.getByTestId('0-horizontal-share-btn');
    expect(firstElement).toBeInTheDocument();
    userEvent.click(firstElement);
    waitFor(() => {
      const spanElement = screen.getByRole('button', {
        name: /link copied/i,
        level: 4,
      });
      expect(spanElement).toBeInTheDocument();
    });
  });
  test('Testa se ao clicar na imagem é redirecionado para outra tela ', () => {
    const { history } = renderWithRouter(<App />, ROUTE_DONE_RECIPES);

    const firstElement = screen.getByRole('heading', {
      name: /Spicy Arrabiata Penne/i,
      level: 4,
    });
    expect(firstElement).toBeInTheDocument();
    userEvent.click(firstElement);
    expect(history.location.pathname).toEqual('/meals/52771');
  });
  test('Testa se ao clicar em um filtro de meals o elemento de drinks desaparece ', async () => {
    renderWithRouter(<App />, ROUTE_DONE_RECIPES);

    const firstElement = screen.getByRole('button', {
      name: /meals/i,
    });
    const secondElement = screen.getByRole('heading', {
      name: /Aquamarine/i,
      level: 4,
    });
    expect(secondElement).toBeInTheDocument();
    userEvent.click(firstElement);
    waitFor(() => {
      expect(secondElement).not.toBeInTheDocument();
    });
  });
  test('Testa se ao clicar em um filtro de drinks o elemento de meals desaparece ', async () => {
    renderWithRouter(<App />, ROUTE_DONE_RECIPES);

    const firstElement = screen.getByRole('button', {
      name: /drinks/i,
    });
    const secondElement = screen.getByRole('heading', {
      name: /Spicy Arrabiata Penne/i,
      level: 4,
    });
    expect(secondElement).toBeInTheDocument();
    userEvent.click(firstElement);
    waitFor(() => {
      expect(secondElement).not.toBeInTheDocument();
    });
  });
  test('Testa se ao clicar em all todos os filtros desaparecem ', async () => {
    renderWithRouter(<App />, ROUTE_DONE_RECIPES);

    const firstElement = screen.getByRole('button', {
      name: /drinks/i,
    });
    const allButton = screen.getByRole('button', {
      name: /all/i,
    });
    const secondElement = screen.getByRole('heading', {
      name: /Spicy Arrabiata Penne/i,
      level: 4,
    });
    expect(secondElement).toBeInTheDocument();
    userEvent.click(firstElement);

    expect(secondElement).not.toBeInTheDocument();
    userEvent.click(allButton);

    waitFor(() => {
      expect(secondElement).toBeInTheDocument();
    });
  });
});
