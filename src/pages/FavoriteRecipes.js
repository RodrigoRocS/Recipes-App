import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [updatedList, setupdatedList] = useState([]);
  const [listAll, setListAll] = useState([]);
  const [isSpanw, setisSpanw] = useState(false);

  useEffect(() => {
    const localFavoritesRecipes = localStorage.getItem('favoriteRecipes');
    const data = JSON.parse(localFavoritesRecipes);
    setupdatedList(data);
    setListAll(data);
  }, []);

  const handleButton = (type) => {
    if (type === 'all') {
      console.log('chamo');
      return setupdatedList(listAll);
    }
    setupdatedList(listAll.filter((item) => item.type === type));
  };
  const handleShare = (id, type) => {
    navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);
    setisSpanw(!isSpanw);
  };

  const handleFavorite = (id) => {
    const deleteFav = listAll.filter((item) => item.id !== id);
    const newFavorite = [...deleteFav];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
    setListAll(deleteFav);
    setupdatedList(deleteFav);
  };

  return (
    <div>
      <Header title="Favorite Recipes" search={ false } />
      <button
        data-testid="filter-by-all-btn"
        onClick={ () => handleButton('all') }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ () => handleButton('meal') }
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => handleButton('drink') }
      >
        Drinks
      </button>
      { isSpanw ? <span>Link copied!</span> : <p />}
      { updatedList.length === 0 ? <p /> : updatedList.map((item, index) => (
        <div
          key={ index }
        >
          {
            item.type === 'meal' ? (
              <div>
                <Link to={ `/meals/${item.id}` }>
                  <img
                    className="img"
                    id={ index }
                    src={ item.image }
                    alt="strMealThumb"
                    data-testid={ `${index}-horizontal-image` }
                  />
                  <h4 data-testid={ `${index}-horizontal-name` }>{ item.name }</h4>
                  <h4
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    { `${item.nationality} - ${item.category}` }
                  </h4>
                </Link>
                <button
                  onClick={ () => handleShare(item.id, item.type) }
                  data-testid={ `${index}-horizontal-share-btn` }
                  type="submit"
                  src={ shareIcon }
                >
                  <img
                    src={ shareIcon }
                    alt=""
                  />
                </button>
                <button
                  onClick={ () => handleFavorite(item.id) }
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  type="submit"
                  src={ blackHeartIcon }
                >
                  <img
                    src={ blackHeartIcon }
                    alt=""
                  />
                </button>
              </div>
            ) : (
              <div>
                <Link to={ `/drinks/${item.id}` }>
                  <img
                    className="img"
                    id={ index }
                    src={ item.image }
                    alt="strDrinkThumb"
                    data-testid={ `${index}-horizontal-image` }
                  />
                  <h4 data-testid={ `${index}-horizontal-name` }>{ item.name }</h4>
                  <h4
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    { item.alcoholicOrNot }
                  </h4>
                </Link>
                <button
                  onClick={ () => handleShare(item.id, item.type) }
                  data-testid={ `${index}-horizontal-share-btn` }
                  type="submit"
                  src={ shareIcon }
                >
                  <img
                    src={ shareIcon }
                    alt=""
                  />
                </button>
                <button
                  onClick={ () => handleFavorite(item.id) }
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  type="submit"
                  src={ blackHeartIcon }
                >
                  <img
                    src={ blackHeartIcon }
                    alt=""
                  />
                </button>
              </div>
            )
          }
        </div>
      ))}
    </div>
  );
}

export default FavoriteRecipes;
