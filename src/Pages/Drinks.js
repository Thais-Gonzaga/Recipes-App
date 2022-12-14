import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import RecipesContext from '../context/RecipesContext';

export default function Drinks() {
  const { drinks, categoryDrinks,
    setDrinks, fetchApiDrinks } = useContext(RecipesContext);
  const [selectCat, setSelectCat] = useState('');
  const [searchBarOn, setSearchBarOn] = useState(false);
  const recipes = useSelector((state) => state.reducer.recipes) || [];

  const fetchSerchCategoryDrinks = async (cat) => {
    try {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${cat}`);
      const data = await response.json();
      setDrinks(data.drinks);
      console.log(cat);
    } catch (error) {
      console.log('erro no fetchSerchCategoryDrinks');
    }
  };

  const changeDrinks = (result) => setDrinks(result);

  const toggleSearchBar = () => {
    setSearchBarOn((prevState) => !prevState);
  };

  return (
    <>
      <Header title="Drinks" isSearchOn toggleSearchBar={ toggleSearchBar } />
      {searchBarOn && <SearchBar />}
      {
        recipes.length === 1
          ? <Redirect to={ `/drinks/${recipes[0].idDrink}` } />
          : null
      }
      {
        recipes.length >= 2
          ? changeDrinks(recipes)
          : null
      }
      <div>
        {categoryDrinks.map(({ strCategory }, index) => index < '5' && (
          <div key={ index }>
            <button
              type="button"
              name={ strCategory }
              data-testid={ `${strCategory}-category-filter` }
              onClick={ () => {
                if (selectCat !== strCategory) {
                  fetchSerchCategoryDrinks(strCategory);
                  setSelectCat(strCategory);
                } else {
                  fetchApiDrinks();
                }
              } }
            >
              {strCategory}
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ fetchApiDrinks }
      >
        All
      </button>
      <div>
        {drinks.map((i, index) => index < '12' && (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <Link to={ `/drinks/${i.idDrink}` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ i.strDrinkThumb }
                alt={ i.strDrink }
                width="200px"
              />
            </Link>
            <h3
              data-testid={ `${index}-card-name` }
            >
              {i.strDrink}
            </h3>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}
