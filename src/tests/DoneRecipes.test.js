import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import DoneRecipes from '../pages/DoneRecipes';

describe('testes da página de receitas feitas', () => {
  // https://javascript.plainenglish.io/testing-local-storage-with-testing-library-580f74e8805b
  // https://robertmarshall.dev/blog/how-to-mock-local-storage-in-jest-tests/
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
  const mockDoneRecipes = (function () {
    let store = {};

    return {
      getItem(key) {
        return store[key];
      },

      setItem(key, value) {
        store[key] = value;
      },

      clear() {
        store = {};
      },

      removeItem(key) {
        delete store[key];
      },

      getAll() {
        return store;
      },
    };
  }());

  Object.defineProperty(window, 'localStorage', {
    value: mockDoneRecipes,
  });

  const setLocalStorage = (id, data) => {
    window.localStorage.setItem(id, JSON.stringify(data));
  };
  setLocalStorage('doneRecipes', recipes);
  JSON.parse(localStorage.getItem('doneRecipes'));
  test('testa se a página renderiza os botões de filtro', () => {
    render(<DoneRecipes />);
    const allButton = screen.getByRole('button', { name: 'All' });
    const mealsButton = screen.getByRole('button', { name: 'Meals' });
    const drinksButton = screen.getByRole('button', { name: 'Drinks' });

    expect(allButton).toBeInTheDocument();
    expect(mealsButton).toBeInTheDocument();
    expect(drinksButton).toBeInTheDocument();
  });

  test('testa se os dados de Receitas Feitas são acessados no local storage', () => {
    render(<DoneRecipes />);
    expect(localStorage.getItem('doneRecipes')).toEqual(JSON.stringify(recipes));
    // expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
  });
  test('testa se o filtro "Meals" funciona corretamente', () => {
    render(<DoneRecipes />);
    const doneRecipesList = screen.getAllByRole('heading', { level: 3 });
    expect(doneRecipesList).toHaveLength(2);
    const mealsButton = screen.getByRole('button', { name: 'Meals' });
    userEvent.click(mealsButton);
    const doneRecipesListFiltered = screen.getAllByRole('heading', { level: 3 });
    expect(doneRecipesListFiltered).toHaveLength(1);
  });
  test('testa se o filtro "Drinks" funciona corretamente', () => {
    render(<DoneRecipes />);
    const doneRecipesList = screen.getAllByRole('heading', { level: 3 });
    expect(doneRecipesList).toHaveLength(2);
    const drinksButton = screen.getByRole('button', { name: 'Drinks' });
    userEvent.click(drinksButton);
    const doneRecipesListFiltered = screen.getAllByRole('heading', { level: 3 });
    expect(doneRecipesListFiltered).toHaveLength(1);
  });
  test('testa se o filtro "All" funciona corretamente', () => {
    render(<DoneRecipes />);
    const doneRecipesList = screen.getAllByRole('heading', { level: 3 });
    expect(doneRecipesList).toHaveLength(2);
    const drinksButton = screen.getByRole('button', { name: 'Drinks' });
    userEvent.click(drinksButton);
    const doneRecipesListFiltered = screen.getAllByRole('heading', { level: 3 });
    expect(doneRecipesListFiltered).toHaveLength(1);
    const allButton = screen.getByRole('button', { name: 'All' });
    userEvent.click(allButton);
    const doneRecipesListFilteredAll = screen.getAllByRole('heading', { level: 3 });
    expect(doneRecipesListFilteredAll).toHaveLength(2);
  });
  test('testa se ao clicar na imagem da receita, o usuário é redirecionado para a página de detalhes', () => {
    const { history } = renderWithRouter(<DoneRecipes />);
    const recipeOne = screen.getByTestId('0-horizontal-image');
    userEvent.click(recipeOne);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals/52977');
  });
  test('testa se ao clicar no nome da receita, o usuário é redirecionado para a página de detalhes', () => {
    const { history } = renderWithRouter(<DoneRecipes />);
    const recipeOne = screen.getByTestId('0-horizontal-name');
    userEvent.click(recipeOne);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals/52977');
  });
});
