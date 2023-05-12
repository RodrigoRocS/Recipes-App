import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import rendeWithRouter from './helpers/renderWithRouter';
import App from '../App';
import drinkById from './helpers/mocks/mocksRecipeInProgress/drinkById';
import RecipeInProgressProvider from '../contexts/RecipeInProgressProvider';

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
    rendeWithRouter(
      <RecipeInProgressProvider>
        <App />
      </RecipeInProgressProvider>,
      initialEntries,
    );

    const title = await screen.findByRole('heading', { name: /aquamarine/i });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(URL_DRINK_ID);
    expect(title).toBeInTheDocument();
  });

  test('Testa se as checkboxes funcionam corretamente', async () => {
    rendeWithRouter(
      <RecipeInProgressProvider>
        <App />
      </RecipeInProgressProvider>,
      initialEntries,
    );

    waitFor(() => {
      const checkbox1 = screen.getByRole('checkbox', { name: /hpnotiq - 2 oz/i });
      const checkbox2 = screen.getByText(/pineapple juice - 1 oz/i);

      expect(checkbox1).toBeInTheDocument();
      expect(checkbox1).not.toHaveClass('checked');
      userEvent.click(checkbox1);
      expect(checkbox1).toHaveClass('checked');

      expect().toBeInTheDocument();
      expect(checkbox2).not.toHaveClass('checked');
      userEvent.click(checkbox2);
      expect(checkbox2).toHaveClass('checked');
      userEvent.click(checkbox2);
      expect(checkbox2).not.toHaveClass('checked');
    });
  });

  test('Testa se o botão share funciona', async () => {
    const mockWriteText = jest.fn();
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: mockWriteText },
    });

    rendeWithRouter(
      <RecipeInProgressProvider>
        <App />
      </RecipeInProgressProvider>,
      initialEntries,
    );

    waitFor(() => {
      const shareBtn = screen.getByRole('button', { name: /share icon/i });
      expect(shareBtn).toBeInTheDocument();
      userEvent.click(shareBtn);
      expect(screen.getByText(/link copied!/i)).toBeInTheDocument();
      expect(screen.getByText(/link copied!/i)).not.toBeInTheDocument();
    });
  });
});

/* class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock; essa linha fica no before each */
