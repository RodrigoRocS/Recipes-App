import React, { useContext } from 'react';
import RecipeInProgressContext from '../contexts/RecipeInProgressContext';
import '../styles/IngredientsList.css';

function IngredientsList() {
  const {
    ingredients,
    handleChecks,
    checkboxesState,
  } = useContext(RecipeInProgressContext);

  const checkboxValues = Object.values(checkboxesState);

  const mappedIngredients = ingredients.map((ingredient, index) => (
    <label
      key={ ingredient }
      data-testid={ `${index}-ingredient-step` }
      className={ checkboxValues[index] ? 'checked' : '' }
      htmlFor={ `${index}-ingredient-step` }
    >
      <input
        id={ `${index}-ingredient-step` }
        type="checkbox"
        name={ ingredient }
        onChange={ handleChecks }
        checked={ checkboxValues[index] }
      />
      { ingredient }
    </label>
  ));

  return (
    <div>
      { mappedIngredients }
    </div>
  );
}

export default IngredientsList;
