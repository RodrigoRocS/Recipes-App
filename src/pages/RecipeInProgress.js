/* eslint-disable react/jsx-max-depth */
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeInProgressContext from '../contexts/RecipeInProgressContext';
import IngredientsList from '../components/IngredientsList';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';
import unfavoriteIcon from '../images/blackHeartIcon.svg';
import '../styles/RecipeInProgress.css';

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
    history.push('/done-recipes');
  };

  return (
    <div className="recipe-in-progress-page-container">
      <header
        className="recipe-in-progress-header-container"
        style={ { backgroundImage: `url(${strMealThumb || strDrinkThumb})` } }
      >
        <img
          data-testid="recipe-photo"
          alt="recipe-ilustration"
          src={ strMealThumb || strDrinkThumb }
        />
        <div className="recipe-in-progress-header-btns-container">
          <h2 data-testid="recipe-title">{ strMeal || strDrink }</h2>

          <nav>
            <span data-testid="recipe-category">{ strCategory }</span>

            {copied && <span>Link copied!</span>}

            <button
              data-testid="share-btn"
              onClick={ handleShareRecipes }
            >
              {shareIcon && <img src={ shareIcon } alt="share icon" />}
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
          </nav>
        </div>
      </header>

      <div className="recipe-in-progress-ingredients-container">
        <h3>Ingredients</h3>
        <IngredientsList />
      </div>

      <div className="recipe-in-progress-instructions-container">
        <h3>Instructions</h3>
        <span data-testid="instructions">{ strInstructions }</span>
      </div>

      <button
        className="finish-recipe-btn"
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
