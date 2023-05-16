import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchCard from '../components/SearchCard';
import '../styles/Recipes.css';
import allIcon from '../dev_images/All.svg';
import beefIcon from '../dev_images/Beef.svg';
import goatIcon from '../dev_images/Goat.svg';
import chickenIcon from '../dev_images/Chicken.svg';
import breakfastIcon from '../dev_images/Breakfast.svg';
import dessertIcon from '../dev_images/Dessert.svg';
import allIcon2 from '../dev_images/All2.svg';
import drinkIcon from '../dev_images/Ordinary Drink.svg';
import cocktailIcon from '../dev_images/Cocktail.svg';
import cocoaIcon from '../dev_images/Cocoa.svg';
import otherIcon from '../dev_images/Other Unknown.svg';
import shakeIcon from '../dev_images/Shake.svg';
import CardRecipeGeneric from '../components/CardRecipeGeneric';
import SearchContext from '../contexts/SearchContext';

function Recipes() {
  const local = useLocation();
  const path = local.pathname;
  const rightPath = path.charAt(1).toUpperCase() + path.substring(2, path.length);

  const history = useHistory();
  const location = history.location.pathname;
  const [isLoading, setisLoading] = useState({ isLoading: false });
  const [categoryArray, setCategoryArray] = useState([]);
  const [cardArray, setCardArray] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const { isSearch } = useContext(SearchContext);
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

  const mealsImages = [beefIcon, goatIcon, chickenIcon, breakfastIcon, dessertIcon];
  const drinkImages = [drinkIcon, cocktailIcon, cocoaIcon, otherIcon, shakeIcon];

  console.log(drinkImages);

  return (
    <div className="recipes-page-container">
      <Header title={ rightPath } search />

      <SearchCard />

      <div className="recipes-category-btns-container">
        <button
          onClick={ () => handleCategoryClick('All') }
          data-testid="All-category-filter"
        >
          {
            location === '/meals'
              ? <img alt="all icon" src={ allIcon } />
              : <img alt="all drinks icon" src={ allIcon2 } />
          }
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
                  <img
                    alt={ item.strCategory }
                    src={
                      location === '/meals'
                        ? mealsImages.find((icon) => icon.includes(item.strCategory))
                        : drinkImages.find((icon) => icon
                          .includes(item.strCategory/* .split('')[0] */))
                    }
                  />
                </button>
              )))
        }
      </div>

      <div className="show-cards-container">
        {
          cardArray.length > 0 && cardArray.map((item, index) => (index <= maxcard && (
            location === '/meals'
              ? (
                <CardRecipeGeneric
                  key={ index }
                  item={ item }
                  index={ index }
                  type="meals"
                />
              ) : (
                <CardRecipeGeneric
                  key={ index }
                  item={ item }
                  index={ index }
                  type="drinks"
                />
              ))))
        }
      </div>
      <Footer />
    </div>
  );
}
export default Recipes;
