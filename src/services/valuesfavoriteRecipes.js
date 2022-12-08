const valuesfavoriteRecipes = (response, isDrink) => [response].map((e) => (
  {
    id: e.idMeal || e.idDrink,
    type: isDrink ? 'drink' : 'meal',
    nationality: e.strArea || '',
    category: e.strCategory || '',
    alcoholicOrNot: e.strAlcoholic || '',
    name: e.strDrink || e.strMeal,
    image: e.strDrinkThumb || e.strMealThumb,
  }
));

export default valuesfavoriteRecipes;
