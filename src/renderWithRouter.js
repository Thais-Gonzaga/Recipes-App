import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import AppProvider from './context/AppProvider';

const renderWithRouter = (component, path) => {
  const history = createMemoryHistory();
  history.push(path);
  return ({
    ...render(
      <Router history={ history }>
        <AppProvider>
          {component}
        </AppProvider>
      </Router>,
    ),
    history,
  });
};

export default renderWithRouter;
