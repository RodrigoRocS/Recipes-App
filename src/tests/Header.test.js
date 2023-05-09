import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import SearchProvider from '../contexts/SearchProvider';

describe('Testes de comportamento do componente Header', () => {
  const perfilID = 'profile-top-btn';
  const searchID = 'search-top-btn';
  const tituloPag = 'page-title';

  test('Testa a renderização dos 3 componentes no Drinks', () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push('/drinks'));

    const perfil = screen.getByTestId(perfilID);
    const pesquisa = screen.getByTestId(searchID);
    const titulo = screen.getByTestId(tituloPag);

    // olhar se tem meals no titulo
    // olhar o header do drink
    expect(perfil).toBeInTheDocument();
    expect(pesquisa).toBeInTheDocument();
    expect(titulo).toBeInTheDocument();
  });
  test('Testa a renderização dos 3 componentes no Meals', () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push('/meals'));

    const perfil = screen.getByTestId(perfilID);
    const pesquisa = screen.getByTestId(searchID);
    const titulo = screen.getByTestId(tituloPag);

    // olhar se tem meals no titulo
    // olhar o header do drink
    expect(perfil).toBeInTheDocument();
    expect(pesquisa).toBeInTheDocument();
    expect(titulo).toBeInTheDocument();
  });
  test('Testa o funcionamento do botao perfil', () => {
    const { history } = renderWithRouter(<App />);

    act(() => history.push('/meals'));

    const perfil = screen.getByTestId('profile-top-btn');

    userEvent.click(perfil);
    expect(history.location.pathname).toBe('/profile');
  });
  test('Testa o funcionamento do botão pesquisa', async () => {
    const { history } = renderWithRouter(
      <SearchProvider>
        <App />
      </SearchProvider>,
    );

    act(() => history.push('/meals'));

    const pesquisa = screen.getByTestId('search-top-btn');
    userEvent.click(pesquisa);

    const barraDePesquisa = await screen.findByTestId('search-input');
    expect(barraDePesquisa).toBeVisible();

    userEvent.click(pesquisa);
    expect(barraDePesquisa).not.toBeVisible();
  });
});
