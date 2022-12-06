import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import mealsByIngredient from '../../cypress/mocks/mealsByIngredient';
import Meals from '../pages/Meals';
import { renderWithRouterAndRedux } from '../renderWithRouterAndRedux';
import { chickenHandiName, chickenIngredient, letterY } from './mocks/searchBarMocks';

const myStore = {
  recepies: [],
};

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(mealsByIngredient),
    }));
};

describe('Testes para o SearchBar', () => {
  const testIdZero = '0-card-name';
  const searchBtnId = 'search-top-btn';
  const searchIpt = 'search-input';
  const searchId = 'exec-search-btn';

  it('Testa a presença dos elementos da barra de pesquisa', () => {
    renderWithRouterAndRedux(<Meals />, myStore);
    const searchIcon = screen.getByTestId(searchBtnId);
    userEvent.click(searchIcon);
    expect(screen.getByTestId(searchIpt)).toBeInTheDocument();
    expect(screen.getByTestId('ingredient-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId('name-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId('first-letter-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId(searchId)).toBeInTheDocument();
  });
  it('Testa o filtro com ingredientes', async () => {
    global.fetch = jest.fn().mockResolvedValue(
      Promise.resolve({ json: () => Promise.resolve(chickenIngredient) }),
    );
    renderWithRouterAndRedux(<Meals />, myStore);
    const searchIcon = screen.getByTestId(searchBtnId);
    userEvent.click(searchIcon);
    const searchInput = screen.getByTestId(searchIpt);
    const ingredientInpt = screen.getByTestId('ingredient-search-radio');
    const searchBtn = screen.getByTestId(searchId);
    userEvent.type(searchInput, 'chicken');
    userEvent.click(ingredientInpt);
    // ingredientInpt.checked = true;
    userEvent.click(searchBtn);
    screen.logTestingPlaygroundURL();
    // expect(global.fetch).toHaveBeenCalled();
    expect(await screen.findByTestId(testIdZero)).toBeInTheDocument();
  });
  it.skip('Testa o filtro com nome da receita', async () => {
    renderWithRouterAndRedux(<Meals />, myStore);
    const searchIcon = screen.getByTestId(searchBtnId);
    userEvent.click(searchIcon);
    const searchInput = screen.getByTestId(searchIpt);
    const nameInput = screen.getByTestId('name-search-radio');
    const searchBtn = screen.getByTestId(searchId);
    userEvent.type(searchInput, 'Chicken Handi');
    nameInput.checked = true;
    userEvent.click(searchBtn);
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn()
      .mockResolvedValue(Promise.resolve({
        json: () => Promise.resolve(chickenHandiName),
        ok: true,
      }));
    screen.logTestingPlaygroundURL();
    expect(global.fetch).toHaveBeenCalled();
    expect(await screen.findByTestId(testIdZero)).toBeInTheDocument();
  });
  it.skip('Testa o filtro com a letra inicial', async () => {
    renderWithRouterAndRedux(<Meals />, myStore);
    const searchIcon = screen.getByTestId(searchBtnId);
    userEvent.click(searchIcon);
    const searchInput = screen.getByTestId(searchIpt);
    const letterInput = screen.getByTestId('first-letter-search-radio');
    const searchBtn = screen.getByTestId(searchId);
    userEvent.type(searchInput, 'y');
    letterInput.checked = true;
    userEvent.click(searchBtn);
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn()
      .mockResolvedValue(Promise.resolve({
        json: () => Promise.resolve(letterY),
        ok: true,
      }));
    screen.logTestingPlaygroundURL();
    expect(global.fetch).toHaveBeenCalled();
    expect(await screen.findByTestId(testIdZero)).toBeInTheDocument();
  });
});
