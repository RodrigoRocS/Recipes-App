import React from 'react';
import Header from '../components/Header';
import SearchDoneRecipes from '../components/SearchDoneRecipes';

function DoneRecipes() {
  const handleDrinksFilter = () => DoneRecipes
    .filter((recipe) => (recipe.type === drinks));
  const handleMealsFilter = () => DoneRecipes
    .filter((recipe) => (recipe.type === meals));

  return (
    <div>
      <Header title="Done Recipes" search={ false } />
      <button
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      <div>
        <SearchDoneRecipes />
      </div>
    </div>
  );
}

export default DoneRecipes;
