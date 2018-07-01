import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import users from './users';
import cards from './cards';
import cardsPersonal from './cardsPersonal';

export default combineReducers({
    routing: routerReducer,
    users,
    cards,
    cardsPersonal,
});