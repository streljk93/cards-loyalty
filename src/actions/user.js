import uuid from 'uuid/v4';

export function addUser({ site_id }) {
    return {
        type: 'ADD_USER',
        payload: {
            id: uuid(),
            site_id,
            firstname: 'firstname',
            middlename: 'middlename',
            lastname: 'lastname',
            dob: null,
            gender: null,
            email: null,
            phone: null,
            password: null,
            lastlogin: null,
        },
    };
}