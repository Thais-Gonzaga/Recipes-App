import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';

function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={ (props) => <Login { ...props } /> }
      />
      <Route
        exact
        path="/meals"
        render={ (props) => <Meals { ...props } /> }
      />
      <Route
        exact
        path="/drinks"
        render={ (props) => <Drinks { ...props } /> }
      />
      <Route
        exact
        path="/meals/:id/in-progress"
        render={ (props) => <RecipeInProgress { ...props } /> }
      />
      <Route
        exact
        path="/drinks/:id/in-progress"
        render={ (props) => <RecipeInProgress { ...props } /> }
      />
      <Route
        exect
        path="/meals/:id"
        render={ (props) => <RecipeDetails { ...props } /> }
      />
      <Route
        exact
        path="/drinks"
        render={ (props) => <Drinks { ...props } /> }
      />
      <Route
        path="/drinks/:id"
        render={ (props) => <RecipeDetails { ...props } /> }
      />
      <Route
        path="/Profile"
        render={ (props) => <Profile { ...props } /> }
      />
      <Route
        path="/done-recipes"
        render={ (props) => <DoneRecipes { ...props } /> }
      />
      <Route
        path="/favorite-recipes"
        render={ (props) => <FavoriteRecipes { ...props } /> }
      />
    </Switch>
  );
}

export default App;
