import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import RecipesContext from '../context/RecipesContext';

export default function Meals() {
  const { meals, categoryMeals,
    setMeals, fetchApiMeals } = useContext(RecipesContext);
  const [selectCat, setSelectCat] = useState('');
  const [searchBarOn, setSearchBarOn] = useState(false);
  const recipes = useSelector((state) => state.reducer.recipes) || [];

  const fetchSerchCategoryMeals = async (cat) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`);
      const data = await response.json();
      console.log(data);
      setMeals(data.meals);
      // console.log(cat);
    } catch (error) {
      console.log('erro no fetchSerchCategoryDrinks');
    }
  };

  const changeMeals = (result) => setMeals(result);

  const toggleSearchBar = () => {
    setSearchBarOn((prevState) => !prevState);
  };

  // console.log(meals);
  return (
    <>
      <Header title="Meals" isSearchOn toggleSearchBar={ toggleSearchBar } />
      {searchBarOn && <SearchBar />}
      {
        recipes.length === 1
          ? <Redirect to={ `/meals/${recipes[0].idMeal}` } />
          : null
      }
      {
        recipes.length >= 2
          ? changeMeals(recipes)
          : null
      }
      <div>
        {categoryMeals.map(({ strCategory }, index) => index < '5' && (
          <div key={ index }>
            <button
              type="button"
              data-testid={ `${strCategory}-category-filter` }
              onClick={ () => {
                if (selectCat !== strCategory) {
                  fetchSerchCategoryMeals(strCategory);
                  setSelectCat(strCategory);
                } else {
                  fetchApiMeals();
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
        onClick={ fetchApiMeals }
      >
        All
      </button>
      <div>
        {meals.map((i, index) => index < '12' && (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <Link to={ `/meals/${i.idMeal}` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ i.strMealThumb }
                alt={ i.strMeal }
                width="200px"
              />
            </Link>
            <h3
              data-testid={ `${index}-card-name` }
            >
              {i.strMeal}
            </h3>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}
