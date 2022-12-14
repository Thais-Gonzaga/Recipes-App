import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import requestApi from '../services/requestApi';
import '../App.css';
import BtnShare from '../components/BtnShare';
import BtnFavorite from '../components/BtnFavorite';
import { valuesfavoriteRecipes,
  valuesDoneRecipes } from '../services/valuesfavoriteRecipes';
import { getLocalStore } from '../services/localStore';

function RecipeInProgress() {
  const history = useHistory();
  const params = useParams();
  const [reciveData, setReciveData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState([]);

  const isDrink = history.location.pathname.includes('drinks');
  const key = isDrink ? 'drinks' : 'meals';

  const mealsEndpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`;
  const drinksEndpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params.id}`;
  const arrayFavorite = valuesfavoriteRecipes(reciveData, isDrink) || [];
  const current = getLocalStore('favoriteRecipes') || [];
  const boolfavorite = current.some(({ id: idSelect }) => params.id === idSelect);

  const ingredients = Object.entries(reciveData)
    .filter((i) => i[0].includes('strIngredient') && i[1]).map((i) => i[1]);
  const measures = Object.entries(reciveData)
    .filter((i) => i[0].includes('strMeasure') && i[1]).map((i) => i[1]);

  const inProgressRecipes = JSON.parse(localStorage
    .getItem('inProgressRecipes') || '{ "meals": {}, "drinks": {} }');
  const isProgress = [inProgressRecipes].some((recipe) => (
    +Object.keys(recipe[key]) === +params.id));
  const obj = {
    ...inProgressRecipes,
    [key]: { ...inProgressRecipes[key],
      [params.id]: [...ingredients],
    },
  };
  if (!isProgress && ingredients.length) {
    localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
  }

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
  // const handleLocalStorage = () => {
  //   const inProgressRecipes = JSON.parse(localStorage
  //     .getItem('inProgressRecipes') || '{ "meals": {}, "drinks": {} }');
  //   const isProgress = [inProgressRecipes].some((recipe) => (
  //     +Object.keys(recipe[key]) === +params.id));
  //   const obj = {
  //     ...inProgressRecipes,
  //     [key]: { ...inProgressRecipes[key],
  //       [params.id]: [...ingredients],
  //     },
  //   };
  //   if (!isProgress) {
  //     localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
  //   }
  // };

  useEffect(() => {
    const recoveryLocalStorage = JSON.parse(
      localStorage.getItem('doneIngredients') || '[]',
    );
    setIsChecked(recoveryLocalStorage);
    handleFetch();
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

  const buttonDisabled = () => {
    if (isChecked) {
      const finished = isChecked.length === ingredients.length;
      return finished;
    }
  };

  const handleFinishRecipe = () => {
    const item = valuesDoneRecipes(reciveData, isDrink);
    localStorage.setItem('doneRecipes', JSON.stringify(item));
    delete inProgressRecipes[key][+params.id];
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    history.push('/done-recipes');
  };

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ reciveData.strMealThumb || reciveData.strDrinkThumb }
        alt="foodImg"
      />
      <h1 data-testid="recipe-title">{ reciveData.strMeal || reciveData.strDrink }</h1>
      <BtnShare urlSnippet={ `/${key}/${params.id}` } dataTest="share-btn" />
      <BtnFavorite
        arrayFavorite={ arrayFavorite }
        boolfavorite={ boolfavorite }
        idSelect={ params.id }
      />
      <h2 data-testid="recipe-category">{ reciveData.strCategory }</h2>
      {ingredients.map((ingredient, index) => ingredient && (
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
            {`${ingredient} ${measures[index]}`}
          </label>
        </div>
      ))}
      <p data-testid="instructions">INSTRUÇÕES</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ !buttonDisabled() }
        onClick={ handleFinishRecipe }
      >
        FINISH RECIPE
      </button>
    </div>

  );
}

export default RecipeInProgress;
