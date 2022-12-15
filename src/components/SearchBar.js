import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { searchResults } from '../redux/actions';
import searchAPIs from './helpers/doTheFetch';

export default function SearchBar() {
  const history = useHistory();
  // const recipes = useSelector((state) => state.recipes);
  const dispatch = useDispatch();
  const [searchType, setSearchType] = useState('');
  const [search, setSearch] = useState('');

  const HandleClick = async () => {
    const path = history.location.pathname;
    const mySearch = await searchAPIs(path, searchType, search);
    console.log(path, searchType, search);
    if (!mySearch || mySearch.length === 0) {
      console.log('deu ruim');
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      return dispatch(searchResults([]));
    }
    console.log('deu bom');
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
          id="ingredient"
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
          id="name"
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
          id="first-letter"
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
