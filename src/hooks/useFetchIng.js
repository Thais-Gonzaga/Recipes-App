// import { useEffect, useState } from 'react';

export default async function UseFetchIng(ingredient, type) {
  // const [foodData, setFoodData] = useState([]);
  // const [drinkData, setDrinkData] = useState([]);

  if (type === 'meals') {
    const myFetchFood = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      const json = await response.json();
      const foodData = (json.meals);
      return foodData;
    };
    const result = myFetchFood();
    return result;
  }
  const myFetchDrink = async () => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const json = await response.json();
    const drinkData = (json.drinks);
    return drinkData;
  };
  const result = myFetchDrink();
  return result;
}
