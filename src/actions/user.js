import uuid from 'uuid/v4';
import { startCommonLoader, stopCommonLoader } from "./ui";
import axios from 'axios';

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

function requestUser () {
    return {
        type: 'REQUEST_USER',
    };
}

function responseUser () {
    return {
        type: 'RESPONSE_USER',
    };
}

export function remoteFetchUserList () {
    return (dispatch, getState) => {

        dispatch(requestUser());
        dispatch(startCommonLoader());

        axios.get(`/user`)

    }
}
