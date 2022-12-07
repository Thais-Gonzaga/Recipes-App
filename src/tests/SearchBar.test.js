import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
// import AppProvider from '../context/AppProvider';
import App from '../App';
// import searchAPIs from '../components/helpers/doTheFetch';
import Meals from '../pages/Meals';
import renderWithRouterAndRedux from '../renderWithRouterAndRedux';
import { chickenHandiName, chickenIngredient, letterY } from './mocks/searchBarMocks';

const myStore = {
  recepies: [],
};

describe('Testes para o SearchBar', () => {
  // const testIdZero = '0-card-name';
  const searchBtnId = 'search-top-btn';
  const searchIpt = 'search-input';
  const searchId = 'exec-search-btn';
  const nameRadio = 'name-search-radio';

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
    jest.clearAllMocks();
    act(() => {
      jest.spyOn(global, 'fetch').mockImplementation(() => (
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve(chickenIngredient.meals),
        })
      ));
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
  });

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
    renderWithRouterAndRedux(<Meals />, myStore);
    // ------
    // jest.clearAllMocks();
    // act(() => {
    //   jest.spyOn(global, 'fetch').mockImplementation(() => (
    //     Promise.resolve({
    //       status: 200,
    //       json: () => Promise.resolve(chickenHandiName.meals),
    //     })
    //   ));
    //   global.alert = jest.fn();
    // });
    // renderWithRouterAndRedux(<App />, {}, '/meals');
    // ----------
    // jest.mock(searchAPIs, () => [chickenHandiName.meals]);
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
    // expect(screen.findByTestId('0-card-name')).toBeInTheDocument();
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
