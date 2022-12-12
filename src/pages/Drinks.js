import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

function Drinks() {
  const [searchBarOn, setSearchBarOn] = useState(false);
  const recipes = useSelector((state) => state.reducer.recipes);
  const numbTwelve = 12;

  const toggleSearchBar = () => {
    setSearchBarOn((prevState) => !prevState);
  };
  return (
    <div>
      <Header title="Drinks" isSearchOn toggleSearchBar={ toggleSearchBar } />
      {searchBarOn && <SearchBar />}
      {
        recipes.length === 1
          ? <Redirect to={ `/drinks/${recipes[0].idDrink}` } />
          : recipes.map((e, i) => {
            if (i < numbTwelve) {
              return (
                <div
                  className="recepie"
                  key={ e.idDrink }
                  data-testid={ `${i}-recipe-card` }
                >
                  <p data-testid={ `${i}-card-name` }>
                    { e.strDrink }
                  </p>
                  <img
                    src={ e.strDrinkThumb }
                    alt={ e.strDrink }
                    data-testid={ `${i}-card-img` }
                  />
                </div>
              );
            }
            return null;
          })
      }
      <Footer />
    </div>
  );
}

export default Drinks;
