import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

function Recipes() {
  const history = useHistory();
  const location = history.location.pathname;
  const [fetchData, data, isLoading] = useFetch([]);
  const [recipeArrays, setRecipeArrays] = useState({ firstTwelve: [], remaining: [] });
  // const [isSearch, setIsSearch] = useState({ isSearching: false });
  const [categoryArray, setCategoryArray] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const maxcategory = 4;
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

  const handleCategoryClick = (arg) => {
    console.log(arg);
    setSelectedCategory(arg);
  };
  useEffect(() => {
    const fetchCategoryList = async () => {
      if (location === '/drinks') {
        await fetchData('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const data2 = await response.json();
        setCategoryArray(data2.drinks);
      }
      if (location === '/meals') {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        const data2 = await response.json();
        setCategoryArray(data2.meals);
        fetchData('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      }
    };

    fetchCategoryList();
  }, [fetchData, location]);

  useEffect(() => {
    const resp = handleArray(data);
    console.log(resp);
    setRecipeArrays(resp);
  }, [handleArray, data]);

  return (
    <div>
      <button
        onClick={ () => handleCategoryClick('all') }
        data-testid="All-category-filter"
      >
        All
      </button>
      {
        isLoading ? <p />
          : categoryArray.length > 0 && categoryArray.map((item, index) => (
            index <= maxcategory && (
              <button
                onClick={ () => handleCategoryClick(`${item.strCategory}`) }
                key={ index }
                data-testid={ `${item.strCategory}-category-filter` }
              >
                {item.strCategory}
              </button>
            )
          ))
      }
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
                  <Link to={ `/meals/${item.idMeal}` }>
                    <img
                      id={ index }
                      src={ item.strMealThumb }
                      alt="strMealThumb"
                      data-testid={ `${index}-card-img` }
                    />
                    <div data-testid={ `${index}-card-name` }>{item.strMeal}</div>
                  </Link>
                ) : (
                  <Link to={ `/drinks/${item.idDrink}` }>
                    <img
                      id={ index }
                      src={ item.strDrinkThumb }
                      alt="strDrinkThumb"
                      data-testid={ `${index}-card-img` }
                    />
                    <div data-testid={ `${index}-card-name` }>{item.strDrink}</div>
                  </Link>
                )
              }
            </div>
          ))
      }
    </div>
  );
}
export default Recipes;
