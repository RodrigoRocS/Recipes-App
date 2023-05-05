import React from 'react';

function SearchBar() {
  return (
    <div>
      <input type="text" placeholder="Search" />
      <label htmlFor="">
        <input type="radio" name="search" data-testid="ingredient-search-radio" />
        Ingredient
      </label>
      <label htmlFor="">
        <input type="radio" name="search" data-testid="name-search-radio" />
        Name
      </label>
      <label htmlFor="">
        <input type="radio" name="search" data-testid="first-letter-search-radio" />
        First Letter
      </label>
      <button data-testid="exec-search-btn">SEARCH</button>
    </div>
  );
}

export default SearchBar;
