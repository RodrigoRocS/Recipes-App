import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import RecipeInProgressContext from '../contexts/RecipeInProgressContext';
import useFetch from '../hooks/useFetch';
import Recomendations from '../components/Recomendations';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';
import unfavoriteIcon from '../images/blackHeartIcon.svg';
import './RecipesDetails.css';
import { getRecipesInProgress } from '../services/RecipeInProgressLocalStorage';

function RecipeDetails() {
  const { id } = useParams();
  const match = useRouteMatch(['/meals', '/drinks']);
  const location = useLocation();
  const pathName = location.pathname;
  const history = useHistory();
  const path = match?.path;
  const [fetchRecipeId, recipeDataId, isFetchRecipeIdLoading] = useFetch([]);
  const [isDone, setIsDone] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  const {
    handleFavoriteRecipes,
    isFavorite,
    handleShareRecipes,
    copied,
    setPathname,
  } = useContext(RecipeInProgressContext);

  useEffect(() => {
    const MEALSID_URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const DRINKSID_URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    if (path === '/meals') {
      fetchRecipeId(MEALSID_URL);
    } else {
      fetchRecipeId(DRINKSID_URL);
    }
  }, [fetchRecipeId, id, path]);

  useEffect(() => {
    setIsDone(JSON.parse(localStorage.getItem('doneRecipes'))
      ?.some((e) => e.id === id));
  }, [id]);

  useEffect(() => {
    const inProgressRecipes = getRecipesInProgress();
    const inProgressKey = Object.keys(inProgressRecipes).some((e) => {
      const recipeInProgress = inProgressRecipes[e];
      return Object.keys(recipeInProgress).length !== 0;
    });
    setInProgress(inProgressKey);
  }, [id]);

  useEffect(() => {
    setPathname(history.location.pathname);
  }, [history.location.pathname, setPathname]);

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
      <img src={ recipeImg } alt="" data-testid="recipe-photo" width="100%" />
      {copied && <span>Link copied!</span>}
      <div>
        <button
          data-testid="share-btn"
          onClick={ handleShareRecipes }
        >
          <img src={ shareIcon } alt="share icon" />
        </button>

        <button
          data-testid="favorite-btn"
          onClick={ handleFavoriteRecipes }
          src={ isFavorite ? unfavoriteIcon : favoriteIcon }
        >
          {isFavorite
            ? <img src={ unfavoriteIcon } alt="unfavorite icon" />
            : <img src={ favoriteIcon } alt="favorite icon" />}
        </button>
      </div>
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
          width="100%"
          height="240"
          src={ `https://www.youtube.com/embed/${recipeDataId?.meals?.[0]?.strYoutube.slice(MN)}` }
          title={ recipeTitle }
          allow="accelerometer;
          autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
      <Recomendations />
      {!isDone && (
        <button
          onClick={ () => history.push(`${pathName}/in-progress`) }
          data-testid="start-recipe-btn"
          className="btn-start-recipe"
        >
          {inProgress ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      )}
    </div>
  );
}

export default RecipeDetails;
