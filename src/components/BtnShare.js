import React from 'react';
import shareIcon from '../images/shareIcon.svg';

function BtnShare() {
  return (
    <button
      data-testid="share-btn"
      type="button"
    //   onClick={ () => () }
    >
      <img
        src={ shareIcon }
        alt="favorite icon"
      />
    </button>
  );
}

export default BtnShare;
