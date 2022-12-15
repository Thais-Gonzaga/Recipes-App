import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import AppProvider from '../context/AppProvider';
import RecipesProvider from '../context/RecipesProvider';
import renderWithRouterAndRedux from '../renderWithRouterAndRedux';

const urls = ['/Profile', '/meals', '/favorite-recipes', '/done-recipes', '/drinks',
  '/meals/:id/in-progress', '/drinks/:id/in-progress', '/meals/:id', '/drinks/:id'];

describe('teste o componente <App.js />', () => {
  it('Teste se a APP renderiza rotas', () => {
    const { history } = renderWithRouterAndRedux(
      <RecipesProvider>
        <AppProvider>
          <App />

        </AppProvider>
      </RecipesProvider>,
    );
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
    urls.forEach((url, index) => {
      console.log(index, url);
      act(() => {
        history.push(url);
      });
      const { location: { pathname: pat } } = history;
      console.log('pat', pat);
      expect(pat).toBe(url);
    });
  });
});
