import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
//   const mockStorage = [{alcoholicOrNot:"Alcoholic",
// category: "Ordinary Drin",
// id: "11002"}]
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [updatedList, setupdatedList] = useState([]);
  const localFavoritesRecipes = localStorage.getItem('favoriteRecipes');
  if (!localFavoritesRecipes) return [];
  const data = JSON.parse(localFavoritesRecipes);
  const handleButton = (type) => {
    setSelectedCategory(type);
    if (selectedCategory === 'all') {
      setupdatedList(data);
    }
    setupdatedList(data.filter((item) => item.type === selectedCategory));
  };

  // http://localhost:3000/meals/52977
  const handleShare = (id, type) => {
    navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);
  };

  const handleFavorite = (id) => {
    const deleteFav = data.filter((item) => item.id === id);
    localStorage.removeItem(deleteFav);
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
      { updatedList ? null : updatedList.map((item, index) => (
        <div
          key={ index }
        >
          {
            item.type === 'meal' ? (
              <div>
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
                <button
                  onClick={ () => handleShare(item.id, item.type) }
                  data-testid={ `${index}-horizontal-share-btn` }
                >
                  <img
                    src={ shareIcon }
                    alt=""
                  />
                </button>
                <button
                  onClick={ () => handleFavorite(item.id) }
                  data-testid={ `${index}-horizontal-favorite-btn` }
                >
                  <img
                    src={ blackHeartIcon }
                    alt=""
                  />
                </button>
              </div>
            ) : (
              <div>
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
                <button
                  onClick={ () => handleShare(item.id, item.type) }
                  data-testid={ `${index}-horizontal-share-btn` }
                >
                  <img
                    src={ shareIcon }
                    alt=""
                  />
                </button>
                <button
                  onClick={ () => haldleFavorite(item.id, item.type) }
                  data-testid={ `${index}-horizontal-favorite-btn` }
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
      <Link to="/{drinks or meals}/:id">
        <img src={ profileIcon } alt="" data-testid="profile-top-btn" />
      </Link>
    </div>
  );
}

export default FavoriteRecipes;
