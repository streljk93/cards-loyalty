import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import account from './account';
import ui from './ui';
import cardType from './cardType';
import cardStore from './cardStore';
import rule from './rule';
import ruleType from './ruleType';
import action from './action';
import handler from './handler';
import ruleCardStore from './ruleCardStore';
import ruleCardType from './ruleCardType';
import media from './media';
import store from './store';
import user from './user';
import cardUser from './cardUser';

export default combineReducers({
    routing: routerReducer,
    ui,
    account,
    cardType,
    cardStore,
    rule,
    ruleType,
    action,
    handler,
    ruleCardStore,
    ruleCardType,
    media,
    store,
    user,
});