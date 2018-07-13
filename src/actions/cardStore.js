import uuid from 'uuid/v4';
import moment from 'moment';

export function addCardStore (image, qr, title, content, type) {
    return {
        type: 'ADD_CARD',
        payload: {
            id: uuid(),
            image,
            qr,
            title,
            content,
            type,
            isactive: 0,
            date: moment().format('YYYY-MM-DD HH:mm:ss'),
            lastupdated: null,
        }
    };
}