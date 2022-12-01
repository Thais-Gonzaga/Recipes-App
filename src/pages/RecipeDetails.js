import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDrinkId, fetchMealsId } from '../services/fetchApi';

// const idMeal = '52882';
// const idDrink = '17256';

function RecipeDetails() {
  const { id } = useParams();
  const [responseDrinkId, setResponseDrinkId] = useState([]);
  const [responseMealId, setResponseMealId] = useState([]);

  useEffect(() => {
    const fetchApiD = async () => {
      const drinks = await fetchDrinkId(id);
      if (!drinks) return;
      setResponseDrinkId(drinks);
    };
    fetchApiD();
  }, []);

  useEffect(() => {
    const fetchApiM = async () => {
      const meals = await fetchMealsId(id);
      if (!meals) return;
      setResponseMealId(meals);
    };
    fetchApiM();
  }, []);

  console.log(responseDrinkId);
  console.log(responseMealId);

  return (
    <h1>Recipe Details</h1>
  );
}

export default RecipeDetails;
