import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [loginEmail, setLoginEmail] = useState('');
  const [passoword, setPassoword] = useState('');
  const [button, setButton] = useState(true);

  // Link para a explicação do useMemo
  // https://beta.reactjs.org/apis/react/useMemo

  const context = useMemo(() => ({
    loginEmail,
    setLoginEmail,
    passoword,
    setPassoword,
    button,
    setButton,
  }), [
    loginEmail,
    setLoginEmail,
    passoword,
    setPassoword,
    button,
    setButton,
  ]);

  return (
    <AppContext.Provider value={ context }>
      {children}
    </AppContext.Provider>
  );
}
Provider.propTypes = {
  children: Proptypes.node.isRequired,
};
export default AppProvider