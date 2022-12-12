import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
// import profileIcon from '../images/profileIcon.svg';
// import searchIcon from '../images/searchIcon.svg';

// import App from '../App';
import Header from '../components/Header';
// import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testes do componente Header', () => {
  test('testa se o componente Header renderiza o ícone de perfil', () => {
    renderWithRouter(<Header title="title" />);
    const profileImage = (screen.getAllByRole('img'))[0];
    expect(profileImage).toHaveAttribute('src', 'profileIcon.svg');
    expect(profileImage).toHaveAttribute('alt', 'profile');
    expect(profileImage).toBeInTheDocument();
  });
  test('testa se o componente Header renderiza o ícone de busca', () => {
    renderWithRouter(<Header title="title" />);
    const profileImage = (screen.getAllByRole('img'))[1];
    expect(profileImage).toHaveAttribute('src', 'searchIcon.svg');
    expect(profileImage).toHaveAttribute('alt', 'search');
    expect(profileImage).toBeInTheDocument();
  });
  test('testa se, ao clicar no ícone de perfil, o usuário é redirecionado para a página de perfil', () => {
    const { history } = renderWithRouter(<Header title="title" />);

    const linkProfile = (screen.getAllByRole('button')[0]);
    userEvent.click(linkProfile);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/profile');
  });
});
