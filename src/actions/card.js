import uuid from 'uuid/v4';
import moment from 'moment';

export function addCard () {
    return {
        type: 'ADD_CARD',
        payload: {
            name: 'Template 1',
            image: '',
            type: null,
            isactive: 0,
            lastupdate: moment().format('YYYY-MM-DD HH:mm:ss'),
            uuid: uuid(),
        }
    };
}