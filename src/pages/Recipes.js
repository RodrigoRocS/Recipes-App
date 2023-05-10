import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import '../styles/Recipes.css';

function Recipes() {
  const history = useHistory();
  const location = history.location.pathname;
  const [isLoading, setisLoading] = useState({ isLoading: false });
  const [categoryArray, setCategoryArray] = useState([]);
  const [cardArray, setCardArray] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const maxcategory = 4;
  const maxcard = 11;

  const handleCategoryClick = async (arg) => {
    if (location === '/meals') {
      if (arg === selectedCategory || arg === 'All') {
        console.log(arg);
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const data3 = await response.json();
        setCardArray(data3.meals);
        return setSelectedCategory('');
      } if (arg !== undefined) {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${arg}`);
        const data3 = await response.json();
        setCardArray(data3.meals);
        return setSelectedCategory(arg);
      }
    } if (location === '/drinks') {
      if (arg === selectedCategory || arg === 'All') {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const data3 = await response.json();
        console.log(data3);
        setCardArray(data3.drinks);
        return setSelectedCategory('');
      } if (arg !== undefined) {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${arg}`);
        const data3 = await response.json();
        setCardArray(data3.drinks);
        return setSelectedCategory(arg);
      }
    }
  };

  useEffect(() => {
    const handlefetch = async () => {
      if (location === '/drinks' && selectedCategory === undefined) {
        setisLoading(true);
        const respCardList = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const respCategoryList = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const data1 = await respCardList.json();
        const data2 = await respCategoryList.json();
        setCardArray(data1.drinks);
        setCategoryArray(data2.drinks);
        setisLoading(false);
      }
      if (location === '/meals' && selectedCategory === undefined) {
        setisLoading(true);
        const respCardList = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const respCategoryList = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        const data1 = await respCardList.json();
        const data2 = await respCategoryList.json();
        setCardArray(data1.meals);
        setCategoryArray(data2.meals);
        setisLoading(false);
      }
    };
    handlefetch();
  }, [location, selectedCategory]);

  return (
    <div>
      <button
        onClick={ () => handleCategoryClick('All') }
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
          : cardArray.length > 0
          && cardArray.map((item, index) => (
            index <= maxcard && (
              <div
                key={ index }
              >

                {
                  location === '/meals' ? (
                    <Link
                      to={ `/meals/${item.idMeal}` }
                      data-testid={ `${index}-recipe-card` }
                    >
                      <img
                        className="img"
                        id={ index }
                        src={ item.strMealThumb }
                        alt="strMealThumb"
                        data-testid={ `${index}-card-img` }
                      />
                      <div data-testid={ `${index}-card-name` }>{item.strMeal}</div>
                    </Link>
                  ) : (
                    <Link
                      to={ `/drinks/${item.idDrink}` }
                      data-testid={ `${index}-recipe-card` }
                    >
                      <img
                        className="img"
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
            )
          ))
      }
    </div>
  );
}
export default Recipes;
