import React, { useState, useMemo } from 'react';
import Proptypes from 'prop-types';
import AppContext from './AppContext';

export default function Provider({ children }) {
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
