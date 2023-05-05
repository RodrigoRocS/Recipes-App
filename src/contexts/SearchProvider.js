import PropTypes from 'prop-types';
import { useState, useMemo } from 'react';
import SearchContext from './SearchContext';

export default function SearchProvider({ children }) {
  const [searchName, setSearchName] = useState();
  const [searchType, setSearchType] = useState();

  const values = useMemo(() => ({
    searchName,
    setSearchName,
    searchType,
    setSearchType,
  }), [
    searchName,
    setSearchName,
    searchType,
    setSearchType,
  ]);

  return (
    <SearchContext.Provider value={ values }>
      { children }
    </SearchContext.Provider>
  );
}

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
