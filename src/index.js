import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import RecipesProvider from './context/RecipesProvider';
import * as serviceWorker from './serviceWorker';
import AppProvider from './context/AppProvider';
import store from './redux';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <BrowserRouter>
      <RecipesProvider>
        <AppProvider>
          <Provider store={ store }>
            <App />
          </Provider>
        </AppProvider>
      </RecipesProvider>
    </BrowserRouter>,
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
