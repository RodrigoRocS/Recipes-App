import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, search }) {
  const [searchBar, setSearchBar] = useState(false);
  const handleClick = () => {
    setSearchBar(!searchBar ? searchBar : !searchBar);
  };

  if (search) {
    return (
      <div>
        <Link to="/">
          <img src={ profileIcon } alt="" data-testid="profile-top-btn" />
        </Link>
        { searchBar }
        ?
        <button
          type="submit"
          onClick={ handleClick }
        >
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt=""
          />
        </button>
        :
        <button
          type="submit"
          data-testid="search-top-btn"
          onClick={ handleClick }
        >
          <img
            src={ searchIcon }
            alt=""
          />
        </button>
        <h1> Colocar componente da barra de pesquisa </h1>
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
