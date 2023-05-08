import PropTypes from 'prop-types';
import { useState, useMemo, useEffect } from 'react';
import SearchContext from './SearchContext';
import useFetch from '../hooks/useFetch';

export default function SearchProvider({ children }) {
  const [searchName, setSearchName] = useState();
  const [searchType, setSearchType] = useState();
  const [fetchRequest, setFetchRequest] = useState({});

  const [fetchRecipe, recipeData, isFetchRecipeLoading] = useFetch([]);

  useEffect(() => {
    const { type, name, path } = fetchRequest;
    switch (type) {
    case 'ingredient':
      if (path === '/drinks') {
        fetchRecipe(`www.thecocktaildb.com/api/json/v1/1/search.php?i=${name}`);
      } else {
        fetchRecipe(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`);
      }
      break;
    case 'name':
      if (path === '/drinks') {
        fetchRecipe(`www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
      } else {
        fetchRecipe(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
      }
      break;
    case 'firstLetter':
      if (path === '/drinks') {
        fetchRecipe(`www.thecocktaildb.com/api/json/v1/1/search.php?f=${name}`);
      } else {
        fetchRecipe(`https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`);
      }
      break;
    default:
      break;
    }
  }, [fetchRecipe, fetchRequest]);

  const recipes = recipeData;

  const values = useMemo(() => ({
    searchName,
    setSearchName,
    searchType,
    setSearchType,
    fetchRecipe,
    isFetchRecipeLoading,
    recipes,
    fetchRequest,
    setFetchRequest,
  }), [
    searchName,
    setSearchName,
    searchType,
    setSearchType,
    fetchRecipe,
    isFetchRecipeLoading,
    recipes,
    fetchRequest,
    setFetchRequest,
  ]);

  return (
    <SearchContext.Provider value={ values }>
      { children }
    </SearchContext.Provider>
  );
}

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
