import { combineReducers } from 'redux';
import reducer from './reducer';
// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

const myReducer = combineReducers({
  reducer,
});

export default myReducer;
