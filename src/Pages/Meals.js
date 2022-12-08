import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

export default function Meals() {
  const { meals, categoryMeals,
    setMeals, fetchApiMeals } = useContext(RecipesContext);

  const fetchSerchCategoryMeals = async (cat) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`);
      const data = await response.json();
      setMeals(data.meals);
      console.log(cat);
    } catch (error) {
      console.log('erro no fetchSerchCategoryDrinks');
    }
  };

  return (
    <>
      <div>
        {categoryMeals.map(({ strCategory }, index) => index < '5' && (
          <div key={ index }>
            <button
              type="button"
              data-testid={ `${strCategory}-category-filter` }
              onClick={ () => { fetchSerchCategoryMeals(strCategory); } }
            >
              {strCategory}
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ fetchApiMeals }
      >
        All
      </button>
      <div>
        {meals.map((i, index) => index < '12' && (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <Link to={ `/meals/${i.idMeal}` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ i.strMealThumb }
                alt={ i.strMeal }
                width="200px"
              />
            </Link>
            <h3
              data-testid={ `${index}-card-name` }
            >
              {i.strMeal}
            </h3>
          </div>
        ))}
      </div>

    </>
  );
}
