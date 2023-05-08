import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import RecipeInProgressContext from './RecipeInProgressContext';
import setRecipesInProgress from '../services/RecipeInProgressLocalStorage';

const RECIPE_ID = '53071';

function RecipeInProgressProvider({ children }) {
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [checkboxesState, setCheckboxesState] = useState({}); // Receberá update para que o initial state venha do localStore.
  const recipeObj = recipe[0];

  useEffect(() => {
    const initialFetch = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${RECIPE_ID}`);
      const data = await response.json();
      const { meals } = data;
      setRecipe(meals);
    };
    initialFetch();
  }, []);

  // ESTE TRECHO SETA OS ESTADOS INICIAIS PARA TRABALHAR A LÓGICA DE INGREDIENTES CHECKADOS.

  const saveCheckboxStates = useCallback(() => {
    const ingredientes = recipe.length !== 0 && Object.keys(recipeObj)
      .filter((el) => el.includes('strIngredient'))
      .reduce((obj, el) => {
        obj[el] = recipeObj[el];
        return obj;
      }, {});

    const measures = recipe.length !== 0 && Object.keys(recipeObj)
      .filter((el) => el.includes('strMeasure'))
      .reduce((obj, el) => {
        obj[el] = recipeObj[el];
        return obj;
      }, {});

    const ingredientValues = Object.values(ingredientes);
    const measureValues = Object.values(measures);

    const mergedIngredients = ingredientValues
      .map((ingredient, index) => (`${ingredient} - ${measureValues[index]}`));
    const formatIngredients = mergedIngredients
      .filter((ingredient) => ingredient !== ' -  ');

    setIngredients(formatIngredients);

    const objCheckboxState = formatIngredients.reduce((acc, ingredient) => {
      acc[ingredient] = false;
      return acc;
    }, {});

    setCheckboxesState(objCheckboxState);
  }, [recipe.length, recipeObj]);

  useEffect(() => {
    saveCheckboxStates();
  }, [saveCheckboxStates]);

  // ========================================================================

  const handleChecks = useCallback(({ target }) => {
    const { strMeal } = recipeObj;
    setCheckboxesState({
      ...checkboxesState,
      [target.name]: target.checked,
    });
    setRecipesInProgress(strMeal, checkboxesState);
  }, [checkboxesState, recipeObj]);

  // ========================================================================

  const values = useMemo(() => ({
    recipe,
    ingredients,
    handleChecks,
    checkboxesState,
  }), [
    recipe,
    ingredients,
    handleChecks,
    checkboxesState,
  ]);

  return (
    <RecipeInProgressContext.Provider value={ values }>
      {children}
    </RecipeInProgressContext.Provider>
  );
}

RecipeInProgressProvider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default RecipeInProgressProvider;
