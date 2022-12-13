import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
// import profileIcon from '../images/profileIcon.svg';
// import searchIcon from '../images/searchIcon.svg';

// import App from '../App';
import Header from '../components/Header';
import App from '../App';
// import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Header page tests', () => {
  test('tests if the Header page contains a profile icon', () => {
    renderWithRouter(<Header title="title" />);
    const profileImage = (screen.getAllByRole('img'))[0];
    expect(profileImage).toHaveAttribute('src', 'profileIcon.svg');
    expect(profileImage).toHaveAttribute('alt', 'profile');
    expect(profileImage).toBeInTheDocument();
  });
  it('verifique se a pagina Footer tem as imagens', () => {
    renderWithRouter(<App />);
    const imgDrink = screen.getByTestId('recipe-photo');
    // const imgMeals = screen.getByTestId('meals-bottom-btn');

    expect(imgDrink).toBeInTheDocument();
  });
});
