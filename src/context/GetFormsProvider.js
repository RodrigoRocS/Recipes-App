import React, { createContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import GetForms from '../hooks/useGetForms';

export const GetFormsContext = createContext();

function GetFormsProvider({ children }) {
  const {
    email,
    password,
    isValid,
    handlePassword,
    handleEmail,
  } = GetForms();

  const context = useMemo(() => ({
    email,
    password,
    isValid,
    handlePassword,
    handleEmail,
  }), [
    email,
    password,
    isValid,
    handlePassword,
    handleEmail,
  ]);

  return (
    <GetFormsContext.Provider value={ context }>
      {children}
    </GetFormsContext.Provider>

  );
}

GetFormsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default GetFormsProvider;
