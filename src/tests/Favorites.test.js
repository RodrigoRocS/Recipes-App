import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { favoriteRecipesMock } from './helpers/favsRecipesMock';
import LocalStorageMock from './helpers/mocks/mocksRecipeInProgress/LocalStorageMock';

// favoriteRecipes é a chave.

describe('Teste de comportamento do componente FavoriteRecipes', () => {
  const urlToPush = '/favorite-recipes';
  const perfilID = 'profile-top-btn';
  const tituloPag = 'page-title';
  const buttonAllId = 'filter-by-all-btn';
  const buttonMealsId = 'filter-by-meal-btn';
  const buttonDrinksId = 'filter-by-drink-btn';
  const mealsText = 'Spicy Arrabiata Penne';
  beforeEach(() => {
    global.localStorage = new LocalStorageMock();
    global.localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesMock));
  });

  test('Testa a renderização do componente Header na página Receitas Favoritas.', () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push(urlToPush));

    const perfil = screen.getByTestId(perfilID);
    const titulo = screen.getByTestId(tituloPag);

    expect(perfil).toBeInTheDocument();
    expect(titulo).toBeInTheDocument();
  });

  test('Testa a renderização dos botões de filtro da página.', () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push(urlToPush));

    const buttonAll = screen.getByTestId(buttonAllId);
    const buttonMeal = screen.getByTestId(buttonMealsId);
    const buttonDrink = screen.getByTestId(buttonDrinksId);

    expect(buttonAll).toBeInTheDocument();
    expect(buttonMeal).toBeInTheDocument();
    expect(buttonDrink).toBeInTheDocument();
  });
  test('Testa a renderização das receitas, com o Local Storage mockado.', () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push(urlToPush));

    const mealRecipes = screen.getAllByAltText('strMealThumb');
    const drinkRecipes = screen.getAllByAltText('strDrinkThumb');
    const shareButtons = screen.getAllByAltText('shareIcon');
    const heartButtons = screen.getAllByAltText('heartIcon');
    const mealText = screen.getByText(mealsText);
    const drinkText = screen.getByText('Aquamarine');

    expect(mealRecipes).toHaveLength(1);
    expect(drinkRecipes).toHaveLength(1);
    expect(shareButtons).toHaveLength(2);
    expect(heartButtons).toHaveLength(2);
    expect(mealText).toBeVisible();
    expect(drinkText).toBeVisible();
  });
  test('Testa a rotina: filtrar por meals, retirar a receita dos favoritos, desfiltrar.', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push(urlToPush));

    const buttonAll = screen.getByTestId(buttonAllId);
    const buttonMeal = screen.getByTestId(buttonMealsId);
    const mealText = screen.getByText(mealsText);
    const drinkText = screen.getByText('Aquamarine');

    expect(drinkText).toBeVisible();
    expect(mealText).toBeVisible();
    userEvent.click(buttonMeal);

    expect(mealText).toBeVisible();
    expect(drinkText).not.toBeVisible();

    const heartButton = screen.getByAltText('heartIcon');
    expect(heartButton).toBeInTheDocument();
    userEvent.click(heartButton);
    waitFor(() => { expect(mealText).not.toBeVisible(); });

    userEvent.click(buttonAll);
    const drinkTextRebourned = screen.getByText('Aquamarine');
    waitFor(() => { expect(mealText).not.toBeVisible(); });

    expect(drinkTextRebourned).toBeInTheDocument();

    const heartButtonTwo = screen.getByAltText('heartIcon');
    expect(heartButtonTwo).toBeInTheDocument();
    userEvent.click(heartButton);
    waitFor(() => { expect(drinkTextRebourned).not.toBeVisible(); });
  });
  test('Testa a rotina: filtrar por drinks, retirar a receita dos favoritos, desfiltrar.', async () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push(urlToPush));

    const buttonAll = screen.getByTestId(buttonAllId);
    const buttonDrink = screen.getByTestId(buttonDrinksId);
    const mealText = screen.getByText(mealsText);
    const drinkText = screen.getByText('Aquamarine');

    expect(drinkText).toBeVisible();
    expect(mealText).toBeVisible();
    expect(buttonDrink).toBeVisible();
    userEvent.click(buttonDrink);

    const drinkTextTwo = screen.getByText('Aquamarine');
    waitFor(() => { expect(mealText).not.toBeVisible(); });
    expect(drinkTextTwo).toBeVisible();

    const heartButton = screen.getByAltText('heartIcon');
    expect(heartButton).toBeInTheDocument();
    userEvent.click(heartButton);
    waitFor(() => { expect(drinkText).not.toBeVisible(); });

    userEvent.click(buttonAll);
    const mealTextRebourned = screen.getByText(mealsText);

    expect(mealTextRebourned).toBeInTheDocument();

    const heartButtonTwo = screen.getByAltText('heartIcon');
    expect(heartButtonTwo).toBeInTheDocument();
    userEvent.click(heartButton);
    waitFor(() => { expect(mealTextRebourned).not.toBeVisible(); });
  });

  test('Testa o funcionamento do share da meal', async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(),
      },
    });

    const { history } = renderWithRouter(<App />);

    act(() => history.push(urlToPush));

    const shareToClick = screen.getByTestId('0-horizontal-share-btn');

    expect(shareToClick).toBeInTheDocument();
    userEvent.click(shareToClick);
    const shareText = await screen.findByText('Link copied!');
    expect(shareText).toBeVisible();
  });
  test('Testa o funcionamento do share do drink', async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(),
      },
    });

    const { history } = renderWithRouter(<App />);

    act(() => history.push(urlToPush));

    const shareToClick = screen.getByTestId('1-horizontal-share-btn');

    expect(shareToClick).toBeInTheDocument();
    userEvent.click(shareToClick);
    const shareText = await screen.findByText('Link copied!');
    expect(shareText).toBeVisible();
  });
});
