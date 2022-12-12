import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import RecipeDetails from '../pages/RecipeDetails';
import oneDrink from '../../cypress/mocks/oneDrink';
import drinks from '../../cypress/mocks/drinks';
import meals from '../../cypress/mocks/meals';
import oneMeal from '../../cypress/mocks/oneMeal';
import { doneRecipes, inProgressRecipes, nullInprogress } from './mocks/LocalStorege';

jest.mock('clipboard-copy');

const white = 'whiteHeartIcon.svg';

describe('Testes para página RecipeDetails', () => {
  it('verifique se a pagina tem os elementos de detalhes da comida', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(nullInprogress));
    global.fetch = jest.fn()
      .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(drinks),
      }))
      .mockImplementationOnce(
        () => Promise.resolve({ json: () => Promise.resolve(oneMeal),
        }),
      );

    await act(async () => {
      renderWithRouter(
        <RecipeDetails />,
      );
    });

    expect(global.fetch).toHaveBeenCalled();

    const img = screen.getByTestId('recipe-photo');
    const title = screen.getByTestId('recipe-title');
    const category = screen.getByTestId('recipe-category');
    const instructions = screen.getByTestId('instructions');
    const btnStart = screen.getByTestId('start-recipe-btn');
    const ingredient = screen.getByTestId('1-ingredient-name-and-measure');
    const savefavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const btnFavorite = screen.getByTestId('favorite-btn');

    expect(img).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(btnStart).toBeInTheDocument();
    expect(ingredient).toBeInTheDocument();
    expect(btnFavorite).toBeInTheDocument();
    expect(savefavoriteRecipes).toBeNull();
    expect(btnFavorite).toHaveAttribute('src', white);

    act(() => {
      userEvent.click(btnFavorite);
    });

    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toHaveLength(1);
    expect(btnFavorite).toHaveAttribute('src', 'blackHeartIcon.svg');

    act(() => {
      userEvent.click(screen.getAllByRole('img')[1]);
    });
    expect(btnFavorite).toHaveAttribute('src', white);

    const btnShare = screen.getByTestId('share-btn');
    act(() => {
      userEvent.click(btnShare);
    });

    await waitFor(() => expect(screen.getByText('Link copied!')).toBeInTheDocument());
    const btn = screen.getByTestId('start-recipe-btn');
    expect(btn).toBeInTheDocument();
    act(() => {
      userEvent.click(btn);
    });
  });

  it('verifique se a pagina renderiza drinks', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
    global.fetch = jest.fn()
      .mockImplementationOnce(
        () => Promise.resolve({ json: () => Promise.resolve(meals) }),
      )
      .mockImplementationOnce(
        () => Promise.resolve({ json: () => Promise.resolve(oneDrink),
        }),
      );

    renderWithRouter(
      <RecipeDetails />,
      '/drinks',
    );

    expect(global.fetch).toHaveBeenCalled();
    await waitFor(() => expect(screen.getByTestId('0-ingredient-name-and-measure')).toBeInTheDocument());
    expect(screen.getByTestId('0-ingredient-name-and-measure')).toBeInTheDocument();
    const btnShare = screen.getByTestId('share-btn');
    act(() => {
      userEvent.click(btnShare);
    });
  });
});
