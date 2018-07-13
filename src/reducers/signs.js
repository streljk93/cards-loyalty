import uuid from 'uuid/v4';

const initialState = [{
    id: uuid(),
    name: '>',
}, {
    id: uuid(),
    name: '=',
}, {
    id: uuid(),
    name: '<',
}, {
    id: uuid(),
    name: '>=',
}, {
    id: uuid(),
    name: '<=',
}];

const signs = (state = initialState, action) => {
    switch (action.type) {

        case 'RELOAD_SIGNS':
            return action.payload;

        default:
            return state;

    }
};