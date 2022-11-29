import React, { useState, useMemo } from 'react';
import Proptypes from 'prop-types';
import RecitesContext from './RecitesContext';

export default function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [passoword, setPassoword] = useState('');

  const context = useMemo(() => ({
    email,
    setEmail,
    passoword,
    setPassoword,
  }), [
    email,
    setEmail,
    passoword,
    setPassoword,
  ]);
  // Link para a explicação do useMemo
  // https://beta.reactjs.org/apis/react/useMemo
  return (
    <RecitesContext.Provider value={ context }>
      {children}
    </RecitesContext.Provider>
  );
}
Provider.propTypes = {
  children: Proptypes.node.isRequired,
};
