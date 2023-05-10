import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import Recipes from '../pages/Recipes';
import renderWithRouter from './helpers/renderWithRouter';

describe('Recipes test', () => {
  afterEach(() => {
    window.fetch.mockRestore();
  });

  test('renders category buttons', async () => {
    renderWithRouter(
      <Recipes />,
    );
    const categoryButtons = await screen.findAllByTestId(/-category-filter$/);
    expect(categoryButtons).toHaveLength(6);
    expect(categoryButtons[0]).toHaveTextContent('All');
  });

  test('renders recipe cards', async () => {
    renderWithRouter(
      <Recipes />,
    );

    const recipeCards = await screen.findAllByTestId(/-recipe-card$/);
    expect(recipeCards).toHaveLength(12);
  });

  test('handles category click', async () => {
    renderWithRouter(
      <Recipes />,
    );

    const categoryButton = await screen.findByText('Beef');
    fireEvent.click(categoryButton);
    expect(window.fetch).toHaveBeenCalledTimes(2);
    expect(window.fetch).toHaveBeenCalledWith(
      'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef',
    );
  });
});
