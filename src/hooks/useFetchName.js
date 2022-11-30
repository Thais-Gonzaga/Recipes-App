import { useEffect, useState } from 'react';

export default function UseFetchName(name) {
  const [foodData, setFoodData] = useState([]);
  const [drinkData, setDrinkData] = useState([]);

  const myFetchFood = async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const json = await response.json();
    setFoodData(json.meals);
  };

  const myFetchDrink = async () => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`);
    const json = await response.json();
    setDrinkData(json.drinks);
  };

  useEffect(() => {
    myFetchFood();
    myFetchDrink();
  }, []);
  return { foodData, drinkData };
}
