import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import SearchProvider from '../contexts/SearchProvider';

describe('Testes de comportamento do componente SearchBar', () => {
  test('Testa se a barra de pesquisas é renderizada corretamente', () => {
    renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      '/meals',
    );
    const searchButton = screen.getByTestId('search-top-btn');
    userEvent.click(searchButton);
    const searchInput = screen.getByTestId('search-input');
    const ingredientRadius = screen.getByRole('radio', {
      name: /ingredient/i,
    });
    const nameRadius = screen.getByRole('radio', {
      name: /name/i,
    });
    const firstLetterRadius = screen.getByRole('radio', {
      name: /first letter/i,
    });
    expect(searchInput).toBeInTheDocument();
    expect(ingredientRadius).toBeInTheDocument();
    expect(nameRadius).toBeInTheDocument();
    expect(firstLetterRadius).toBeInTheDocument();
  });
  test('Testa se a barra de pesquisas funciona corretamente', () => {
    renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      '/meals',
    );
    const searchButton = screen.getByTestId('search-top-btn');
    userEvent.click(searchButton);
    const searchInput = screen.getByTestId('search-input');
    const ingredientRadius = screen.getByRole('radio', {
      name: /ingredient/i,
    });
    const nameRadius = screen.getByRole('radio', {
      name: /name/i,
    });
    const firstLetterRadius = screen.getByRole('radio', {
      name: /first letter/i,
    });
    userEvent.type(searchInput, 'lemon');
    expect(searchInput.value).toBe('lemon');
    userEvent.click(ingredientRadius);
    expect(ingredientRadius.checked).toBe(true);
    userEvent.click(nameRadius);
    expect(nameRadius.checked).toBe(true);
    userEvent.click(firstLetterRadius);
    expect(firstLetterRadius.checked).toBe(true);
  });
  test('Testa se dispara uma mensagem de erro quando digita mais de uma letra e faz a requisição em `First letter`', () => {
    jest.spyOn(global, 'alert').mockImplementation(() => {});
    renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      '/meals',
    );
    const topButton = screen.getByTestId('search-top-btn');
    userEvent.click(topButton);
    const searchInput = screen.getByTestId('search-input');
    const firstLetterRadius = screen.getByRole('radio', {
      name: /first letter/i,
    });
    const searchButton = screen.getByTestId('exec-search-btn');
    userEvent.type(searchInput, 'lem');
    userEvent.click(firstLetterRadius);
    userEvent.click(searchButton);
    expect(global.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });
  test('Se é enviado para outra rota quando só um elemento retorna da api', async () => {
    const { history } = renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      '/meals',
    );

    const topButton = screen.getByTestId('search-top-btn');
    userEvent.click(topButton);
    const searchInput = screen.getByTestId('search-input');
    const nameRadius = screen.getByRole('radio', {
      name: /name/i,
    });
    const execSearchBtn = screen.getByTestId('exec-search-btn');

    userEvent.type(searchInput, 'lemon');
    userEvent.click(nameRadius);
    userEvent.click(execSearchBtn);

    await waitFor(() => {
      expect(history.location.pathname).toEqual('/meals/53009');
    });
  });
  test('Se é enviado para outra rota quando só um elemento retorna da api na rota `/drink`', async () => {
    const { history } = renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      '/drinks',
    );

    const topButton = screen.getByTestId('search-top-btn');
    userEvent.click(topButton);
    const searchInput = screen.getByTestId('search-input');
    const nameRadius = screen.getByRole('radio', {
      name: /name/i,
    });
    const execSearchBtn = screen.getByTestId('exec-search-btn');

    userEvent.type(searchInput, 'gin tonic');
    userEvent.click(nameRadius);
    userEvent.click(execSearchBtn);

    await waitFor(() => {
      expect(history.location.pathname).toEqual('/drinks/178365');
    });
  });
  test('Se é renderizado o elemento na tela', async () => {
    renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      '/drinks',
    );

    const topButton = screen.getByTestId('search-top-btn');
    userEvent.click(topButton);
    const searchInput = screen.getByTestId('search-input');
    const ingredientRadius = screen.getByRole('radio', {
      name: /ingredient/i,
    });
    const execSearchBtn = screen.getByTestId('exec-search-btn');

    userEvent.type(searchInput, 'gin');
    userEvent.click(ingredientRadius);
    userEvent.click(execSearchBtn);

    await waitFor(() => {
      const apiImage = screen.getByRole('img', {
        name: /Imagem da bebida 3-Mile Long Island Iced Tea/i,
      });
      expect(apiImage).toBeInTheDocument();
    });
  });
  // test('Se apareece error quando a busca resulta em null', async () => {
  //   renderWithRouter(
  //     '/drinks',
  //   );

  //   const topButton = screen.getByTestId('search-top-btn');
  //   userEvent.click(topButton);
  //   const searchInput = screen.getByTestId('search-input');
  //   const ingredientRadius = screen.getByRole('radio', {
  //     name: /ingredient/i,
  //   });
  //   const execSearchBtn = screen.getByTestId('exec-search-btn');

  //   userEvent.type(searchInput, 'agua');
  //   userEvent.click(ingredientRadius);
  //   userEvent.click(execSearchBtn);

  //   await waitFor(() => {
  //     const alertMessage = 'Sorry, we haven\'t found any recipes for these filters.';
  //     expect(global.alert).toHaveBeenCalledWith(alertMessage);
  //   });
  // });
  test('Se é renderizado o elemento na tela', async () => {
    renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
      '/meals',
    );

    const topButton = screen.getByTestId('search-top-btn');
    userEvent.click(topButton);
    const searchInput = screen.getByTestId('search-input');
    const ingredientRadius = screen.getByRole('radio', {
      name: /ingredient/i,
    });
    const execSearchBtn = screen.getByTestId('exec-search-btn');

    userEvent.type(searchInput, 'gin');
    userEvent.click(ingredientRadius);
    userEvent.click(execSearchBtn);

    await waitFor(() => {
      const apiImage = screen.getByRole('img', {
        name: /Imagem da bebida 3-Mile Long Island Iced Tea/i,
      });
      expect(apiImage).toBeInTheDocument();
    });
  });
});
