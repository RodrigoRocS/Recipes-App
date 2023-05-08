import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import SearchProvider from './contexts/SearchProvider';
import GetFormsProvider from './context/GetFormsProvider';
import RecipeInProgressProvider from './contexts/RecipeInProgressProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <SearchProvider>
      <GetFormsProvider>
        <RecipeInProgressProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </RecipeInProgressProvider>
      </GetFormsProvider>
    </SearchProvider>,
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
