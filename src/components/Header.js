import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, search }) {
  if (search) {
    return (
      <div>
        <img src={ profileIcon } alt="" data-testid="profile-top-btn" />
        <img src={ searchIcon } alt="" data-testid="search-top-btn" />
        <h1 data-testid="page-title">{ title }</h1>
      </div>
    );
  }
  return (
    <div>
      <img src={ profileIcon } alt="" data-testid="profile-top-btn" />
      <h1 data-testid="page-title">{ title }</h1>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
};
