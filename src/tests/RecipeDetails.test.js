import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
// import SearchProvider from '../contexts/SearchProvider';
// import GetFormsProvider from '../contexts/GetFormsProvider';
import RecipeInProgressProvider from '../contexts/RecipeInProgressProvider';
import mealById from './helpers/mocks/mocksRecipeInProgress/mealById';

describe('Testes da tela de detalhes da receita', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(mealById),
    }));
    renderWithRouter(
      <RecipeInProgressProvider>
        <App />
      </RecipeInProgressProvider>,
      '/meals/52771',
    );
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  test('Testa se a tela é renderizada corretamente', async () => {
    const detailsHeader = await screen.findByRole('heading', {
      name: /spicy arrabiata penne/i,
    });
    const ingredientList = await screen.findAllByTestId(/ingredient-name-and-measure$/);
    const videoElement = await screen.findByTitle(/spicy arrabiata penne/i);
    const recomendedElement = await screen.findByRole('heading', {
      name: /recommended/i,
    });
    const shareButton = await screen.findByRole('img', {
      name: /share icon/i,
    });
    const favButton = await screen.findByRole('img', {
      name: /favorite icon/i,
    });
    expect(ingredientList).toHaveLength(8);
    expect(detailsHeader).toBeInTheDocument();
    expect(videoElement).toBeInTheDocument();
    expect(recomendedElement).toBeInTheDocument();
    expect(favButton).toBeInTheDocument();
    expect(shareButton).toBeInTheDocument();
  });
//   test('Testa se a tela é renderizada corretamente', async () => {
//     const shareButton = await screen.findByRole('img', {
//       name: /share icon/i,
//     });
//     const favButton = await screen.findByRole('img', {
//       name: /favorite icon/i,
//     });
//     expect(favButton).toBeInTheDocument();
//     expect(shareButton).toBeInTheDocument();
//     userEvent.click(shareButton);
//     const copiedMsg = await screen.findByText(/link copied!/i);
//     expect(copiedMsg).toBeInTheDocument();
//   });
});
