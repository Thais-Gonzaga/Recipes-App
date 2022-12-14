import React from 'react';
import Meals from '../Pages/Meals';
import Drinks from '../Pages/Drinks';

export default function Recipes() {
  // const { drinks, meals } = useContext(RecipesContext);
  const url = window.location.pathname;
  return (
    <div>
      <h1>Recipes</h1>
      {url === '/drinks' ? (<Drinks />) : null}
      {url === '/meals' ? (<Meals />) : null}
    </div>
  );
}
