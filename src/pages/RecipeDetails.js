import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDrinkId, fetchMealsId } from '../services/fetchApi';

// const idMeal = '52882';
// const idDrink = '17256';

function RecipeDetails() {
  const { id } = useParams();
  const [responseDrinkId, setResponseDrinkId] = useState([]);
  const [objDrink, setObjDrink] = useState({});
  const [responseMealId, setResponseMealId] = useState([]);
  const [objMeal, setObjMeal] = useState({});

  useEffect(() => {
    const fetchApiD = async () => {
      const drinks = await fetchDrinkId(id);
      if (!drinks) return;
      setResponseDrinkId(drinks);
      setObjDrink(drinks[0]);
    };
    fetchApiD();
  }, []);

  useEffect(() => {
    const fetchApiM = async () => {
      const meals = await fetchMealsId(id);
      if (!meals) return;
      setResponseMealId(meals);
      setObjMeal(meals[0]);
    };
    fetchApiM();
  }, []);

  const ingredientsDrinks = Object.entries(objDrink)
    .reduce((acc, [key, value]) => (
      value && key.includes('strIngredient') ? [...acc, { ing: value }] : acc), []);

  const ingredientsMeals = Object.entries(objMeal)
    .reduce((acc, [key, value]) => (
      value && key.includes('strIngredient') ? [...acc, { ing: value }] : acc), []);
  const { strDrinkThumb, strDrink, strAlcoholic, strInstructions } = objDrink;

  return (
    <div>
      <h1>Recipe Details</h1>
      <div>
        {responseDrinkId.length
        && (
          <section>
            <img
              data-testid="recipe-photo"
              src={ strDrinkThumb }
              alt={ strDrink }
            />
            <h2 data-testid="recipe-title">{ strDrink }</h2>
            <h3> Category:</h3>
            <p data-testid="recipe-category">{ strAlcoholic }</p>
            <h3> Ingredients:</h3>
            <ul>
              {ingredientsDrinks.map(({ ing }, index) => (
                <li
                  data-testid={ `${index}-ingredient-name-and-measure` }
                  key={ index }
                >
                  {`${ing} ${measureDrinks[index]}`}
                </li>
              ))}
            </ul>
            <h3>Instructions</h3>
            <p data-testid="instructions">{strInstructions}</p>

          </section>
        )}
        {responseMealId.length
        && (
          <section>
            {/* <img
              data-testid="recipe-photo"
              src={ strDrinkThumb }
              alt={ strDrink }
            />
            <h2 data-testid="recipe-title">{ strDrink }</h2>
            <h3> Category:</h3>
            <p data-testid="recipe-category">{ strAlcoholic }</p>
            <h3> Ingredients:</h3>
            <ul>
              {ingredientsDrinks.map(({ ing }, index) => (
                <li
                  data-testid={ `${index}-ingredient-name-and-measure` }
                  key={ index }
                >
                  {`${ing} ${measureDrinks[index]}`}
                </li>
              ))}
            </ul>
            <h3>Instructions</h3>
            <p data-testid="instructions">{strInstructions}</p> */}

          </section>
        )}
      </div>
    </div>
  );
}

export default RecipeDetails;
