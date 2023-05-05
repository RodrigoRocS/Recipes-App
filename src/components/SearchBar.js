import React, { useContext } from 'react';
import SearchContext from '../contexts/SearchContext';

function SearchBar() {
  const {
    searchName,
    setSearchName,
    searchType,
    setSearchType,

  } = useContext(SearchContext);

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
      <button data-testid="exec-search-btn">SEARCH</button>
    </div>
  );
}

export default SearchBar;
