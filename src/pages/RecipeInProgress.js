import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import requestApi from '../services/requestApi';
import '../App.css';

function RecipeInProgress() {
  const history = useHistory();
  const params = useParams();
  const [reciveData, setReciveData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState([]);
  // const [storageObject, setStorageObject] = useState({});

  const isDrink = history.location.pathname.includes('drinks');
  const key = isDrink ? 'drinks' : 'meals';

  const mealsEndpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`;
  const drinksEndpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params.id}`;

  const handleFetch = async () => {
    if (history.location.pathname.includes('meals')) {
      setLoading(true);
      const data = await (requestApi(mealsEndpoint));
      setReciveData(data.meals[0]);
    } if (isDrink) {
      const data = await (requestApi(drinksEndpoint));
      setReciveData(data.drinks[0]);
    }
    setLoading(false);
  };

  const ingredients = () => Object.entries(reciveData)
    .filter((i) => i[0].includes('strIngredient')).map((i) => i[1]);
  const measures = () => Object.entries(reciveData)
    .filter((i) => i[0].includes('strMeasure')).map((i) => i[1]);

  let indexNull = 0;
  indexNull = ingredients().indexOf('');

  const ingredientList = ingredients().slice(0, indexNull);
  console.log(ingredientList);

  const handleLocalStorage = () => {
    const inProgressRecipes = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { [key]: {} };
    const isProgress = [inProgressRecipes].some((recipe) => (
      +Object.keys(recipe[key]) === +params.id));
    const obj = {
      ...inProgressRecipes,
      [key]: { ...inProgressRecipes[key],
        [params.id]: [...ingredientList],
      },
    };
    if (!isProgress) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
    }
  };

  useEffect(() => {
    const recoveryLocalStorage = JSON.parse(localStorage.getItem('doneIngredients'));
    setIsChecked(recoveryLocalStorage);
    handleFetch();
    handleLocalStorage();
  }, []);

  if (loading) { return <span>carregando...</span>; }

  const handleChecked = ({ target }) => {
    if (target.checked) {
      target.parentElement.classList = 'check';
      const NewStorage = !isChecked
        ? [target.value] : [...isChecked, target.value];
      setIsChecked(NewStorage);
      localStorage.setItem('doneIngredients', JSON.stringify(NewStorage));
    } else {
      const newArray = isChecked.filter((ingred) => ingred !== target.value);
      setIsChecked(newArray);
      localStorage.setItem('doneIngredients', JSON.stringify(newArray));
      target.parentElement.classList = null;
    }
  };
  // console.log(isChecked);
  return (
    <div>
      <img data-testid="recipe-photo" src={ reciveData.strMealThumb } alt="foodImg" />
      <h1 data-testid="recipe-title">{ reciveData.strMeal }</h1>
      <button type="button" data-testid="share-btn">COMPARTILHAR</button>
      <button type="button" data-testid="favorite-btn">FAVORITAR</button>
      <h2 data-testid="recipe-category">{ reciveData.strCategory }</h2>
      {ingredientList.map((ingredient, index) => (
        <div key={ index }>
          ingredientes
          <label htmlFor="ingredient" data-testid={ `${index}-ingredient-step` }>
            <input
              checked={ !isChecked ? false : isChecked
                .includes(`${ingredient}`) }
              value={ ingredient }
              onChange={ handleChecked }
              type="checkbox"
            />
            {`${ingredient} ${measures()[index]}`}
          </label>
        </div>
      ))}
      <p data-testid="instructions">INSTRUÇÕES</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ () => console.log('clickou') }
      >
        FINNISH RECIPE
      </button>
    </div>

  );
}

export default RecipeInProgress;
