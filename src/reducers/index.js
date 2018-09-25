import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import ui from './ui';
import cardType from './cardType';
import cardStore from './cardStore';
import rule from './rule';
import ruleType from './ruleType';
import action from './action';

// const tree = {
//     ui: {
//         messages: [{
//             code: 404,
//
//         }]
//     },
//     cardType: {
//         selected: 1,
//         data: [{
//             id: 1,
//             slug: 'bonus',
//             image: 'https://image.ru/img.jpeg',
//             name: 'Бонусная карта',
//             description: 'Desc...',
//             qrcode: 'qr',
//         }],
//         meta: {
//             isFetching: false,
//             receivedAt: 2342432,
//         },
//     },
//     cardStore: {
//         data: [{
//             id: 1,
//             card_type_id: 1,
//             store_id: 1,
//             image: '',
//         }],
//         meta: {
//             isFetching: false,
//             receivedAt: 23424234,
//         },
//     },
//     cardUser: [{
//         id: 1,
//         card_store_id: 1,
//         user_id: 1,
//         number: 1,
//     }],
//     user: [{
//         store_id: 1,
//         info: 'adfasf',
//     }],
//     store: {
//         id: 1,
//         slug: 'jk',
//         name: 'JK Magazine',
//         token: 'JWT ==akdjfkadfsfjadjafja.sadfaskdfj.sasadfasdf',
//     },
// };

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