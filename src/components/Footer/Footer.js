import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

const Footer = () => {
  <footer
    data-testid="footer"
    className="footer"
  >
    <Link to="/nomedarotadebebidas">
      <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drink icon" />
    </Link>
    <Link to="/nomedarotadecomidas">
      <img data-testid="meals-bottom-btn" src={ mealIcon } alt="meal Icon" />
    </Link>

  </footer>;
};

export default Footer;
