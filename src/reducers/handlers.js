const initialState = [{
    id: uuid(),
    slug: 'bonuses2money-conversion',
    name: 'Конвертирование бонусов в деньги',
}, {
    id: uuid(),
    slug: 'money2bonuses-conversion',
    name: 'Конвертирование денег в бонусы',
}, {
    id: uuid(),
    slug: 'write-off-access',
    name: 'Открытие доступа к списанию бонусов',
}, {
    id: uuid(),
    slug: 'discount-calculation',
    name: 'Подсчет скидки',
}, {
    id: uuid(),
    slug: 'holiday-notification',
    name: 'Уведомление о празднике',
}, {
    id: uuid(),
    slug: 'birthday-notification',
    name: 'Уведомление о дне рождении',
}];

const handlers = (state = initialState, action) => {
    switch (action.type) {

        case 'RELOAD_HANDLERS':
            return action.payload;

        default:
            return state;

    }
};