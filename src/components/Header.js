import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, search }) {
  const [searchBar, setSearchBar] = useState(false);
  console.log(searchBar);

  if (search) {
    return (
      <div>
        <Link to="/profile">
          <img src={ profileIcon } alt="" data-testid="profile-top-btn" />
        </Link>
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
        { searchBar === true ? <SearchBar /> : null }
        <h1 data-testid="page-title">{ title }</h1>
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
