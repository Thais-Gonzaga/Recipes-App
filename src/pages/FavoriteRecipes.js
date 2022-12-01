import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [recepies, setRecepies] = useState([]);
  // const teste = [{
  //   id: 22,
  //   type: 'meal',
  //   nationality: 'br',
  //   category: '',
  //   alcoholicOrNot: 'alcoholic',
  //   name: 'nome-da-receita',
  //   image: 'imagem-da-receita'
  //   },
  //   {
  //     id: 23,
  //     type: 'drink',
  //     nationality: 'br',
  //     category: '',
  //     alcoholicOrNot: 'alcoholic',
  //     name: 'nome-da-receita2',
  //     image: 'imagem-da-receita2'
  //   }
  // ];

  useEffect(() => {
    let myFavs = [];
    // localStorage.setItem('favoriteRecipes', JSON.stringify(teste));
    myFavs = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setRecepies(myFavs);
  }, []);

  const allBtn = () => {
    setRecepies(myFavs);
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
      copy(`/meals/:${id}`);
      return global.alert('Link copied!');
    }
    copy(`/drinks/:${id}`);
    return global.alert('Link copied!');
  };

  const favBtn = (id) => {
    const newFavs = myFavs.filter((e) => e.id !== id);
    localStorage.setItem('favoriteRecipes', newFavs);
    setRecepies(newFavs);
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
      <div className="favItens">
        {/* {console.log(recepies)} */}
        {recepies.map((e, index) => (
          <div className="recipe" key={ index }>
            <Link to={ `/${e.type}/:${e.id}` }>
              <img
                src={ e.image }
                data-testid={ `${index}-horizontal-image` }
                alt={ e.name }
              />
              <h1 data-testid={ `${index}-horizontal-name` }>{ e.name }</h1>
            </Link>
            {
              e.type === 'meal'
                ? <span
                    data-testid={ `${index}-horizontal-top-text` }
                >
                  {`${e.nationality} - ${e.category}`}
                  </span>
                : <span
                    data-testid={ `${index}-horizontal-top-text` }
                >
                  {e.alcoholicOrNot}
                  </span>
            }
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ () => shareBtn(e.id, e.type) }
            >
              <img src={ shareIcon } alt="favorite Icon" />
              Share
            </button>
            <button
              type="button"
              data-testid={ `${index}-horizontal-favorite-btn` }
              onClick={ () => favBtn(e.id) }
            >
              <img src={ blackHeartIcon } alt="favorite Icon" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default FavoriteRecipes;
