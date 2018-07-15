import uuid from 'uuid/v4';
import moment from 'moment';

const initialState = [{
    id: uuid(),
    image: 'https://tourisminchina.ru/app/uploads/2015/04/Gora-Dzhomolungma.jpg',
    qr: '',
    name: 'Бонусная карта',
    description: 'Позволяет потребителям копить баллы за совершенные в магазинах покупки, а также, при наличии достаточного количества баллов, расплачиваться ими наряду с деньгами',
}, {
    id: uuid(),
    image: 'http://rk.karelia.ru/wp-content/uploads/2016/05/More.jpg',
    qr: '',
    name: 'Дисконтная карта',
    description: 'Возможность получение потребителем скидки в торговых точках продавца (-ов) или участников дисконтного клуба при соблюдении правил использования дисконтных карт',
}];

const cards = (state = initialState, action) => {
    switch (action.type) {

        case 'RELOAD_CARDS':
            return action.payload;

        default:
            return state;

    }
}

export default cards;