import React from 'react';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from '../renderWithRouter';
import Profile from '../pages/Profile';
import AppProvider from '../context/AppProvider';
import Login from '../pages/Login';

const testEmail = 'trybe@trybe.com';
const testPassoword = '1234567';

describe('Testar a página Profile', () => {
  it('Teste o direcionamento da rota /done-recipes', async () => {
    const { history } = RenderWithRouter(<Profile />);

    const DataTest = screen.getByTestId('profile-done-btn');
    expect(DataTest).toBeInTheDocument();

    act(() => {
      userEvent.click(DataTest);
    });
    await waitFor(() => expect(history.location.pathname).toBe('/done-recipes'));
  });

  it('Teste o direcionamento da rota /favorites-recipes', async () => {
    const { history } = RenderWithRouter(<Profile />);

    const DataTest = screen.getByTestId('profile-favorite-btn');
    act(() => {
      userEvent.click(DataTest);
    });
    await waitFor(() => expect(history.location.pathname).toBe('/favorite-recipes'));
    // history.push('/favorite-recipes');
    // expect(screen.getByText('Rota Favorites Recipes')).toBeInTheDocument();
  });

  it('Teste o direcionamento da rota /', async () => {
    const { history } = RenderWithRouter(<Profile />);

    const DataTest = screen.getByTestId('profile-logout-btn');
    act(() => {
      userEvent.click(DataTest);
    });
    await waitFor(() => expect(history.location.pathname).toBe('/'));
  });

  it('', async () => {
    const { history } = RenderWithRouter(
      <AppProvider>
        <Login />
      </AppProvider>,
    );
    const emailInput = screen.getByLabelText(/email:/i);
    const passInput = screen.getByLabelText(/Passoword:/i);
    const fetchButton = screen.getByRole('button', { name: /Enter/i });

    expect(emailInput).toBeInTheDocument();
    expect(passInput).toBeInTheDocument();
    expect(fetchButton).toBeInTheDocument();

    userEvent.type(emailInput, testEmail);
    userEvent.type(passInput, testPassoword);
    act(() => {
      userEvent.click(fetchButton);
    });
    await waitFor(() => expect(history.location.pathname).toBe('/meals'));
    const save = JSON.parse(localStorage.getItem('user'));
    expect(save).not.toBeNull();

    RenderWithRouter(<Profile />);

    const DataTest = screen.getByTestId('profile-logout-btn');
    act(() => {
      userEvent.click(DataTest);
    });
    const save2 = JSON.parse(localStorage.getItem('user'));
    expect(save2).toBeNull();
  });

  // it('Testa se o email do é exibido', () => {
  //   const { history } = RenderWithRouter(<Profile />);

  //   const emailInput = screen.getByText('user');

  //   userEvent.type(emailInput, testEmail);
  //   history.push('/profile');

  //   expect(screen.getByText(testEmail)).toBeInTheDocument();
  // });

  // it('Teste se a página contém três botões', () => {
  //   const { history } = RenderWithRouter(<Profile />);

  //   history.push('/profile');
  //   expect(screen.getAllByRole('button')).toHaveLength(testBtn);
  // });
});
