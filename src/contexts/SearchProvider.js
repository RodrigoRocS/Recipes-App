import PropTypes from 'prop-types';
import SearchContext from './SearchContext';

export default function SearchProvider({ children }) {
  return (
    <SearchContext.Provider value={ values }>
      { children }
    </SearchContext.Provider>
  );
}

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
