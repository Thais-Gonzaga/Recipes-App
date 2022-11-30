import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import UseFetchIng from '../hooks/useFetchIng';
import UseFetchLett from '../hooks/useFetchLett';
import UseFetchName from '../hooks/useFetchName';

export default function SearchBar() {
  const history = useHistory();
  // const recepies = useSelector((state) => state.recepies);
  const dispatch = useDispatch();
  const [searchType, setSearchType] = useState('');
  const [search, setSearch] = useState('');
  const [result, setResult] = useState([]);

  const searchAPIs = () => {
    switch (searchType) {
    case 'ingredient': {
      const ingData = UseFetchIng(search);
      if (history.pathname === '/meals') {
        setResult(ingData.foodData);
      } else {
        setResult(ingData.drinkData);
      }
      break;
    }
    case 'name': {
      const nameData = UseFetchName(search);
      if (history.pathname === '/meals') {
        setResult(nameData.foodData);
      } else {
        setResult(nameData.drinkData);
      }
      break;
    }
    case 'firstLet': {
      if (search.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      const letterData = UseFetchLett(search);
      if (history.pathname === '/meals') {
        setResult(letterData.foodData);
      } else {
        setResult(letterData.drinkData);
      }
      break;
    }
    default:
      break;
    }
  };
  const HandleClick = () => {
    searchAPIs();
    dispatch(searchResults(result));
    setSearch('');
    setSearchType('');
  };

  // Falta enviar o result para a tela principal '='
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
