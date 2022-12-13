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
    renderWithRouter(<Header title="title" isSearchOn={ false } />);
    const profileImage = (screen.getAllByRole('img'))[0];
    expect(profileImage).toHaveAttribute('src', 'profileIcon.svg');
    expect(profileImage).toHaveAttribute('alt', 'profile');
    expect(profileImage).toBeInTheDocument();
  });
  test('testa se o componente Header renderiza o ícone de busca', () => {
    renderWithRouter(<Header title="title" isSearchOn />);
    const profileImage = (screen.getAllByRole('img'))[1];
    expect(profileImage).toHaveAttribute('src', 'searchIcon.svg');
    expect(profileImage).toHaveAttribute('alt', 'search');
    expect(profileImage).toBeInTheDocument();
  });
  test('testa se, ao clicar no ícone de perfil, o usuário é redirecionado para a página de perfil', () => {
    const { history } = renderWithRouter(<Header title="title" isSearchOn={ false } />);

    const linkProfile = (screen.getAllByRole('button')[0]);
    userEvent.click(linkProfile);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/profile');
  });
  // test('testa se, ao clicar no ícone de busca, o searchBar é renderizado na tela', () => {
  //   renderWithRouter(<Header title="title" isSearchOn />);

  //   const linkSearch = screen.getByTestId('search-top-btn');
  //   userEvent.click(linkSearch);
  //   const searchBar = screen.findByTestId('exec-search-btn');
  //   expect(searchBar).toBeInTheDocument();
  // });
  test('defaultProps togglesearchBar', () => {
    const result = Header.defaultProps.toggleSearchBar();
    expect(result).toBe(false);
  });
});
