import React, { useContext, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import SearchContext from '../contexts/SearchContext';

function SearchBar() {
  const location = useLocation();
  const path = location.pathname;

  const {
    searchName,
    setSearchName,
    searchType,
    setSearchType,
    setFetchRequest,
    recipes,
    setIsSearch,
  } = useContext(SearchContext);

  const history = useHistory();

  const handleClick = () => {
    if (searchType === 'firstLetter' && searchName.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else { setFetchRequest({ type: searchType, name: searchName, path }); }
    setSearchName('');
    setIsSearch(true);
  };

  useEffect(() => {
    if (recipes?.drinks?.length === 1) {
      history.push(`/drinks/${recipes?.drinks[0].idDrink}`);
    }
    if (recipes?.meals?.length === 1) {
      history.push(`/meals/${recipes?.meals[0].idMeal}`);
    }
    if (recipes?.drinks === null || recipes?.meals === null
      || recipes?.ingredients === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      console.log('fui chamado');
    }
  }, [recipes, history, path]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        data-testid="search-input"
        value={ searchName }
        onChange={ ({ target }) => setSearchName(target.value) }
      />
      <label>
        <input
          type="radio"
          name="search"
          data-testid="ingredient-search-radio"
          value="ingredient"
          checked={ searchType === 'ingredient' }
          onChange={ ({ target }) => setSearchType(target.value) }
        />
        Ingredient
      </label>
      <label>
        <input
          type="radio"
          name="search"
          data-testid="name-search-radio"
          value="name"
          checked={ searchType === 'name' }
          onChange={ ({ target }) => setSearchType(target.value) }
        />
        Name
      </label>
      <label>
        <input
          type="radio"
          name="search"
          data-testid="first-letter-search-radio"
          value="firstLetter"
          checked={ searchType === 'firstLetter' }
          onChange={ ({ target }) => setSearchType(target.value) }
        />
        First Letter
      </label>
      <button
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        SEARCH

      </button>
    </div>
  );
}

export default SearchBar;
