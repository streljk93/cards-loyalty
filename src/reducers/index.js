import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import ui from './ui';
import users from './users';
import cards from './cards';
import cardsStore from './cardsStore';
import cardsPersonal from './cardsPersonal';

export default combineReducers({
    routing: routerReducer,
    ui,
    users,
    cards,
    cardsStore,
    cardsPersonal,
});