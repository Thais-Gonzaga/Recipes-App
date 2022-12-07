import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Meals from '../pages/Meals';
import { renderWithRouterAndRedux } from '../renderWithRouterAndRedux';
import { chickenHandiName, chickenIngredient, letterY } from './mocks/searchBarMocks';

const myStore = {
  recepies: [],
};

describe('Testes para o SearchBar', () => {
  // const testIdZero = '0-card-name';
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
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(chickenIngredient),
    });
    renderWithRouterAndRedux(<Meals />, myStore);
    const searchIcon = screen.getByTestId(searchBtnId);
    userEvent.click(searchIcon);
    const searchInput = screen.getByTestId(searchIpt);
    const ingredientInpt = screen.getByTestId('ingredient-search-radio');
    const searchBtn = screen.getByTestId(searchId);
    userEvent.type(searchInput, 'chicken');
    userEvent.click(ingredientInpt);
    act(() => {
      userEvent.click(searchBtn);
    });
    expect(ingredientInpt).toBeChecked();
    expect(global.fetch).toHaveBeenCalled();
  });
  // screen.logTestingPlaygroundURL();
  // expect(await screen.findByText(/Brown Stew Chicken/i)).toBeInTheDocument();
  it('Checa os elementos na tela', () => {

  });

  it.skip('Testa o filtro com nome da receita', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(chickenHandiName),
    });
    renderWithRouterAndRedux(<Meals />, myStore);
    const searchIcon = screen.getByTestId(searchBtnId);
    userEvent.click(searchIcon);
    const searchInput = screen.getByTestId(searchIpt);
    const nameInput = screen.getByTestId('name-search-radio');
    const searchBtn = screen.getByTestId(searchId);
    userEvent.type(searchInput, 'Chicken Handi');
    userEvent.click(nameInput);
    expect(nameInput).toBeChecked();
    userEvent.click(searchBtn);
    expect(global.fetch).toHaveBeenCalled();
  });
  it.skip('Testa o filtro com a letra inicial', async () => {
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
