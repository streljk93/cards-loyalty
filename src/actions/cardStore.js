import uuid from 'uuid/v4';
import moment from 'moment';
import { addError } from './ui';
import { checkExpiryDate } from "../libraries/helpers";
import { startCommonLoader, stopCommonLoader } from "./ui";
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

function editCardStore ({ id, card_type_id, site_id, image, name, description }) {
    return {
        type: 'EDIT_CARD_STORE',
        payload: {
            id,
            card_type_id,
            site_id,
            image,
            name,
            description,
            lastupdated: moment().format('YYYY-MM-DD HH:mm:ss'),
        },
    };
}

// function deleteCardStore (id) {
//     return {
//         type: 'DELETE_CARD_STORE',
//         payload: id,
//     };
// }

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

export function uploadCardStore (id, { card_type_id, store_id, image, name, description }) {
    const editing = (typeof id) !== 'object';

    return (dispatch, getState) => {

        // vars
        const url = editing ? `${config.api}/loyality/card-store/${id}` : `${config.api}/loyality/card-store`;
        const method = editing ? 'PUT' : 'POST';
        const input = editing
            ? { image, name, description }
            : { card_type_id, store_id, image, name, description };
        const action = editing ? editCardStore({ ...input, id }) : addCardStore(input);
        const body = action.payload;
        const state = getState();

        dispatch(action);
        dispatch(requestCardStoreList());
        dispatch(startCommonLoader());

        return fetch(url, {
            method,
            body: JSON.stringify(body),
            headers: {
                'Authorization': state.account.token,
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                if (!data.success) data.errors.map(error => dispatch(addError('Сохранение карты', error)));
                dispatch(syncCardStoreList(data.success ? data.info : {}));
                dispatch(stopCommonLoader());
            })
            .catch(error => {
                dispatch(addError('Сохранение карты', error.message));
                dispatch(syncCardStoreList({}));
                dispatch(stopCommonLoader());
            });
    }
}

export function fetchCardStoreList () {
    return (dispatch, getState) => {

        const { cardStore, account } = getState();
        if (checkExpiryDate(cardStore.meta.updated)) return null;

        dispatch(requestCardStoreList());
        dispatch(startCommonLoader());

        return fetch(`${config.api}/loyality/card-store`, {
            method: 'GET',
            headers: {
                'Authorization': account.token,
            },
        })
            .then(response => response.json())
            .then(data => {
                dispatch(responseCardStoreList(data.info));
                dispatch(stopCommonLoader());
            })
            .catch(error => {
                addError(error);
                dispatch(responseCardStoreList([]));
                dispatch(stopCommonLoader());
            });

    };
}

export function changeCardStoreTab (id, tab) {
    return {
        type: 'CHANGE_CARD_STORE_TAB',
        payload: {
            id,
            tab,
        },
    };
}