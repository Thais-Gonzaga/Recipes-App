import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import requestApi from '../services/requestApi';

function RecipeInProgress() {
  const history = useHistory();
  const params = useParams();
  const [reciveData, setReciveData] = useState([]);
  const [loading, setLoading] = useState(false);

  const mealsEndpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`;
  const drinksEndpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params.id}`;

  const handleFetch = async () => {
    if (history.location.pathname.includes('meals')) {
      setLoading(true);
      const data = await (requestApi(mealsEndpoint));
      setReciveData(data.meals[0]);
      console.log(reciveData);
    } if (history.location.pathname.includes('drinks')) {
      const data = await (requestApi(drinksEndpoint));
      setReciveData(data.drinks[0]);
      console.log(reciveData);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const ingredients = () => Object.entries(reciveData)
    .filter((i) => i[0].includes('strIngredient')).map((i) => i[1]);
  const measures = () => Object.entries(reciveData)
    .filter((i) => i[0].includes('strMeasure')).map((i) => i[1]);

  let indexNull = 0;
  indexNull = ingredients().indexOf('');

  if (loading) { return <span>carregando...</span>; }

  return (
    <div>
      <img data-testid="recipe-photo" src={ reciveData.strMealThumb } alt="foodImg" />
      <h1 data-testid="recipe-title">{ reciveData.strMeal }</h1>
      <button type="button" data-testid="share-btn">COMPARTILHAR</button>
      <button type="button" data-testid="favorite-btn">FAVORITAR</button>
      <h2 data-testid="recipe-category">{ reciveData.strCategory }</h2>
      {ingredients().slice(0, indexNull).map((ingredient, index) => (
        <div key={ index }>
          ingredientes
          <label htmlFor="ingredient" data-testid={ `${index}-ingredient-step` }>
            <input type="checkbox" />
            {`${ingredient} ${measures()[index]}`}
          </label>
        </div>
      ))}
      <p data-testid="instructions">INSTRUÇÕES</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        FINNISH RECIPE
      </button>
    </div>

  );
}

export default RecipeInProgress;
