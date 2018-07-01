import uuid from 'uuid/v4';
import moment from 'moment';

export function addUser() {
    return {
        type: 'ADD_USER',
        payload: {
            firstname: 'firstname',
            middlename: 'middlename',
            lastname: 'lastname',
            dob: null,
            gender: null,
            email: null,
            phone: null,
            lastlogin: moment().format('YYYY-MM-DD HH:mm:ss'),
            isactive: 0,
            lastupdated: moment().format('YYYY-MM-DD HH:mm:ss'),
            uuid: uuid(),
        },
    };
}