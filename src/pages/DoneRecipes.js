import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const history = useHistory();
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [doneRecipesFilter, setDoneRecipesFilter] = useState('');

  useEffect(() => {
    const recipes = [
      { id: '52977',
        type: 'meal',
        nationality: 'Turkish',
        category: 'Side',
        name: 'Corba',
        image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
        doneDate: 'data',
        tags: ['Soup'],
      },
      { id: '15997',
        type: 'drink',
        category: 'Ordinary Drink',
        alcoholicOrNot: 'Optional Alcohol',
        name: 'GG',
        image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
        doneDate: 'data',
        tags: [],
      },
    ];
    localStorage.setItem('doneRecipes', JSON.stringify(recipes));
    const retrievedDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(retrievedDoneRecipes);
  }, []);
  const selectsDoneRecipesFilter = (e) => {
    const filterSelected = e.target.id;
    switch (filterSelected) {
    case 'meals':
      setDoneRecipesFilter('meal');
      break;
    case 'drinks':
      setDoneRecipesFilter('drink');
      break;
    default:
      setDoneRecipesFilter('');
    }
  };

  // const copiesURLToClipboard = (id) => {
  // const urlPath = history.location.pathname;
  //   const url = `${window.location.href}/${id}`;
  //   copy(url);
  // };
  return (
    <div>

      <div>
        <Header title="Done Recipes" isSearchOn={ false } />
        <button
          type="button"
          data-testid="filter-by-all-btn"
          id="all"
          onClick={ (e) => selectsDoneRecipesFilter(e) }
        >
          All

        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          id="meals"
          onClick={ (e) => selectsDoneRecipesFilter(e) }
        >
          Meals

        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          id="drinks"
          onClick={ (e) => selectsDoneRecipesFilter(e) }
        >
          Drinks

        </button>
      </div>
      {
        doneRecipes
          .filter((recipe) => recipe.type.includes(doneRecipesFilter))
          .map((recipe, index) => (
            <div key={ index }>
              <img
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
                onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
              />
              <div
                data-testid={ `${index}-horizontal-top-text` }
              >
                {recipe.type === 'meal'
                && <span>{`${recipe.nationality} - `}</span>}
                {recipe.type === 'drink'
                && <span>{`${recipe.alcoholicOrNot} - `}</span>}
                <span>{recipe.category}</span>
              </div>
              <h3
                data-testid={ `${index}-horizontal-name` }
                onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
                // role="link"
              >
                {recipe.name}
              </h3>
              <p
                data-testid={ `${index}-horizontal-done-date` }
              >
                {recipe.doneDate}
              </p>
              <div>
                {/* <span
                  data-testid={ `${index}-${recipe.tags[0]}-horizontal-tag` }
                >
                  {recipe.tags[0]}
                </span> */}

                { recipe.tags.length > 0
                && (
                  <span
                    data-testid={ `${index}-${recipe.tags[0]}-horizontal-tag` }
                  >
                    {recipe.tags[0]}
                  </span>
                )}
                { recipe.tags.length > 1
                && (
                  <span
                    data-testid={ `${index}-${recipe.tags[1]}-horizontal-tag` }
                  >
                    {recipe.tags[1]}
                  </span>
                )}

              </div>
              <button
                type="button"
                data-testid={ `${index}-horizontal-share-btn` }

              >
                <img
                  src={ shareIcon }
                  alt="share"
                  onClick={ () => copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`) }
                />
              </button>
            </div>
          ))
      }
      <div />
    </div>
  );
}

export default DoneRecipes;
