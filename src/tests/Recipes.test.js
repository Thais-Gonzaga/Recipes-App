import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../../renderWithRouter';
import App from '../App';

describe('testa a rota /meals e /drinks', () => {
  it('verifivca a rota drinks', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });
    expect(screen.getByText('Recipes')).toBeInTheDocument();

    expect(history.location.pathname).toBe('/drinks');
  });

  it('verfica a rota meals', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    expect(screen.getByText('Recipes')).toBeInTheDocument();

    expect(history.location.pathname).toBe('/meals');

    // const btncat = screen.getByTestId('Ordinary Drink-category-filter');

    // expect(btncat).toBeInTheDocument();
  });
});
