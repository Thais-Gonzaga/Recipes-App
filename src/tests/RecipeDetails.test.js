import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import RecipeDetails from '../pages/RecipeDetails';

describe('Testes para página RecipeDetails', () => {
  it('verifique se a pagina tem os elementos de detalhes', () => {
    renderWithRouter(<RecipeDetails />);
    const img = screen.getByTestId('recipe-photo');
    const title = screen.getByTestId('recipe-title');
    const category = screen.getByTestId('recipe-category');
    const instructions = screen.getByTestId('instructions');
    const btnStart = screen.getByTestId('start-recipe-btn');

    expect(img).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(btnStart).toBeInTheDocument();
    // expect(ingredient).toBeInTheDocument();
  });
});
