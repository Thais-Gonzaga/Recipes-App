import React from 'react';
// import RecitesContext from '../context/RecitesContext';

export default function Login() {
//   const {
//     email,
//     setEmail,
//     passoword,
//     setPassoword,
//   } = useContext(RecitesContext);
  return (
    <div>
      <input
        type="text"
        data-testid="email-input"
      />
      <input
        type="text"
        data-testid="password-input"
      />
      <button
        type="button"
        data-testid="login-submit-btn"
      >
        Enter
      </button>
    </div>
  );
}
