import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import AppContext from '../context/AppContext';

export default function Login() {
  const {
    buttonEnter,
    setButton,
    loginEmail,
    setLoginEmail,
    passoword,
    setPassoword,
  } = useContext(AppContext);

  const history = useHistory('/meals');

  const fetchButton = () => {
    const format = { email: loginEmail };
    localStorage.setItem('user', JSON.stringify(format));
    history.push('/meals');
  };

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
          Email:
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
          disabled={ buttonEnter }
          onClick={ () => fetchButton() }
        >
          Enter
        </button>
      </form>
    </div>
  );
}
