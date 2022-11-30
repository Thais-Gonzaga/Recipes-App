import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
// import profileIcon from '../images/profileIcon.svg';
// import searchIcon from '../images/searchIcon.svg';

// import App from '../App';
import Header from '../components/Header';
// import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Header page tests', () => {
  test('tests if the Header page contains a profile icon', () => {
    renderWithRouter(<Header title="title" />);
    const profileImage = (screen.getAllByRole('img'))[0];
    expect(profileImage).toHaveAttribute('src', 'profileIcon.svg');
    expect(profileImage).toHaveAttribute('alt', 'profile');
    expect(profileImage).toBeInTheDocument();
  });
  test('tests if the Header page contains a search icon', () => {
    renderWithRouter(<Header title="title" />);
    const profileImage = (screen.getAllByRole('img'))[1];
    expect(profileImage).toHaveAttribute('src', 'searchIcon.svg');
    expect(profileImage).toHaveAttribute('alt', 'search');
    expect(profileImage).toBeInTheDocument();
  });
  test('tests if the when clicking the profile icon, the user is redirected to the profile page', () => {
    const { history } = renderWithRouter(<Header title="title" />);

    const linkProfile = (screen.getAllByRole('button')[0]);
    userEvent.click(linkProfile);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/profile');
  });
});
