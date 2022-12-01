export const fetchApi = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const fetchDrinkId = async (id) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const { drinks } = await fetchApi(url);
  return drinks;
};

export const fetchMealsId = async (id) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const { meals } = await fetchApi(url);
  return meals;
};
