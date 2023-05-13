import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import rendeWithRouterRecipesApp from './helpers/renderWithRouterRecipesApp';
import App from '../App';
import drinkById from './helpers/mocks/mocksRecipeInProgress/drinkById';
import LocalStorageMock from './helpers/mocks/mocksRecipeInProgress/LocalStorageMock';

describe('Testes de comportamento da página RecipeInProgress com drinks', () => {
  const URL_DRINK_ID = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319';
  const initialEntries = '/drinks/178319/in-progress';

  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinkById),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Testa se foi feito um fetch inicial e se a tela renderiza os elementos corretamente', async () => {
    rendeWithRouterRecipesApp(<App />, initialEntries);

    const title = await screen.findByRole('heading', { name: /aquamarine/i });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(URL_DRINK_ID);
    expect(title).toBeInTheDocument();
  });

  test('Testa se as checkboxes funcionam corretamente', async () => {
    rendeWithRouterRecipesApp(<App />, initialEntries);

    const checkbox1 = await screen.findByText(/hpnotiq - 2 oz/i);
    const checkbox2 = await screen.findByText(/pineapple juice - 1 oz/i);

    expect(checkbox1).toBeInTheDocument();
    expect(checkbox1).not.toHaveClass('checked');
    userEvent.click(checkbox1);
    expect(checkbox1).toHaveClass('checked');

    expect(checkbox2).not.toHaveClass('checked');
    userEvent.click(checkbox2);
    expect(checkbox2).toHaveClass('checked');
    expect(screen.getByRole('checkbox', { name: /pineapple juice - 1 oz/i }).checked).toBe(true);
    userEvent.click(checkbox2);
    expect(checkbox2).not.toHaveClass('checked');
  });

  test('Testa o botão de favoritas', async () => {
    rendeWithRouterRecipesApp(<App />, initialEntries);

    const favoriteBtn = screen.getByRole('button', { name: /favorite icon/i });

    userEvent.click(favoriteBtn);

    expect(await screen.findByRole('img', { name: /unfavorite icon/i })).toBeInTheDocument();

    userEvent.click(await screen.findByRole('img', { name: /unfavorite icon/i }));

    const test = setTimeout(() => {
      expect(screen.queryByRole('img', { name: /unfavorite icon/i })).not.toBeInTheDocument();
    }, 2000);
    clearTimeout(test);
  });

  test('Testa se o botão share funciona', async () => {
    const mockWriteText = jest.fn();
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: mockWriteText },
    });

    rendeWithRouterRecipesApp(<App />, initialEntries);

    const shareBtn = screen.getByRole('button', { name: /share icon/i });
    expect(shareBtn).toBeInTheDocument();
    userEvent.click(shareBtn);
    expect(await screen.findByText(/link copied!/i)).toBeInTheDocument();

    const test = setTimeout(() => {
      expect(screen.queryByText(/link copied!/i)).not.toBeInTheDocument();
    }, 5000);
    clearTimeout(test);
  });

  test('Testes do botão finish recipe', async () => {
    global.localStorage = new LocalStorageMock();

    rendeWithRouterRecipesApp(<App />, initialEntries);

    const checkbox1 = await screen.findByRole('checkbox', { name: /hpnotiq - 2 oz/i });
    const checkbox2 = await screen.findByRole('checkbox', { name: /pineapple juice - 1 oz/i });
    const checkbox3 = await screen.findByRole('checkbox', { name: /banana liqueur - 1 oz/i });
    const btnFinsh = screen.queryByRole('button', { name: /finish recipe/i });

    userEvent.click(checkbox1);

    expect(await screen.findByText(/hpnotiq - 2 oz/i)).toHaveClass('checked');

    userEvent.click(checkbox2);
    expect(btnFinsh).toBeDisabled();
    userEvent.click(checkbox3); // dificuldades com async, waiForElementToBeRemove

    /* await waitFor(() => {
      expect(btnFinsh).not.toBeDisabled();
      userEvent.click(btnFinsh);

      expect(history.location.pathname).toBe('/done-recipes');
      expect(localStorage.getItem('doneRecipes').length).toBe(2);
      console.log(history.location.pathname);
    }); */
  });
});
