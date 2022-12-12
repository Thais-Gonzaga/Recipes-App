import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, isSearchOn, toggleSearchBar }) {
  const history = useHistory();
  const handlesProfileClick = () => {
    history.push('/profile');
  };
  return (
    <div>
      <h1 data-testid="page-title">{title}</h1>
      <button type="button" onClick={ handlesProfileClick }>
        <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
      </button>
      {isSearchOn
      && (
        <button
          type="button"
          onClick={ toggleSearchBar }
        >

          <img
            src={ searchIcon }
            alt="search"
            data-testid="search-top-btn"
          />
        </button>)}
    </div>

  );
}

Header.propTypes = {
  // history: PropTypes.shape({
  //   push: PropTypes.func,
  // }).isRequired,
  title: PropTypes.string.isRequired,
  isSearchOn: PropTypes.bool.isRequired,
  toggleSearchBar: PropTypes.func.isRequired,
};
export default Header;
