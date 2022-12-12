import React, { useState } from 'react';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function BtnShare({ urlSnippet, dataTest }) {
  const [isCopied, setIsCopied] = useState(false);
  const time = 2000;
  return (
    <div>
      <button
        type="button"
        onClick={ () => {
          setIsCopied(true);
          copy(`http://localhost:3000${urlSnippet}`);
          setTimeout(() => {
            setIsCopied(false);
          }, time);
        } }
      >
        <img
          data-testid={ dataTest }
          src={ shareIcon }
          alt="favorite icon"
        />
      </button>

      {isCopied && <p>Link copied!</p>}
    </div>
  );
}
BtnShare.propTypes = {
  urlSnippet: PropTypes.string.isRequired,
  dataTest: PropTypes.string.isRequired,
};
export default BtnShare;
