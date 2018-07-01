import uuid from 'uuid/v4';
import moment from 'moment';

export function addCardPersonal ({ user, card }) {
    return {
        type: 'ADD_CARD_PERSONAL',
        payload: {
            user,
            card,
            number: null,
            value: null,
            isactive: 0,
            lastupdated: moment().format('YYYY-MM-DD HH:mm:ss'),
            uuid: uuid(),
        }
    }
}