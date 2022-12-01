import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer
      className="footercss"
      data-testid="footer"
    >
      <Link to="/drinks">
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drink icon" />
      </Link>
      <Link to="/meals">
        <img data-testid="meals-bottom-btn" src={ mealIcon } alt="meal Icon" />
      </Link>
    </footer>
  );
}

export default Footer;
