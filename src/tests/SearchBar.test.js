import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import Meals from '../pages/Meals';
import renderWithRouterAndRedux from '../renderWithRouterAndRedux';
import { chickenHandiName, chickenIngredient, letterY } from './mocks/searchBarMocks';

const myStore = {
  recepies: [],
};

describe('Testes para o SearchBar', () => {
  const searchBtnId = 'search-top-btn';
  const searchIpt = 'search-input';
  const searchId = 'exec-search-btn';
  const nameRadio = 'name-search-radio';

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() => (
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(chickenIngredient),
      })
    ));
  });

  it('Testa a presença dos elementos da barra de pesquisa', () => {
    renderWithRouterAndRedux(<Meals />, myStore);
    const searchIcon = screen.getByTestId(searchBtnId);
    userEvent.click(searchIcon);
    expect(screen.getByTestId(searchIpt)).toBeInTheDocument();
    expect(screen.getByTestId('ingredient-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId(nameRadio)).toBeInTheDocument();
    expect(screen.getByTestId('first-letter-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId(searchId)).toBeInTheDocument();
  });
  it('Testa o filtro com ingredientes', async () => {
    act(() => {
      global.alert = jest.fn();
    });
    renderWithRouterAndRedux(<App />, {}, '/meals');
    const searchIcon = screen.getByTestId(searchBtnId);
    userEvent.click(searchIcon);
    const searchInput = screen.getByTestId(searchIpt);
    const ingredientInpt = screen.getByTestId('ingredient-search-radio');
    const searchBtn = screen.getByTestId(searchId);
    userEvent.type(searchInput, 'chicken');
    userEvent.click(ingredientInpt);
    userEvent.click(searchBtn);
    expect(ingredientInpt).toBeChecked();
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');
    screen.logTestingPlaygroundURL();
    expect(await screen.findByText(/brown stew chicken/i)).toBeInTheDocument();
  });
});
describe('Outros mock acontecendo', () => {
  const searchBtnId = 'search-top-btn';
  const searchIpt = 'search-input';
  const searchId = 'exec-search-btn';
  const nameRadio = 'name-search-radio';

  it('Testa o filtro com nome da receita', () => {
    jest.clearAllMocks();
    act(() => {
      jest.spyOn(global, 'fetch').mockImplementation(() => (
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(chickenHandiName.meals),
        })
      ));
      global.alert = jest.fn();
    });
    renderWithRouterAndRedux(<App />, {}, '/meals');
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

  it('Testa o filtro com nome da receita', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(chickenHandiName),
    });
    renderWithRouterAndRedux(<App />, {}, '/meals');
    const searchIcon = screen.getByTestId(searchBtnId);
    userEvent.click(searchIcon);
    const searchInput = screen.getByTestId(searchIpt);
    const nameInput = screen.getByTestId(nameRadio);
    const searchBtn = screen.getByTestId(searchId);
    userEvent.type(searchInput, 'chicken handi');
    userEvent.click(nameInput);
    expect(nameInput).toBeChecked();
    userEvent.click(searchBtn);
    expect(global.fetch).toHaveBeenCalled();
  });
  it('Testa o filtro com a letra inicial', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(letterY),
    });
    renderWithRouterAndRedux(<Meals />, myStore);
    const searchIcon = screen.getByTestId(searchBtnId);
    userEvent.click(searchIcon);
    const searchInput = screen.getByTestId(searchIpt);
    const letterInput = screen.getByTestId('first-letter-search-radio');
    const searchBtn = screen.getByTestId(searchId);
    userEvent.type(searchInput, 'y');
    userEvent.click(letterInput);
    expect(letterInput).toBeChecked();
    userEvent.click(searchBtn);
    expect(global.fetch).toHaveBeenCalled();
  });
});
