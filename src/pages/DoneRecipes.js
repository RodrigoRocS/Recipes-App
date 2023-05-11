import React, { useContext } from 'react';
import Header from '../components/Header';
import CardDoneRecipes from '../components/CardDoneRecipes';
import DoneRecipesContext from '../contexts/useDoneRecipesContext';

function DoneRecipes() {
  const {
    handleButton,
  } = useContext(DoneRecipesContext);

  return (
    <div>
      <Header title="Done Recipes" search={ false } />
      <button
        data-testid="filter-by-all-btn"
        value="all"
        onClick={ ({ target: { value } }) => handleButton(value) }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        value="meal"
        onClick={ ({ target: { value } }) => handleButton(value) }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        value="drink"
        onClick={ ({ target: { value } }) => handleButton(value) }
      >
        Drinks
      </button>
      <div>
        <CardDoneRecipes />
      </div>
    </div>
  );
}

export default DoneRecipes;
