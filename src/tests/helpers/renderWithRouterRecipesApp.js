import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import SearchProvider from '../../contexts/SearchProvider';
import GetFormsProvider from '../../contexts/GetFormsProvider';
import RecipeInProgressProvider from '../../contexts/RecipeInProgressProvider';

const renderWithRouterRecipesApp = (component, route = '/') => {
  const history = createMemoryHistory({ initialEntries: [route] });
  return ({
    ...render(
      <SearchProvider>
        <GetFormsProvider>
          <RecipeInProgressProvider>
            <Router history={ history }>{component}</Router>
          </RecipeInProgressProvider>
        </GetFormsProvider>
      </SearchProvider>,
    ),
    history,
  });
};

export default renderWithRouterRecipesApp;
