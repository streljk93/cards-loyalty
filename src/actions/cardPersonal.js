import uuid from 'uuid/v4';
import moment from 'moment';

export function addCardPersonal ({ user, card }) {
    return {
        type: 'ADD_CARD_PERSONAL',
        payload: {
            id: uuid(),
            user,
            card,
            number: null,
            value: null,
            isactive: 0,
            date: moment().format('YYYY-MM-DD HH:mm:ss'),
            lastupdated: null,
        }
    }
}