import uuid from 'uuid/v4';
import config from '../config';
import { checkExpiryDate } from "../libraries/helpers";

export function addCardUser ({ card_store_id, user_id, number, qrcode }) {
    return {
        type: 'ADD_CARD_USER',
        payload: {
            id: uuid(),
            card_store_id,
            user_id,
            number,
            qrcode,
        },
    };
}

function requestCardUser () {
    return {
        type: 'REQUEST_CARD_USER',
    };
}

function responseCardUser () {
    return {
        type: 'RESPONSE_CARD_USER',
    };
}

function fetchCardUserList (cardUserList) {
    return {
        type: 'FETCH_CARD_USER_LIST',
        payload: cardUserList,
    };
}

export function remoteFetchCardUser () {
    return (dispatch, getState) => {

        const { cardUser, account: { token }} = getState();
        if (checkExpiryDate(cardUser.meta.updated)) return null;

        fetch(`${config.api}/loyality/card-user/`, {
            method: 'GET',
            headers: {
                'Authorization': token,
            },
        }).then(response => response.json()).then(data => {
            if (data.success) {

            }
        })

    }
}

export function remoteCreate() {
    
}