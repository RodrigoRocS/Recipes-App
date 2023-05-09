import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import RecipeInProgressContext from './RecipeInProgressContext';
import {
  getRecipesInProgress,
  setRecipesInProgress,
} from '../services/RecipeInProgressLocalStorage';
import {
  getFavoriteRecipes,
  removeFavoriteRecipes,
  setFavoriteRecipes,
} from '../services/FavoriteRecipesLocalStorage';

const RECIPES_API = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const RECIPE_ID = '53071';

/* const DRINKS_API = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
const DRINK_ID = '11002'; */

function RecipeInProgressProvider({ children }) {
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [checkboxesState, setCheckboxesState] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const recipeObj = recipe[0];
  const {
    idMeal,
    strArea,
    strCategory,
    strMeal,
    strMealThumb,
  } = recipeObj !== undefined && recipeObj;

  useEffect(() => {
    const initialFetch = async () => {
      const response = await fetch(`${RECIPES_API}${RECIPE_ID}`);
      const data = await response.json();
      const { meals, drinks } = data;
      setRecipe(meals || drinks);
    };
    initialFetch();
  }, []);

  // ESTE TRECHO SETA OS ESTADOS INICIAIS PARA TRABALHAR A LÓGICA DE INGREDIENTES CHECKADOS.

  const saveCheckboxStates = useCallback(() => {
    const localRecipes = getRecipesInProgress();

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

    if (localRecipes[idMeal]) {
      setCheckboxesState(localRecipes[idMeal]);
      return;
    }

    const objCheckboxState = formatIngredients.reduce((acc, ingredient) => {
      acc[ingredient] = false;
      return acc;
    }, {});

    setCheckboxesState(objCheckboxState);
  }, [idMeal, recipe.length, recipeObj]);

  useEffect(() => {
    saveCheckboxStates();
  }, [saveCheckboxStates]);

  // ========================================================================

  const handleChecks = useCallback(({ target }) => {
    setCheckboxesState({
      ...checkboxesState,
      [target.name]: target.checked,
    });
  }, [checkboxesState]);

  useEffect(() => {
    if (!idMeal) return;
    setRecipesInProgress(idMeal, checkboxesState);
  }, [checkboxesState, idMeal]);

  // ========= ESTE BLOCO LIDA COM A LÓGICA DE FAVORITAR RECEITAS ===========

  const handleFavoriteRecipes = useCallback(() => {
    const localRecipes = getFavoriteRecipes();
    const verify = localRecipes.some((receita) => receita.id === idMeal);
    if (verify) {
      removeFavoriteRecipes(idMeal);
      setIsFavorite(false);
      return;
    }
    const newRecipeObj = {
      id: idMeal,
      type: 'meal',
      nationality: strArea,
      category: strCategory,
      alcoholicOrNot: false,
      name: strMeal,
      image: strMealThumb,
    };
    setFavoriteRecipes(newRecipeObj);
    setIsFavorite(true);
  }, [idMeal, strArea, strCategory, strMeal, strMealThumb]);

  useEffect(() => {
    const localRecipes = getFavoriteRecipes();
    const verify = localRecipes.some((receita) => receita.id === idMeal);
    setIsFavorite(verify);
  }, [idMeal]);

  // ========================================================================

  const values = useMemo(() => ({
    recipe,
    ingredients,
    handleChecks,
    checkboxesState,
    handleFavoriteRecipes,
    isFavorite,
  }), [
    recipe,
    ingredients,
    handleChecks,
    checkboxesState,
    handleFavoriteRecipes,
    isFavorite,
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
