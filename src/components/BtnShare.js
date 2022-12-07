import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function BtnShare() {
  const [isCopied, setIsCopied] = useState(false);
  const { location: { pathname } } = useHistory();
  const time = 2000;
  return (
    <div>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ () => {
          setIsCopied(true);
          copy(`http://localhost:3000${pathname}`);
          setTimeout(() => {
            setIsCopied(false);
          }, time);
        } }
      >
        <img
          src={ shareIcon }
          alt="favorite icon"
        />
      </button>

      {isCopied && <p>Link copied!</p>}
    </div>
  );
}

export default BtnShare;
