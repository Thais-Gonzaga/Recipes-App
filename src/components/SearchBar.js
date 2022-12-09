import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { searchResults } from '../redux/actions';
import searchAPIs from './helpers/doTheFetch';

export default function SearchBar() {
  const history = useHistory();
  // const recepies = useSelector((state) => state.recepies);
  const dispatch = useDispatch();
  const [searchType, setSearchType] = useState('');
  const [search, setSearch] = useState('');

  const HandleClick = async () => {
    const path = history.location.pathname;
    const mySearch = await searchAPIs(path, searchType, search);
    console.log(path, searchType, search, mySearch);
    if (!mySearch || mySearch.length === 0) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      return dispatch(searchResults([]));
    }
    dispatch(searchResults(mySearch));
    setSearch('');
    setSearchType('');
  };

  return (
    <div className="searchDiv">
      <label htmlFor="search">
        <input
          type="text"
          name="search"
          placeholder="Search"
          data-testid="search-input"
          value={ search }
          onChange={ (event) => setSearch(event.target.value) }
        />
      </label>
      <label htmlFor="ingredient">
        <input
          value="ingredient"
          type="radio"
          name="ingredient"
          data-testid="ingredient-search-radio"
          onClick={ (event) => setSearchType(event.target.value) }
        />
        Ingrediente
      </label>
      <label htmlFor="name">
        <input
          value="name"
          type="radio"
          name="name"
          data-testid="name-search-radio"
          onClick={ (event) => setSearchType(event.target.value) }
        />
        Name
      </label>
      <label htmlFor="first-letter">
        <input
          type="radio"
          name="first-letter"
          data-testid="first-letter-search-radio"
          value="firstLet"
          onClick={ (event) => setSearchType(event.target.value) }
        />
        First Letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => HandleClick() }
      >
        Search
      </button>
    </div>
  );
}
