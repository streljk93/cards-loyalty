import uuid from 'uuid/v4';

const initialState = [{
    id: uuid(),
    slug: 'card-creating',
    name: 'Оформление карты',
}, {
    id: uuid(),
    slug: 'card-display',
    name: 'Отображение карты',
}, {
    id: uuid(),
    slug: 'card-write-off',
    name: 'Списание с карты',
}, {
    id: uuid(),
    slug: 'card-replenishment',
    name: 'Пополнение карты',
}, {
    id: uuid(),
    slug: 'card-using',
    name: 'Использование карты',
}, {
    id: uuid(),
    slug: 'birthday',
    name: 'День рождение',
}, {
    id: uuid(),
    slug: 'holiday',
    name: 'Праздник',
}, {
    id: uuid(),
    slug: 'target-date',
    name: 'Определенная дата',
}];

const actions = (state = initialState, action) => {
    switch (action.type) {

        case 'RELOAD_ACTIONS':
            return action.payload;

        default:
            return state;

    }
};

export default actions;