import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/FavoriteRecipes.css';
import Drk from '../components/Drk';
import Header from '../components/Header';
import Meal from '../components/Meal';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [recepies, setRecepies] = useState([]);
  const [localStg, setLocalStg] = useState([]);
  const [copyText, setCopyText] = useState(false);
  const threeSec = 3000;

  useEffect(() => {
    let myFavs = [];
    // localStorage.setItem('favoriteRecipes', JSON.stringify(teste));
    myFavs = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setRecepies(myFavs);
    setLocalStg(myFavs);
  }, []);

  const allBtn = () => {
    setRecepies(localStg);
  };

  const mealBtn = () => {
    const onlyMeal = recepies.filter((e) => e.type === 'meal');
    setRecepies(onlyMeal);
  };

  const drinkBtn = () => {
    const onlyDrink = recepies.filter((e) => e.type === 'drink');
    setRecepies(onlyDrink);
  };

  const shareBtn = (id, type) => {
    if (type === 'meal') {
      setCopyText(true);
      copy(`http://localhost:3000/meals/${id}`);
      setTimeout(() => {
        setCopyText(false);
      }, threeSec);
      return global.alert('Link copied!');
    }
    copy(`http://localhost:3000/drinks/${id}`);
    return global.alert('Link copied!');
  };

  const favBtn = (id) => {
    const newFavs = recepies.filter((e) => e.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavs));
    setRecepies(newFavs);
    setLocalStg(newFavs);
  };

  return (
    <>
      <Header title="Favorite Recipes" isSearchOn={ false } />
      <div className="filters">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => allBtn() }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => mealBtn() }
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => drinkBtn() }
        >
          Drinks
        </button>
      </div>
      { (copyText) ? <h2>Link copied!</h2> : null }
      <div className="favItens">
        {/* {console.log(recepies)} */}
        {recepies.map((e, index) => (
          <div className="recipe" key={ index }>
            <Link to={ `/${e.type}s/${e.id}` }>
              <img
                className="recipeImg"
                src={ e.image }
                data-testid={ `${index}-horizontal-image` }
                alt={ e.name }
              />
            </Link>
            <Link to={ `${e.type}s/${e.id}` }>
              <h1 data-testid={ `${index}-horizontal-name` }>{ e.name }</h1>
            </Link>
            {
              e.type === 'meal'
                ? <p data-testid={ `${index}-horizontal-top-text` }><Meal pro={ e } /></p>
                : <p data-testid={ `${index}-horizontal-top-text` }><Drk pro={ e } /></p>
            }
            <button
              type="button"
              onClick={ () => shareBtn(e.id, e.type) }
            >
              <img
                src={ shareIcon }
                alt="favorite Icon"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
            <button
              type="button"
              onClick={ () => favBtn(e.id) }
            >
              <img
                src={ blackHeartIcon }
                alt="favorite Icon"
                data-testid={ `${index}-horizontal-favorite-btn` }
              />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default FavoriteRecipes;
