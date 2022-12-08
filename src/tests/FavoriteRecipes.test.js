import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouterAndRedux from '../renderWithRouterAndRedux';

describe('Testes da pagina de Receitas favoritas', () => {
  const favPath = '/favorite-recipes';
  const favoriteRecipes = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    },
  ];

  beforeEach(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('testa os elementos na pagina', () => {
    renderWithRouterAndRedux(<App />, {}, favPath);
    expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-meal-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-drink-btn')).toBeInTheDocument();
    expect(screen.getByRole('heading', {
      name: /spicy arrabiata penne/i,
    })).toBeInTheDocument();
    expect(screen.getByRole('heading', {
      name: /aquamarine/i,
    })).toBeInTheDocument();
  });

  it('Testa o button allFilter, Meals e Drinks filter', () => {
    renderWithRouterAndRedux(<App />, {}, favPath);
    const allBtn = screen.getByTestId('filter-by-all-btn');
    const mealBtn = screen.getByTestId('filter-by-meal-btn');
    const drinkBtn = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(mealBtn);
    const penne = screen.getByRole('heading', {
      name: /spicy arrabiata penne/i,
    });
    expect(penne).toBeInTheDocument();
    userEvent.click(drinkBtn);
    const marine = screen.getByRole('heading', {
      name: /aquamarine/i,
    });
    expect(marine).toBeInTheDocument();
    userEvent.click(allBtn);
    expect(marine).toBeInTheDocument();
    expect(penne).toBeInTheDocument();
  });
  it('Testa o shareBtn', () => {
    window.document.execCommand = jest.fn(() => true);
    renderWithRouterAndRedux(<App />, {}, favPath);
    global.alert = jest.fn();
    act(() => {
    });
    const shareBtn = screen.getByTestId('0-horizontal-share-btn');
    expect(shareBtn).toBeInTheDocument();
    userEvent.click(shareBtn);
    const loading = screen.getByRole('heading', {
      name: /link copied!/i,
    });
    expect(global.alert).toHaveBeenCalled();
    expect(loading).toBeInTheDocument();
  });
  it('Testa o shareBtn', () => {
    window.document.execCommand = jest.fn(() => true);
    renderWithRouterAndRedux(<App />, {}, favPath);
    global.alert = jest.fn();
    act(() => {
    });
    const shareBtn = screen.getByTestId('1-horizontal-share-btn');
    expect(shareBtn).toBeInTheDocument();
    userEvent.click(shareBtn);
    const loading = screen.getByRole('heading', {
      name: /link copied!/i,
    });
    expect(global.alert).toHaveBeenCalled();
    expect(loading).toBeInTheDocument();
  });

  it('Testa o favorite Button', () => {
    renderWithRouterAndRedux(<App />, {}, favPath);
    const favBtn = screen.getByTestId('0-horizontal-favorite-btn');
    userEvent.click(favBtn);
    expect(screen.getByRole('heading', {
      name: /aquamarine/i,
    })).toBeInTheDocument();
  });
});
