import { useRouteMatch } from 'react-router-dom';
import React, { useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import './Recomendations.css';

function Recomendations() {
  const match = useRouteMatch(['/meals', '/drinks']);
  const path = match?.path;
  const [fetchRecipeRec, recipeDataRec] = useFetch([]);

  useEffect(() => {
    const MEALSRECOMENDATION_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const DRINKSRECOMENDATION_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    if (path === '/meals') {
      fetchRecipeRec(DRINKSRECOMENDATION_URL);
    } else {
      fetchRecipeRec(MEALSRECOMENDATION_URL);
    }
  }, [path, fetchRecipeRec]);

  const pathName = path === '/meals' ? 'drinks' : 'meals';
  const MN = 6;
  const sixRecom = recipeDataRec[pathName]?.slice(0, MN);

  return (
    <div className="recommendations-container">
      <h2>Recommended</h2>
      {sixRecom?.map((recipe, index) => (
        <div
          key={ pathName === 'meals' ? recipe.idMeal : recipe.idDrink }
          className="recommendation-card"
          data-testid={ `${index}-recommendation-card` }
        >
          <img
            width="100%"
            data-testid={ `${index}-card-img` }
            src={ pathName === 'meals' ? recipe.strMealThumb : recipe.strDrinkThumb }
            alt={ pathName === 'meals' ? `Imagem do prato 
            ${recipe.strMeal}` : `Imagem da bebida ${recipe.strDrink}` }
          />
          <p data-testid={ `${index}-recommendation-title` }>
            { pathName === 'meals' ? recipe.strMeal : recipe.strDrink }
          </p>
        </div>
      ))}
    </div>
  );
}

export default Recomendations;
