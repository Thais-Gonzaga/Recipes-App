import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import meals from '../../cypress/mocks/meals';
import mealCategories from '../../cypress/mocks/mealCategories';
import { drinks } from '../../cypress/mocks/drinks';
// import App from '../App';
import RecipesProvider from '../context/RecipesProvider';
import Meals from '../pages/Meals';
import renderWithRouterAndRedux from '../renderWithRouterAndRedux';
import { chickenHandiName, chickenIngredient, letterY } from './mocks/searchBarMocks';

const myStore = {
  reducer: {
    recipes: [],
  },
};

describe('Testes para o SearchBar', () => {
  const searchBtnId = 'search-top-btn';
  const searchIpt = 'search-input';
  const searchId = 'exec-search-btn';
  const nameRadio = 'name-search-radio';
  const lettRadio = 'first-letter-search-radio';
  const mealsURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const drinksURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation((url) => (
      Promise.resolve({
        status: 200,
        json: () => {
          console.log(url);
          switch (url) {
          case mealsURL:
            return Promise.resolve(meals);
          case 'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken':
            console.log('entrou');
            return Promise.resolve(chickenIngredient);
          case drinksURL:
            return Promise.resolve(drinks);
          default:
            return Promise.resolve(mealCategories);
          }
        },
      })
    ));
  });

  it('Testa a presença dos elementos da barra de pesquisa', () => {
    renderWithRouterAndRedux(
      (
        <RecipesProvider>
          <Meals />
        </RecipesProvider>
      ), myStore,
    );
    const searchIcon = screen.getByTestId(searchBtnId);
    userEvent.click(searchIcon);
    expect(screen.getByTestId(searchIpt)).toBeInTheDocument();
    expect(screen.getByTestId('ingredient-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId(nameRadio)).toBeInTheDocument();
    expect(screen.getByTestId(lettRadio)).toBeInTheDocument();
    expect(screen.getByTestId(searchId)).toBeInTheDocument();
  });
  it('Testa o filtro com ingredientes', async () => {
    act(() => {
      global.alert = jest.fn();
    });
    renderWithRouterAndRedux(
      (
        <RecipesProvider>
          <Meals />
        </RecipesProvider>
      ), myStore,
      '/meals',
    );
    const firstImg = await screen.findByRole('img', {
      name: /corba/i,
    });
    const firstTag = await screen.findByRole('button', {
      name: /beef/i,
    });

    expect(firstImg).toBeInTheDocument();
    expect(firstTag).toBeInTheDocument();

    const searchIcon = screen.getByTestId(searchBtnId);
    userEvent.click(searchIcon);
    const searchInput = screen.getByTestId(searchIpt);
    const ingredientInpt = screen.getByTestId('ingredient-search-radio');
    const searchBtn = screen.getByTestId(searchId);
    userEvent.type(searchInput, 'chicken');
    userEvent.click(ingredientInpt);
    userEvent.click(searchBtn);
    expect(ingredientInpt).toBeChecked();
    // expect(fetch).toHaveBeenCalled();
    // expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');
    screen.logTestingPlaygroundURL();
    expect(await screen.findByText(/brown stew chicken/i)).toBeInTheDocument();
  });
});
describe('Outros mock acontecendo', () => {
  const searchBtnId = 'search-top-btn';
  const searchIpt = 'search-input';
  const searchId = 'exec-search-btn';
  const nameRadio = 'name-search-radio';
  const lettRadio = 'first-letter-search-radio';
  const mealsURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const drinksURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation((url) => (
      Promise.resolve({
        status: 200,
        json: () => {
          console.log(url);
          switch (url) {
          case mealsURL:
            return Promise.resolve(meals);
          case 'https://www.themealdb.com/api/json/v1/1/search.php?s=chicken handi':
            console.log('entrou');
            return Promise.resolve(chickenHandiName);
          case drinksURL:
            return Promise.resolve(drinks);
          default:
            return Promise.resolve(mealCategories);
          }
        },
      })
    ));
  });
  it('Testa o filtro com nome da receita', () => {
    renderWithRouterAndRedux(
      (
        <RecipesProvider>
          <Meals />
        </RecipesProvider>
      ), myStore,
      '/meals',
    );
    const searchIcon = screen.getByTestId(searchBtnId);
    userEvent.click(searchIcon);
    const searchInput = screen.getByTestId(searchIpt);
    const nameInput = screen.getByTestId(nameRadio);
    const searchBtn = screen.getByTestId(searchId);
    userEvent.type(searchInput, 'chicken handi');
    userEvent.click(nameInput);
    userEvent.click(searchBtn);
    expect(nameInput).toBeChecked();
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=chicken handi');
  });

  describe('Testa com a letra inicial', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    beforeEach(() => {
      jest.spyOn(global, 'fetch').mockImplementation((url) => (
        Promise.resolve({
          status: 200,
          json: () => {
            console.log(url);
            switch (url) {
            case mealsURL:
              return Promise.resolve(meals);
            case 'https://www.themealdb.com/api/json/v1/1/search.php?f=y':
              console.log('entrou');
              return Promise.resolve(letterY);
            case drinksURL:
              return Promise.resolve(drinks);
            default:
              return Promise.resolve(mealCategories);
            }
          },
        })
      ));
    });
    it('Testa o filtro com a letra inicial', async () => {
      renderWithRouterAndRedux(
        (
          <RecipesProvider>
            <Meals />
          </RecipesProvider>
        ), myStore,
      );
      const searchIcon = screen.getByTestId(searchBtnId);
      userEvent.click(searchIcon);
      const searchInput = screen.getByTestId(searchIpt);
      const letterInput = screen.getByTestId(lettRadio);
      const searchBtn = screen.getByTestId(searchId);
      userEvent.type(searchInput, 'y');
      userEvent.click(letterInput);
      expect(letterInput).toBeChecked();
      userEvent.click(searchBtn);
      expect(global.fetch).toHaveBeenCalled();
    });
  });
  describe('Testa o erro de duas letras invés de uma', () => {
    it('Testa o filtro com a letra inicial', async () => {
      renderWithRouterAndRedux(
        (
          <RecipesProvider>
            <Meals />
          </RecipesProvider>
        ), myStore,
      );
      const searchIcon = screen.getByTestId(searchBtnId);
      userEvent.click(searchIcon);
      const searchInput = screen.getByTestId(searchIpt);
      const letterInput = screen.getByTestId(lettRadio);
      const searchBtn = screen.getByTestId(searchId);
      userEvent.type(searchInput, 'yy');
      userEvent.click(letterInput);
      expect(letterInput).toBeChecked();
      userEvent.click(searchBtn);
      expect(global.fetch).toHaveBeenCalled();
    });
  });
});
