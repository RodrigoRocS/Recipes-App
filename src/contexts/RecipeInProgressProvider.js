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
import { setDoneRecipes } from '../services/DoneRecipesLocalStorage';

const MEALS_API = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

const DRINKS_API = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const timeCopy = 5000;

function RecipeInProgressProvider({ children }) {
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [checkboxesState, setCheckboxesState] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pathname, setPathname] = useState();
  const recipeObj = recipe[0];
  const {
    idMeal,
    idDrink,
    strArea,
    strCategory,
    strMeal,
    strDrink,
    strMealThumb,
    strDrinkThumb,
    strAlcoholic,
    strTags,
  } = recipeObj !== undefined && recipeObj;

  useEffect(() => {
    const path = pathname !== undefined && pathname;
    const id = path.toString().replace(/\D/g, '');
    const initialFetch = async () => {      
      if (/meals/.test(path)) {
        const response = await fetch(`${MEALS_API}${id}`);
        const data = await response.json();
        const { meals } = data;
        setRecipe(meals);
      } else {
        const response = await fetch(`${DRINKS_API}${id}`);
        const data = await response.json();
        const { drinks } = data;
        setRecipe(drinks);
      }
    };
    id && initialFetch();
  }, [pathname]);

  // ESTE BLOCO SETA OS ESTADOS INICIAIS PRA LÓGICA DE INGREDIENTES CHECKADOS

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

    const ingredientValues = Object.values(ingredientes)
      .filter((ingredient) => ingredient !== null);
    const measureValues = Object.values(measures)
      .filter((measure) => measure !== null);

    const mergedIngredients = ingredientValues
      .map((ingredient, index) => (`${ingredient} - ${measureValues[index]}`));
    const formatIngredients = mergedIngredients
      .filter((ingredient) => ingredient !== ' -  ')
      .filter((ingredient2) => ingredient2 !== ' - ');

    setIngredients(formatIngredients);

    if (localRecipes[idMeal || idDrink]) {
      setCheckboxesState(localRecipes[idMeal || idDrink]);
      return;
    }

    const objCheckboxState = formatIngredients.reduce((acc, ingredient) => {
      acc[ingredient] = false;
      return acc;
    }, {});

    setCheckboxesState(objCheckboxState);
  }, [idDrink, idMeal, recipe.length, recipeObj]);

  useEffect(() => {
    saveCheckboxStates();
  }, [saveCheckboxStates]);

  // ============ ESTE BLOCO LIDA COM A LÓGICA DOS CHECKBOXS ================

  const handleChecks = useCallback(({ target }) => {
    setCheckboxesState({
      ...checkboxesState,
      [target.name]: target.checked,
    });
  }, [checkboxesState]);

  useEffect(() => {
    if (!idMeal && !idDrink) return;
    setRecipesInProgress(idMeal || idDrink, checkboxesState);
  }, [checkboxesState, idDrink, idMeal]);

  // ========= ESTE BLOCO LIDA COM A LÓGICA DE FAVORITAR RECEITAS ===========

  const handleFavoriteRecipes = useCallback(() => {
    const localRecipes = getFavoriteRecipes();
    const verify = localRecipes.some((receita) => receita.id === idMeal || idDrink);
    if (verify) {
      removeFavoriteRecipes(idMeal || idDrink);
      setIsFavorite(false);
      return;
    }

    const newRecipeObj = {
      id: idMeal || idDrink,
      type: idMeal ? 'meal' : 'drink',
      nationality: strArea || '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic || '',
      name: strMeal || strDrink,
      image: strMealThumb || strDrinkThumb,
    };
    setFavoriteRecipes(newRecipeObj);
    setIsFavorite(true);
  }, [
    idDrink,
    idMeal,
    strAlcoholic,
    strArea, strCategory, strDrink, strDrinkThumb, strMeal, strMealThumb]);

  useEffect(() => {
    const localRecipes = getFavoriteRecipes();
    const verify = localRecipes.some((receita) => receita.id === idMeal || idDrink);
    setIsFavorite(verify);
  }, [idDrink, idMeal]);

  // ======= ESTE BLOCO LIDA COM A LÓGICA DE COMPARTILHAR RECEITAS ==========

  const handleShareRecipes = useCallback(async () => {
    const path = pathname.replace("/in-progress", "");
    await navigator.clipboard.writeText(`http://localhost:3000${path}`);
    setCopied(true);
  }, [pathname]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, timeCopy);

    return () => clearTimeout(timer);
  }, [copied]);

  // ========================================================================
  
  const finishRecipe = () => {
    const newStrTags = strTags && strTags.split(",").map(palavra => palavra.trim());

    const newRecipeObj = {
      id: idMeal || idDrink,
      type: idMeal ? 'meal' : 'drink',
      nationality: strArea || '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic || '',
      name: strMeal || strDrink,
      image: strMealThumb || strDrinkThumb,
      tags: newStrTags || [],
      doneDate: new Date(),
    };

    setDoneRecipes(newRecipeObj);
  };

  // ========================================================================

  const values = useMemo(() => ({
    recipe,
    ingredients,
    handleChecks,
    checkboxesState,
    handleFavoriteRecipes,
    isFavorite,
    handleShareRecipes,
    copied,
    setPathname,
    finishRecipe,
  }), [
    recipe,
    ingredients,
    handleChecks,
    checkboxesState,
    handleFavoriteRecipes,
    isFavorite,
    handleShareRecipes,
    copied,
    setPathname,
    finishRecipe,
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
