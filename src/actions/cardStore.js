import uuid from 'uuid/v4';
import moment from 'moment';
import { addError } from './ui';
import { checkExpiryDate } from "../libraries/helpers";
import config from "../config";

function requestCardStoreList () {
    return {
        type: 'REQUEST_CARD_STORE_LIST',
    };
}

function addCardStore ({ card_type_id, site_id, image, name, description }) {
    return {
        type: 'ADD_CARD_STORE',
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

        return fetch(`${config.api}/loyality/card`, {
            method: 'POST',
            body: JSON.stringify(cardStore),
            headers: {
                'Authorization': state.account.token,
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

        const { cardStore, account } = getState();
        if (checkExpiryDate(cardStore.meta.updated) && process.env.NODE_ENV === 'production') return null;

        dispatch(requestCardStoreList());

        return fetch(`${config.api}/loyality/card-store`, {
            method: 'GET',
            headers: {
                'Authorization': account.token,
            },
        })
            .then(response => response.json())
            .then(data => dispatch(responseCardStoreList(data.info)))
            .catch(error => addError(error));

    };
}