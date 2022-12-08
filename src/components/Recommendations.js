import { func } from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';

const num = 6;
function Recommendations({ fetchApi }) {
  const [response, setResponse] = useState([]);

  const fetchCB = useCallback(async () => {
    const data = await fetchApi();
    if (!data) return;
    setResponse(data);
  }, [fetchApi]);

  useEffect(() => {
    fetchCB();
  }, [fetchCB]);

  return (
    <div className="carrosel">
      {response.slice(0, num)
        .map(({ strMeal, strDrink, strDrinkThumb, strMealThumb }, index) => (
          <div
            data-testid={ `${index}-recommendation-card` }
            key={ index }
            className="item"
          >
            <h3 data-testid={ `${index}-recommendation-title` } className="title">
              {strMeal || strDrink }
            </h3>
            <img
              width={ 50 }
              src={ strDrinkThumb || strMealThumb }
              alt={ strDrink || strMeal }
            />
          </div>
        ))}
    </div>

  );
}

Recommendations.propTypes = {
  fetchApi: func.isRequired,
};

export default Recommendations;
