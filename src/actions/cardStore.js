import uuid from 'uuid/v4';
import moment from 'moment';
import { addError } from './ui';
import { checkExpiryDate } from "../libraries/helpers";
import { startCommonLoader, stopCommonLoader } from "./ui";
import config from "../config";

function makeCardStore (data) {
    return {
        id: data.id || uuid(),
        card_type_id: data.card_type_id || null,
        store_id: data.store_id || null,
        image: data.image,
        name: data.name,
        description: data.description,
        isactive: (data.isactive !== undefined) ? data.isactive : null,
        lastupdated: data.lastupdated || moment().format('YYYY-MM-DD HH:mm:ss'),
    };
}

function requestCardStore () {
    return {
        type: 'REQUEST_CARD_STORE',
    };
}

function responseCardStore () {
    return {
        type: 'RESPONSE_CARD_STORE',
    };
}

function syncCardStoreList (cardStoreList) {
    return {
        type: 'SYNC_CARD_STORE_LIST',
        payload: cardStoreList,
    };
}

function createCardStore (data) {
    const cardStore = makeCardStore(data);
    return {
        type: 'CREATE_CARD_STORE',
        payload: cardStore,
    };
}

function updateCardStore (data) {
    const cardStore = makeCardStore(data);
    return {
        type: 'UPDATE_CARD_STORE',
        payload: cardStore,
    };
}

function deleteCardStore (id) {
    return {
        type: 'DELETE_CARD_STORE',
        payload: id,
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
        dispatch(requestCardStore());

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
                dispatch(responseCardStore());
                dispatch(updateCardStore(data.success ? data.info : {}));
                return data;
            })
            .catch(error => {
                dispatch(addError('Сохранение карты', error.message));
                dispatch(responseCardStore());
            });
    }
}

let time = null;
export function remoteUpdateCardStoreField (id, field, value) {
    return (dispatch, getState) => {


        dispatch(updateCardStoreField(id, field, value));

        const { cardStore } = getState();

        clearInterval(time);
        time = setInterval(() => {
            dispatch(remoteSaveCardStore(id, cardStore.data.filter(card => card.id === id).shift()));
            clearInterval(time);
        }, 3000);
    }
}

export function remoteFetchCardStoreList () {
    return (dispatch, getState) => {

        const { cardStore, account } = getState();
        if (checkExpiryDate(cardStore.meta.updated)) return null;

        dispatch(requestCardStore());
        dispatch(startCommonLoader());

        return fetch(`${config.api}/loyality/card-store`, {
            method: 'GET',
            headers: {
                'Authorization': account.token,
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) dispatch(syncCardStoreList(data.info));
                dispatch(responseCardStore());
                dispatch(stopCommonLoader());
            })
            .catch(error => {
                dispatch(addError('Получение магазинных карт', error.message));
                dispatch(responseCardStore());
                dispatch(stopCommonLoader());
            });

    };
}

export function remoteDeleteCardStore (id) {
    return (dispatch, getState) => {

        const { account: { token }} = getState();
        dispatch(requestCardStore());
        dispatch(startCommonLoader());

        // TODO: сделать заранее удаление

        return fetch(`${config.api}/loyality/card-store/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': token },
        }).then(response => response.json()).then(data => {
            if (data.success) dispatch(deleteCardStore(id));
            else data.errors.forEach(error => dispatch(addError('Удаление магазинной карты', error)));

            // TODO: сделать такой вывод ошибок с восстановление операции которая завершилась неудачно!
            // addError('title', 'content', {
            //    component: this,
            //    action: 'remoteDeleteCardStore',
            //    params: [id],
            // });

            dispatch(responseCardStore());
            dispatch(stopCommonLoader());

            return data.success;
        }).catch(error => {
            dispatch(addError('Удаление магазинной карты', error.message));
            dispatch(responseCardStore());
            dispatch(stopCommonLoader());

            return false;
        });

    };
}