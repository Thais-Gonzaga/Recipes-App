import { arrayOf, bool, shape, string } from 'prop-types';
import React, { useState } from 'react';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { remove, add } from '../services/localStore';

function BtnFavorite({ arrayFavorite, boolfavorite, idSelect }) {
  const [isFavorite, setIsFavorite] = useState(boolfavorite);

  const removeItem = () => {
    remove('favoriteRecipes', idSelect);
    setIsFavorite(false);
  };
  const addItem = () => {
    add('favoriteRecipes', arrayFavorite);
    setIsFavorite(true);
  };

  return (
    <button
      type="button"
      onClick={ isFavorite ? removeItem : addItem }
    >
      <img
        data-testid="favorite-btn"
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="favorite icon"
      />
    </button>
  );
}

BtnFavorite.propTypes = {
  arrayFavorite: arrayOf(shape(string)).isRequired,
  boolfavorite: bool.isRequired,
  idSelect: string.isRequired,

};

export default BtnFavorite;
