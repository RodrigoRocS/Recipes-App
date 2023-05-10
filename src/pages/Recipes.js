import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

function Recipes() {
  const history = useHistory();
  const location = history.location.pathname;
  const [fetchData, data, isLoading] = useFetch([]);
  const [recipeArrays, setRecipeArrays] = useState({ firstTwelve: [], remaining: [] });

  const handleArray = useCallback((arr) => {
    const MN = 12;
    const recipeType = location === '/meals' ? 'meals' : 'drinks';
    if (!Array.isArray(arr[recipeType]) || arr[recipeType].length <= 1) {
      return { firstTwelve: [], remaining: [] };
    }
    const firstTwelve = arr[recipeType].slice(0, MN);
    const remaining = arr[recipeType].slice(MN);

    return { firstTwelve, remaining };
  }, [location]);

  useEffect(() => {
    if (location === '/drinks') {
      fetchData('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    }
    if (location === '/meals') {
      fetchData('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    }
  }, [fetchData, location]);

  useEffect(() => {
    const resp = handleArray(data);
    setRecipeArrays(resp);
  }, [handleArray, data]);

  return (
    <div>
      {
        isLoading ? <>loading</>
          : recipeArrays.firstTwelve.length > 0
          && recipeArrays.firstTwelve.map((item, index) => (
            <div
              key={ index }
              data-testid={ `${index}-recipe-card` }
            >
              {
                location === '/meals' ? (

                  <>
                    <img
                      id={ index }
                      src={ item.strMealThumb }
                      alt="strMealThumb"
                      data-testid={ `${index}-card-img` }
                    />
                    <div data-testid={ `${index}-card-name` }>{item.strMeal}</div>

                  </>

                ) : (

                  <>
                    <img
                      id={ index }
                      src={ item.strDrinkThumb }
                      alt="strDrinkThumb"
                      data-testid={ `${index}-card-img` }
                    />
                    <div data-testid={ `${index}-card-name` }>{item.strDrink}</div>

                  </>

                )
              }
            </div>
          ))
      }
    </div>
  );
}
export default Recipes;
