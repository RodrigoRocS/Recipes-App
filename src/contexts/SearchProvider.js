import PropTypes from 'prop-types';
import { useState, useMemo, useEffect, useCallback } from 'react';
import SearchContext from './SearchContext';
import useFetch from '../hooks/useFetch';

export default function SearchProvider({ children }) {
  const [searchName, setSearchName] = useState('');
  const [searchType, setSearchType] = useState('');
  const [fetchRequest, setFetchRequest] = useState({});

  const [fetchRecipe, recipeData, isFetchRecipeLoading] = useFetch([]);

  useEffect(() => {
    const { type, name, path } = fetchRequest;
    switch (type) {
    case 'ingredient':
      if (path === '/drinks') {
        fetchRecipe(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}`);
      } else {
        fetchRecipe(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`);
      }
      break;
    case 'name':
      if (path === '/drinks') {
        fetchRecipe(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
      } else {
        fetchRecipe(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
      }
      break;
    case 'firstLetter':
      if (path === '/drinks') {
        fetchRecipe(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${name}`);
      } else {
        fetchRecipe(`https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`);
      }
      break;
    default:
      break;
    }
  }, [fetchRecipe, fetchRequest]);

  const recipes = recipeData;

  const handleArray = useCallback((arr) => {
    const { path } = fetchRequest;
    console.log(path);
    const MN = 12;
    const recipeType = path === '/meals' ? 'meals' : 'drinks';
    if (!Array.isArray(arr[recipeType]) || arr[recipeType].length <= 1) {
      return { firstTwelve: [], remaining: [] };
    }
    const firstTwelve = arr[recipeType].slice(0, MN);
    const remaining = arr[recipeType].slice(MN);

    return { firstTwelve, remaining };
  }, [fetchRequest]);

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
    handleArray,
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
    handleArray,
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
