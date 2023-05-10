import React, { useEffect } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Recomendations from '../components/Recomendations';

function RecipeDetails() {
  const { id } = useParams();
  const match = useRouteMatch(['/meals', '/drinks']);
  const path = match?.path;
  const [fetchRecipeId, recipeDataId, isFetchRecipeIdLoading] = useFetch([]);

  useEffect(() => {
    const MEALSID_URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const DRINKSID_URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    if (path === '/meals') {
      fetchRecipeId(MEALSID_URL);
    } else {
      fetchRecipeId(DRINKSID_URL);
    }
  }, [fetchRecipeId, id, path]);

  const takeIngredients = () => {
    if (!isFetchRecipeIdLoading) {
      const recipe = recipeDataId;
      const recipeObj = path === '/meals'
        ? recipeDataId?.meals?.[0] : recipeDataId?.drinks?.[0];

      const ingredientes = recipe?.length !== 0 && Object.keys(recipeObj)
        .filter((el) => el.includes('strIngredient'))
        .reduce((obj, el) => {
          obj[el] = recipeObj[el];
          return obj;
        }, {});

      const measures = recipe?.length !== 0 && Object.keys(recipeObj)
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
      return formatIngredients;
    }
  };

  const ingredients = takeIngredients();

  const recipeImg = path === '/meals'
    ? recipeDataId?.meals?.[0]?.strMealThumb : recipeDataId?.drinks?.[0]?.strDrinkThumb;
  const recipeTitle = path === '/meals'
    ? recipeDataId?.meals?.[0]?.strMeal : recipeDataId?.drinks?.[0]?.strDrink;
  const recipeCategory = path === '/meals'
    ? recipeDataId?.meals?.[0]?.strCategory : recipeDataId?.drinks?.[0]?.strAlcoholic;
  const recipeInstructions = path === '/meals'
    ? recipeDataId?.meals?.[0]
      ?.strInstructions : recipeDataId?.drinks?.[0]?.strInstructions;

  const MN = -11;
  return (
    <div>
      <h1 data-testid="recipe-title">{ recipeTitle }</h1>
      <img src={ recipeImg } alt="" data-testid="recipe-photo" width="350px" />
      <p data-testid="recipe-category">{recipeCategory}</p>
      <ol>
        { ingredients?.map((e, i) => (
          <li key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>{ e }</li>
        )) }
      </ol>
      <span data-testid="instructions">{recipeInstructions}</span>
      {path === '/meals' && (
        <iframe
          data-testid="video"
          width="560"
          height="315"
          src={ `https://www.youtube.com/embed/${recipeDataId?.meals?.[0]?.strYoutube.slice(MN)}` }
          title={ recipeTitle }
          allow="accelerometer;
          autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
      <Recomendations />
    </div>
  );
}

export default RecipeDetails;
