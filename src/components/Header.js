import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../styles/Header.css';
import logoRecipesApp from '../dev_images/logoRecipesapp.svg';
import iconeRecipesApp from '../dev_images/iconeRecipesapp.svg';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

function Header({ title, search }) {
  const [searchBar, setSearchBar] = useState(false);

  if (search) {
    return (
      <div className="header-container">
        <div className="header-navbar">
          <div>
            <img alt="icone recipes app" src={ iconeRecipesApp } />

            <img alt="logo recipes app" src={ logoRecipesApp } />
          </div>

          <div>
            <button
              type="submit"
              onClick={ () => setSearchBar(!searchBar) }
            >
              <img
                data-testid="search-top-btn"
                src={ searchIcon }
                alt=""
              />
            </button>
            <Link to="/profile">
              <img src={ profileIcon } alt="" data-testid="profile-top-btn" />
            </Link>
          </div>
        </div>

        <div className="nav-logos-container">
          {
            title === 'Meals'
              ? <img alt="meals icon" src={ mealIcon } />
              : <img alt="drinks icon" src={ drinkIcon } />
          }
          <h1 data-testid="page-title">{ title }</h1>
        </div>

        { searchBar === true ? <SearchBar /> : null }

      </div>
    );
  }
  return (
    <div>
      <Link to="/">
        <img src={ profileIcon } alt="" data-testid="profile-top-btn" />
      </Link>
      <h1 data-testid="page-title">{ title }</h1>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
};

export default Header;
