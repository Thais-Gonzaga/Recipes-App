import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from '../renderWithRouter';
import Profile from '../pages/Profile';

const testEmail = 'trybe@trybe.com';

describe('Testar a página Profile', () => {
  it('Teste o direcionamento da rota /done-recipes', () => {
    const { history } = RenderWithRouter(<Profile />);

    const DataTest = screen.getByTestId('profile-done-btn');

    act(() => {
      const test = history.pathname;
      userEvent.click(DataTest);
      console.log(test);
    });
    expect(history.pathname).toEqual('/done-recipes');
    // expect(screen.getByText('Done Recipes')).toBeInTheDocument();
  });

  it('Teste o direcionamento da rota /favorites-recipes', () => {
    const { history } = RenderWithRouter(<Profile />);

    const DataTest = screen.getByTestId('profile-favorite-btn');
    userEvent.click(DataTest);
    history.push('/favorite-recipes');
    expect(screen.getByText('Rota Favorites Recipes')).toBeInTheDocument();
  });

  it('Teste o direcionamento da rota /', () => {
    const { history } = RenderWithRouter(<Profile />);

    const DataTest = screen.getByTestId('profile-logout-btn');
    userEvent.click(DataTest);
    history.push('/');
  });
  it('Testa se o email do é exibido', () => {
    const { history } = RenderWithRouter(<Profile />);

    const emailInput = screen.getByText('user');

    userEvent.type(emailInput, testEmail);
    history.push('/profile');

    expect(screen.getByText(testEmail)).toBeInTheDocument();
  });

  it('Teste se a página contém três botões', () => {
    const { history } = RenderWithRouter(<Profile />);

    history.push('/profile');
    expect(screen.getAllByRole('button')).toHaveLength(testBtn);
  });
});
