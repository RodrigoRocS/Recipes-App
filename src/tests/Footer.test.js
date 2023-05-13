import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterRecipesApp from './helpers/renderWithRouterRecipesApp';
import App from '../App';

describe('Testes de comportamento do componente Footer', () => {
  test('Testa se os links do footer estão redirecionando', () => {
    const { history } = renderWithRouterRecipesApp(<App />, '/drinks');

    console.log(history.location.pathname);

    expect(screen.getByTestId('footer')).toBeInTheDocument();

    const mealsBtn = screen.getByTestId('meals-bottom-btn');
    userEvent.click(mealsBtn);
    expect(history.location.pathname).toBe('/meals');

    const drinksBtn = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinksBtn);
    expect(history.location.pathname).toBe('/drinks');
  });
});
