import React, { useState } from 'react';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function BtnFavorite() {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <button
      data-testid="favorite-btn"
      type="button"
      onClick={ () => (setIsFavorite(true)) }
    >
      <img
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="favorite icon"
      />
    </button>
  );
}

export default BtnFavorite;
