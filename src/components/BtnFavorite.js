import { arrayOf, shape, string } from 'prop-types';
import React, { useState } from 'react';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import localStoreItem from '../services/localStore';

function BtnFavorite({ arrayFavorite }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const favorite = () => {
    localStoreItem('favoriteRecipes', arrayFavorite);
    setIsFavorite(true);
  };

  return (
    <button
      data-testid="favorite-btn"
      type="button"
      onClick={ () => favorite() }
    >
      <img
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="favorite icon"
      />
    </button>
  );
}

BtnFavorite.propTypes = {
  arrayFavorite: arrayOf(shape(string)).isRequired,

};

export default BtnFavorite;
