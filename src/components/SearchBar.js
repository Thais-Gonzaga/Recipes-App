import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { searchResults } from '../redux/actions';
import UseFetchIng from '../hooks/useFetchIng';
import UseFetchLett from '../hooks/useFetchLett';
import UseFetchName from '../hooks/useFetchName';

export default function SearchBar() {
  const history = useHistory();
  // const recepies = useSelector((state) => state.recepies);
  const dispatch = useDispatch();
  const [searchType, setSearchType] = useState('');
  const [search, setSearch] = useState('');

  const searchAPIs = async () => {
    switch (searchType) {
    case 'ingredient': {
      if (history.location.pathname === '/meals') {
        const ingData = await UseFetchIng(search, 'meals');
        setResult(ingData);
        return ingData;
      }
      const ingData = await UseFetchIng(search, 'drinks');
      setResult(ingData);
      return ingData;
    }
    case 'name': {
      if (history.location.pathname === '/meals') {
        const nameData = await UseFetchName(search, 'meals');
        return nameData;
      }
      const nameData = await UseFetchName(search, 'drinks');
      return nameData;
    }
    case 'firstLet': {
      if (search.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      if (history.location.pathname === '/meals') {
        const letterData = await UseFetchLett(search, 'meals');
        return letterData;
      }
      const letterData = await UseFetchLett(search, 'drinks');
      return letterData;
    }
    default:
      break;
    }
  };
  const HandleClick = async () => {
    const mySearch = await searchAPIs();
    dispatch(searchResults(mySearch));
    if (mySearch.length === 0) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
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
