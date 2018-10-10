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

function createCardStore ({ card_type_id, site_id, image, name, description }) {
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

function updateCardStore ({ id, image, name, description }) {
    return {
        type: 'CHANGE_CARD_STORE',
        payload: {
            id,
            image,
            name,
            description,
            isactive: null,
            lastupdated: moment().format('YYYY-MM-DD HH:mm:ss'),
        },
    };
}

export function updateCardStoreField (id, field, value) {
    return {
        type: 'UPDATE_CARD_STORE',
        payload: {
            id,
            [field]: value,
            isactive: null,
            lastupdated: moment().format('YYYY-MM-DD HH:mm:ss'),
        },
    };
}

// export function editCardStore (id) {
//     return {
//         type: 'EDIT_CARD_STORE',
//         payload: id,
//     };
// }
//
// export function cancelEditCardStore(id) {
//     return {
//         type: 'CANCEL_EDIT_CARD_STORE',
//         payload: id,
//     };
// }

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

function responseCardStore (cardStore) {
    return {
        type: 'RESPONSE_CARD_STORE',
        payload: cardStore,
    };
}

export function remoteSaveCardStore (id, { card_type_id, store_id, image, name, description }) {
    const editing = (typeof id) !== 'object';

    return (dispatch, getState) => {

        // vars
        const url = editing ? `${config.api}/loyality/card-store/${id}` : `${config.api}/loyality/card-store`;
        const method = editing ? 'PUT' : 'POST';
        const input = {id, card_type_id, store_id, image, name, description };
        const action = editing ? updateCardStore(input) : createCardStore(input);
        const body = action.payload;
        const { account } = getState();

        dispatch(action);
        dispatch(requestCardStoreList());

        return fetch(url, {
            method,
            body: JSON.stringify(body),
            headers: {
                'Authorization': account.token,
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                if (!data.success) data.errors.map(error => dispatch(addError('Сохранение карты', error)));
                dispatch(responseCardStore(data.success ? data.info : {}));
            })
            .catch(error => {
                dispatch(addError('Сохранение карты', error.message));
                dispatch(responseCardStore({}));
            });
    }
}

export function remoteFetchCardStoreList () {
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

export function remoteSyncCardStore (id) {
    return (dispatch, getState) => {
        const { cardStore } = getState();

        cardStore.data.forEach(card =>
            (card.id === id && card.isactive === null) && dispatch(remoteSaveCardStore(card.id, card))
        );
    }
}