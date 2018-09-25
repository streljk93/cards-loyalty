import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import ui from './ui';
import cardType from './cardType';
import cardStore from './cardStore';
import rule from './rule';
import ruleType from './ruleType';
import action from './action';

export default combineReducers({
    routing: routerReducer,
    ui,
    cardType,
    cardStore,
    rule,
    ruleType,
    action,
    handler,
    ruleCardStore,
});