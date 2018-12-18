import uuid from 'uuid/v4';
import config from '../config';
import { checkExpiryDate } from "../libraries/helpers";
import { startCommonLoader, stopCommonLoader, addError } from "./ui";
import moment from 'moment';

function makeCardUser (data) {
    const id = uuid();
    return {
        id: data.id || id,
        card_store_id: data.card_store_id || null,
        user_id: data.user_id || null,
        number: data.number || id,
        qrcode: data.qrcode || `user/open/${id}`,
        isactive: (data.isactive !== undefined) ? data.isactive : null,
        lastupdated: data.lastupdated || moment().format('YYYY-MM-DD HH:mm:ss'),
    };
}

function createCardUser (data) {
    return {
        type: 'CREATE_CARD_USER',
        payload: makeCardUser(data),
    };
}

function updateCardUser (data) {
    return {
        type: 'UPDATE_CARD_USER',
        payload: makeCardUser(data),
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

function deleteCardUser (id) {
    return {
        type: 'DELETE_CARD_USER',
        payload: id,
    }
}

function restoreCardUser (id) {
    return {
        type: 'RESTORE_CARD_USER',
        payload: id,
    };
}

export function remoteFetchCardUserList () {
    return (dispatch, getState) => {

        const { cardUser, account: { token }} = getState();
        if (checkExpiryDate(cardUser.meta.updated)) return null;

        dispatch(requestCardUser());
        dispatch(startCommonLoader());

        fetch(`${config.api}/loyality/card-user/`, {
            method: 'GET',
            headers: {
                'Authorization': token,
            },
        }).then(response => response.json()).then(data => {
            if (data.success) dispatch(fetchCardUserList(data.info));
            else data.errors.forEach(error =>
                    dispatch(addError('Получение всех пользовательских карт', error)));

            dispatch(responseCardUser());
            dispatch(stopCommonLoader());

            return data;
        }).catch(error => {
            dispatch(addError('Получение всех пользовательских карт', error.message));
            dispatch(responseCardUser());
            dispatch(stopCommonLoader());

            return error;
        });

    }
}

export function remoteCreateCardUser({ user_id, card_store_id }) {
    return (dispatch, getState) => {

        const { account: { token }} = getState();
        const action = createCardUser({ user_id, card_store_id });
        const cardUser = action.payload;

        dispatch(requestCardUser());
        dispatch(startCommonLoader());
        dispatch(action);

        return fetch(`${config.api}/loyality/card-user`, {
            method: 'POST',
            body: JSON.stringify(cardUser),
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            }
        }).then(response => response.json()).then(data => {
            dispatch(responseCardUser());
            dispatch(stopCommonLoader());
            dispatch(updateCardUser(data.info));
        }).catch(error => {
            dispatch(responseCardUser());
            dispatch(stopCommonLoader());
            dispatch(addError('Создание пользовательской карты', error.message));
        });

    }
}

export function remoteDeleteCardUser (id) {
    return (dispatch, getState) => {

        const { account: { token }} = getState();
        dispatch(requestCardUser());
        dispatch(startCommonLoader());

        // TODO: сделать заранее удаление

        return fetch(`${config.api}/loyality/card-user/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': token },
        }).then(response => response.json()).then(data => {
            if (data.success) dispatch(deleteCardUser(id));
            else data.errors.forEach(error =>
                dispatch(addError('Отключение пользовательской карты', error)));

            dispatch(responseCardUser());
            dispatch(stopCommonLoader());

            return data.success;
        }).catch(error => {
            dispatch(addError('Отключение пользовательской карты', error.message));
            dispatch(responseCardUser());
            dispatch(stopCommonLoader());

            return false;
        });

    };
}

export function remoteRestoreCardUser (id) {
    return (dispatch, getState) => {

        const { account: { token }} = getState();
        dispatch(requestCardUser());
        dispatch(startCommonLoader());

        // TODO: сделать заранее востановление

        return fetch(`${config.api}/loyality/card-user/${id}`, {
            method: 'POST',
            headers: { 'Authorization': token },
        }).then(response => response.json()).then(data => {
            if (data.success) dispatch(restoreCardUser(id));
            else data.errors.forEach(error =>
                dispatch(addError('Включение пользовательской карты', error)));

            dispatch(responseCardUser());
            dispatch(stopCommonLoader());

            return data.success;
        }).catch(error => {
            dispatch(addError('Включение пользовательской карты', error.message));
            dispatch(responseCardUser());
            dispatch(stopCommonLoader());

            return false;
        });

    };
}