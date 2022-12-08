import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

export default function Drinks() {
  const { drinks, categoryDrinks,
    setDrinks, fetchApiDrinks } = useContext(RecipesContext);

  const fetchSerchCategoryDrinks = async (cat) => {
    try {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${cat}`);
      const data = await response.json();
      setDrinks(data.drinks);
      console.log(cat);
    } catch (error) {
      console.log('erro no fetchSerchCategoryDrinks');
    }
  };

  return (
    <>
      <div>
        {categoryDrinks.map(({ strCategory }, index) => index < '5' && (
          <div key={ index }>
            <button
              type="button"
              name={ strCategory }
              data-testid={ `${strCategory}-category-filter` }
              onClick={ () => { fetchSerchCategoryDrinks(strCategory); } }
            >
              {strCategory}
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ fetchApiDrinks }
      >
        All
      </button>
      <div>
        {drinks.map((i, index) => index < '12' && (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <Link to={ `/drinks/${i.idDrink}` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ i.strDrinkThumb }
                alt={ i.strDrink }
                width="200px"
              />
            </Link>
            <h3
              data-testid={ `${index}-card-name` }
            >
              {i.strDrink}
            </h3>
          </div>
        ))}
      </div>

    </>
  );
}
