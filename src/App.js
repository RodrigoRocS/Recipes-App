import React from 'react';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import RecipesDetails from './pages/RecipesDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';
import UseDoneRecipesProvider from './contexts/useDoneRecipesProvider';

function App() {
  return (
    <div>
      <UseDoneRecipesProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/drinks" component={ Recipes } />
          <Route exact path="/meals" component={ Recipes } />
          <Route exact path="/drinks/:id" component={ RecipesDetails } />
          <Route exact path="/meals/:id" component={ RecipesDetails } />
          <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
          <Route exact path="/meals/:id/in-progress" component={ RecipeInProgress } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
          <Route exact path="/profile" component={ Profile } />
        </Switch>
      </UseDoneRecipesProvider>
    </div>
  );
}

export default App;
