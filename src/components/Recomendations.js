import { useRouteMatch } from 'react-router-dom';
import React, { useEffect } from 'react';
import useFetch from '../hooks/useFetch';

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

  console.log(recipeDataRec);

  return (
    <div />
  );
}

export default Recomendations;
