import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeInProgressContext from '../contexts/RecipeInProgressContext';
import IngredientsList from '../components/IngredientsList';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';
import unfavoriteIcon from '../images/blackHeartIcon.svg';

function RecipeInProgress() {
  const {
    recipe,
    handleFavoriteRecipes,
    isFavorite,
    handleShareRecipes,
    copied,
    checkboxesState,
    setPathname,
    finishRecipe,
  } = useContext(RecipeInProgressContext);

  const {
    strMeal,
    strDrink,
    strCategory,
    strMealThumb,
    strDrinkThumb,
    strInstructions,
  } = recipe.length !== 0 && recipe[0];

  const history = useHistory();
  useEffect(() => {
    setPathname(history.location.pathname);
  }, [history.location.pathname, setPathname]);

  const checkboxesValue = Object.values(checkboxesState);

  const handleFinshRecipe = () => {
    finishRecipe();
    history.push('/done-recipes')
  }

  return (
    <div>
      <div>
        <img
          data-testid="recipe-photo"
          alt="recipe-ilustration"
          src={ strMealThumb || strDrinkThumb }
        />
        <h2 data-testid="recipe-title">{ strMeal || strDrink }</h2>
        <span data-testid="recipe-category">{ strCategory }</span>
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
      </div>

      <div>
        Ingredients
        <IngredientsList />
      </div>

      <div>
        <span data-testid="instructions">{ strInstructions }</span>
      </div>

      <button
        data-testid="finish-recipe-btn"
        disabled={ !checkboxesValue.every((check) => check === true) }
        onClick={ handleFinshRecipe }
      >
        Finish Recipe
      </button>
    </div>
  );
}

export default RecipeInProgress;
