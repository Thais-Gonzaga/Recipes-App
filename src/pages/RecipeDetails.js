import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { fetchDrinkId, fetchMealsId } from '../services/fetchApi';
import valuesApi from '../services/valuesApi';

function RecipeDetails() {
  const { id } = useParams();
  const [response, setResponse] = useState({});
  const { location: { pathname } } = useHistory();
  const isDrink = pathname.includes('drinks');
  const fetchApi = isDrink ? fetchDrinkId : fetchMealsId;
  const ingredients = valuesApi(response, 'strIngredient');
  const measure = valuesApi(response, 'strMeasure');

  const fetchCB = useCallback(async () => {
    const data = await fetchApi(id);
    if (!data) return;
    setResponse(data[0]);
  }, [id, fetchApi]);

  useEffect(() => {
    fetchCB();
  }, [fetchCB]);

  // const ingredientsDrinks = Object.entries(response)
  //   .reduce((acc, [key, value]) => (
  //     value && key.includes('strIngredient') ? [...acc, { ing: value }] : acc), []);

  // const measureDrinks = Object.entries(response)
  //   .reduce((acc, [key, value]) => (
  //     value && key.includes('strMeasure') ? [...acc, { meas: value }] : acc), []);

  const { strDrinkThumb, strDrink, strAlcoholic, strInstructions, strMealThumb,
    strMeal, strCategory, strYoutube } = response;

  return (
    <div>
      <h1>Recipe Details</h1>
      <div>
        <section>
          <img
            width={ 250 }
            data-testid="recipe-photo"
            src={ strDrinkThumb || strMealThumb }
            alt={ strDrink || strMeal }
          />
          <h2 data-testid="recipe-title">{ strDrink || strMeal}</h2>
          <h3> Category:</h3>
          <p data-testid="recipe-category">{ strAlcoholic || strCategory }</p>
          <h3> Ingredients:</h3>
          <ul>
            {ingredients.map(({ k }, index) => (
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ index }
              >
                {`${k} ${measure[index].k}`}
              </li>
            ))}
          </ul>
          <h3>Instructions</h3>
          <p data-testid="instructions">{strInstructions}</p>

          { !isDrink
              && <iframe
                data-testid="video"
                src={ strYoutube && strYoutube.replace(/watch\?v=/g, 'embed/') }
                title={ strMeal }
              />}
        </section>
      </div>
    </div>
  );
}

export default RecipeDetails;
