import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

export default function RecipesProvider({ children }) {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [categoryMeals, setCategoryMeals] = useState([]);
  const [categoryDrinks, setCategoryDrinks] = useState([]);

  const fetchApiMeals = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      setMeals(data.meals);
      console.log(data.meals);
    } catch (error) {
      console.log('erro no fetchMeals');
    }
  };

  const fetchApiDrinks = async () => {
    try {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      setDrinks(data.drinks);
      // console.log(data);
    } catch (error) {
      console.log('erro no fetchDrinks');
    }
  };

  const fetchCategoryMeals = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      setCategoryMeals(data.meals);
      // console.log(data.meals);
    } catch (error) {
      console.log('erro no fetchCategotyMeals');
    }
  };

  const fetchCategoryDrinks = async () => {
    try {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      setCategoryDrinks(data.drinks);
      // console.log(data.drinks);
    } catch (error) {
      console.log('erro no fetchCategoryDrinks');
    }
  };

  useEffect(() => {
    fetchApiMeals();
    fetchApiDrinks();
    fetchCategoryMeals();
    fetchCategoryDrinks();
  }, []);

  const values = useMemo(() => ({
    meals,
    setMeals,
    drinks,
    setDrinks,
    categoryMeals,
    setCategoryMeals,
    categoryDrinks,
    setCategoryDrinks,
    fetchApiDrinks,
    fetchApiMeals,
  }), [
    meals,
    setMeals,
    drinks,
    setDrinks,
    categoryMeals,
    setCategoryMeals,
    categoryDrinks,
    setCategoryDrinks,
  ]);

  return (
    <RecipesContext.Provider value={ values }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.element,
}.isRequired;
