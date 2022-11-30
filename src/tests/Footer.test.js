import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Footer from '../components/Footer';

describe('Testes para página Footer', () => {
  it('verifique se a pagina Footer tem as imagens', () => {
    renderWithRouter(<Footer />);
    const imgDrink = screen.getByTestId('drinks-bottom-btn');
    const imgMeals = screen.getByTestId('meals-bottom-btn');

    expect(imgDrink).toBeInTheDocument();
    expect(imgMeals).toBeInTheDocument();
    expect(imgDrink).toHaveAttribute('src', 'drinkIcon.svg');
    expect(imgDrink).toHaveAttribute('alt', 'drink icon');
    expect(imgMeals).toHaveAttribute('src', 'mealIcon.svg');
    expect(imgMeals).toHaveAttribute('alt', 'meal Icon');
  });
  it('verifique se ao clicar nas imagem drink será redirecionada', () => {
    const { history } = renderWithRouter(<Footer />);

    const imgDrink = screen.getByTestId('drinks-bottom-btn');
    expect(imgDrink).toBeInTheDocument();

    userEvent.click(imgDrink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/drinks');
  });
  it('verifique se ao clicar nas imagem meals será redirecionada', () => {
    const { history } = renderWithRouter(<Footer />);

    const imgMeals = screen.getByTestId('meals-bottom-btn');
    expect(imgMeals).toBeInTheDocument();

    userEvent.click(imgMeals);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/meals');
  });
});
