import { useEffect, useState } from 'react';

export default function UseFetchIng(ingredient) {
  const [foodData, setFoodData] = useState([]);
  const [drinkData, setDrinkData] = useState([]);

  const myFetchFood = async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const json = await response.json();
    setFoodData(json.meals);
  };

  const myFetchDrink = async () => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const json = await response.json();
    setDrinkData(json.drinks);
  };

  useEffect(() => {
    myFetchFood();
    myFetchDrink();
  }, []);

  return { foodData, drinkData };
}
