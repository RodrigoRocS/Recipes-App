import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import useDoneRecipes from '../hooks/useDoneRecipes';
import DoneRecipesContext from './useDoneRecipesContext';

function UseDoneRecipesProvider({ children }) {
  const {
    handleShare,
    handleButton,
    updatedList,
    isSpanw,
  } = useDoneRecipes();

  const context = useMemo(() => ({
    handleShare,
    handleButton,
    updatedList,
    isSpanw,
  }), [
    handleShare,
    handleButton,
    updatedList,
    isSpanw,
  ]);

  return (
    <DoneRecipesContext.Provider value={ context }>
      {children}
    </DoneRecipesContext.Provider>

  );
}

UseDoneRecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default UseDoneRecipesProvider;
