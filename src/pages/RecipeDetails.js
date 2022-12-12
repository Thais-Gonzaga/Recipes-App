import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import BtnFavorite from '../components/BtnFavorite';
import BtnShare from '../components/BtnShare';
import Recommendations from '../components/Recommendations';
import { fetchDrink, fetchDrinkId, fetchMeals, fetchMealsId } from '../services/fetchApi';
import valuesApi from '../services/valuesApi';
import valuesfavoriteRecipes from '../services/valuesfavoriteRecipes';
import { getLocalStore } from '../services/localStore';

const nullInprogress = { drinks: {}, meals: {} };

function RecipeDetails() {
  const { id } = useParams();
  const [response, setResponse] = useState({});
  const { location: { pathname } } = useHistory();
  const isDrink = pathname.includes('drinks');
  const fetchApiId = isDrink ? fetchDrinkId : fetchMealsId;
  const fetchApi = isDrink ? fetchMeals : fetchDrink;
  const ingredients = valuesApi(response, 'strIngredient');
  const measure = valuesApi(response, 'strMeasure');
  const localStoregeDone = getLocalStore('doneRecipes') || [];
  const isFinish = localStoregeDone.some(({ id: i }) => i === id);
  const inProgressRecipes = getLocalStore('inProgressRecipes') || nullInprogress;
  const { drinks, meals } = inProgressRecipes;
  // encadeamento opcional
  const inProgress = !!meals?.[id] || !!drinks?.[id];
  const url = isDrink ? `/drinks/${id}/in-progress` : `/meals/${id}/in-progress`;
  const arrayFavorite = valuesfavoriteRecipes(response, isDrink);
  const current = getLocalStore('favoriteRecipes') || [];
  const boolfavorite = current.some(({ id: idSelect }) => id === idSelect);

  const fetchCB = useCallback(async () => {
    const data = await fetchApiId(id);
    // if (!data) return;
    setResponse(data[0]);
  }, [id, fetchApiId]);

  useEffect(() => {
    fetchCB();
  }, [fetchCB]);

  const { strDrinkThumb, strDrink, strAlcoholic, strInstructions, strMealThumb,
    strMeal, strCategory, strYoutube } = response;

  return (
    <div>
      <h1>Recipe Details</h1>

      <section>
        <img
          width={ 250 }
          data-testid="recipe-photo"
          src={ strDrinkThumb || strMealThumb }
          alt={ strDrink || strMeal }
        />
        <h2 data-testid="recipe-title">{ strDrink || strMeal}</h2>
        <BtnFavorite
          arrayFavorite={ arrayFavorite }
          boolfavorite={ boolfavorite }
          idSelect={ id }
        />
        <BtnShare
          urlSnippet={ pathname }
          dataTest="share-btn"
        />
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

      <Recommendations fetchApi={ fetchApi } />
      <Link to={ url }>
        <button
          className="btn-start"
          data-testid="start-recipe-btn"
          type="button"
          disabled={ isFinish }
        >
          {inProgress ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      </Link>

    </div>
  );
}

export default RecipeDetails;
