import uuid from 'uuid/v4';
import moment from 'moment';
import { addError } from './ui';
import { checkExpiryDate } from "../libraries/helpers";

function requestCardStoreList () {
    return {
        type: 'REQUEST_CARD_STORE_LIST',
        meta: {
            isFetching: true,
        },
    };
}

function addCardStore ({ card_type_id, site_id, image, name, description }) {
    return {
        type: 'ADD_CARD',
        payload: {
            id: uuid(),
            card_type_id,
            site_id,
            image,
            name,
            description,
            isactive: null,
            lastupdated: moment().format('YYYY-MM-DD HH:mm:ss'),
        },
    };
}

function responseCardStoreList (cardStoreList) {
    return {
        type: 'RESPONSE_CARD_STORE_LIST',
        payload: cardStoreList,
    };
}

function syncCardStoreList (cardStore) {
    return {
        type: 'SYNC_CARD_STORE_LIST',
        payload: cardStore,
    };
}

export function uploadCardStore ({ card_type_id, site_id, image, name, description }) {
    return (dispatch, getState) => {

        // vars
        const input = { card_type_id, site_id, image, name, description };
        const actionAddCardStore = addCardStore(input);
        const cardStore = actionAddCardStore.payload;
        const state = getState();

        dispatch(actionAddCardStore);
        dispatch(requestCardStoreList());

        return fetch(`http://localhost:3005/loyality/card`, {
            method: 'POST',
            body: JSON.stringify(cardStore),
            headers: {
                'Authorization': state.store.token,
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) syncCardStoreList(data.info);
                else data.errors.map(error => dispatch(addError('Сохранение карты', error)));
            })
            .catch(error => { dispatch(addError('Сохранение карты', error.message)); console.log(error); });

    }
}

export function fetchCardStoreList () {
    return (dispatch, getState) => {

        const { cardStore } = getState();
        if (checkExpiryDate(cardStore.meta.updated)) return null;

        dispatch(requestCardStoreList());

        return fetch(`http://localhost:3005/loyality/card-store`, {
            method: 'GET',
            headers: {
                'Authorization': 'JWT 84dcf75086bf9e298f15ba1cd63e06574b403c33ccc7bf28853a406c5c90fe9b0a57e80947f21cea7d61cd3cd5a191c716a9724881b8ccd15dcf30fd360d79ce6116e32e5464972139f652fd807577bae2233e3b188e795a47e9153e84cc4f71118f76fb54c0178a6a5ff0dd4365b0ff4fa7fe6fec894160af6be6ae372a052e2cedf1561b912619a5fbd488dd029be19b01910ace6070c65cfa0d4d2206048d',
            },
        })
            .then(response => response.json())
            .then(data => dispatch(responseCardStoreList(data.info)))
            .catch(error => addError(error));

    };
}