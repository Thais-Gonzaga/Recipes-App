import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

function Meals() {
  const [searchBarOn, setSearchBarOn] = useState(false);
  // const [newRecepie, setNewRecepie] = useState([]);
  const recipes = useSelector((state) => state.reducer.recipes) || [];
  const numbTwelve = 12;

  const toggleSearchBar = () => {
    setSearchBarOn((prevState) => !prevState);
  };

  // useEffect(() => {
  //   setNewRecepie(recipes);
  // }, [recipes]);

  return (
    <div>
      <Header title="Meals" isSearchOn toggleSearchBar={ toggleSearchBar } />
      {searchBarOn && <SearchBar />}
      {console.log(recipes) }
      {
        recipes.length === 1
          ? <Redirect to={ `/meals/${recipes[0].idMeal}` } />
          : recipes.map((e, i) => {
            if (i < numbTwelve) {
              return (
                <div
                  className="recepie"
                  key={ e.idMeal }
                  data-testid={ `${i}-recipe-card` }
                >
                  <p data-testid={ `${i}-card-name` }>
                    { e.strMeal }
                  </p>
                  <img
                    src={ e.strMealThumb }
                    alt={ e.strMeal }
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

export default Meals;
