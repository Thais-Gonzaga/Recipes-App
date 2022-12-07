import React, { useContext } from 'react';
import { useHistory } from 'react-router';

import RecitesContext from '../context/RecitesContext';

export default function Login() {
  const {
    button,
    setButton,
    loginEmail,
    setLoginEmail,
    passoword,
    setPassoword,
  } = useContext(RecitesContext);

  const history = useHistory('/meals');

  const fetchButton = () => {
    const format = { email: loginEmail };
    localStorage.setItem('user', JSON.stringify(format));
    history.push('/meals');
    console.log(history);
  };
  
//  =======
//  import AppContext from '../context/AppContext';

//  function Login() {
//  const {
//  loginEmail,
//  button,
//  setLoginEmail,
//  passoword,
//  setPassoword,
//  setButton,
//  } = useContext(AppContext);

//  const fetchButton = () => {
//  const format = { email: loginEmail };
//  localStorage.setItem('mealsToken', 1);
//  localStorage.setItem('cocktailsToken', 1);
//  localStorage.setItem('user', JSON.stringify(format));
//  >>>>>>> main-group-18-release


  const testLogin = () => {
    const testEmail = loginEmail.includes('@' && '.com');
    const max = 6;

    if (passoword.length >= max && testEmail) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  const handleChange = ({ target }) => {
    const { id, value } = target;
    if (id === 'email-input') {
      setLoginEmail(value);
    } else {
      setPassoword(value);
    }
    testLogin();
  };
  return (
    <div>
      <form>
        <label htmlFor="email-input">
          email:
          <input
            type="text"
            id="email-input"
            placeholder="Email"
            data-testid="email-input"
            value={ loginEmail }
            onChange={ (element) => handleChange(element) }
          />
        </label>
        <label htmlFor="password-input">
          Passoword:
          <input
            type="text"
            id="password-input"
            placeholder="Password"
            data-testid="password-input"
            value={ passoword }
            onChange={ (element) => handleChange(element) }
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ button }
          onClick={ () => fetchButton() }
        >
          Enter
        </button>
      </form>
    </div>
  );
}
