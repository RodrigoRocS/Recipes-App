import React, { useContext } from 'react';
import RecipeInProgressContext from '../contexts/RecipeInProgressContext';
import IngredientsList from '../components/IngredientsList';

function RecipeInProgress() {
  const { recipe } = useContext(RecipeInProgressContext);
  const {
    strMeal,
    strCategory,
    /* strMealThumb, */
    strInstructions,
  } = recipe.length !== 0 && recipe[0];

  return (
    <div>
      <div>
        <img data-testid="recipe-photo" alt="recipe-ilustration" src="#" />
        <h2 data-testid="recipe-title">{ strMeal }</h2>
        <span data-testid="recipe-category">{ strCategory }</span>
      </div>

      <div>
        Ingredients
        <IngredientsList />
      </div>

      <div>
        <span data-testid="instructions">{ strInstructions }</span>
      </div>

      <button data-testid="finish-recipe-btn">Finish</button>

      <div>
        <button data-testid="share-btn">Share</button>
        <button data-testid="favorite-btn">Favorite</button>
      </div>
    </div>
  );
}

export default RecipeInProgress;
