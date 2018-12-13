import uuid from 'uuid/v4';
import { startCommonLoader, stopCommonLoader, addError } from "./ui";
import { checkExpiryDate } from "../libraries/helpers";
import config from '../config';

function makeUser(data) {
    return  {
        id: data.id || uuid(),
        firstname: data.firstname || '',
        middlename: data.middlename || '',
        lastname: data.lastname || '',
        dob: data.dob || null,
        email: data.email || '',
        phone: data.phone,
        gender: data.gender || 'F',
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

function fetchUserList (userList) {
    return {
        type: 'FETCH_USER_LIST',
        payload: userList,
    };
}

function fetchUser (user) {
    return {
        type: 'UPDATE_USER',
        payload: user,
    };
}

export function remoteFetchUserList () {
    return (dispatch, getState) => {

        const { user, account: { token }} = getState();
        if (checkExpiryDate(user.meta.updated)) return null;

        dispatch(requestUser());
        dispatch(startCommonLoader());

        return fetch(`${config.api}/user`, {
            method: 'GET',
            headers: {
                'Authorization': token,
            },
        }).then(response => response.json()).then(data => {
            dispatch(fetchUserList(data.info));
            dispatch(responseUser());
            dispatch(stopCommonLoader());
        }).catch(error => {
            dispatch(addError('Получение пользователей', error.message));
            dispatch(responseUser());
            dispatch(stopCommonLoader());
        });

    }
}

function deleteUser (id) {
    return {
        type: 'DELETE_USER',
        payload: id,
    };
}

export function remoteDeleteUser (id) {
    return (dispatch, getState) => {

        const { account: { token }} = getState();
        dispatch(requestUser());
        dispatch(startCommonLoader());

        return fetch(`${config.api}/user/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': token,
            },
        }).then(response => response.json()).then(data => {
            if (data.success) dispatch(deleteUser(id));
            else dispatch(addError('Удаление пользователя', data.errors.join(', ')));
            dispatch(responseUser());
            dispatch(stopCommonLoader());
        }).catch(error => {
            dispatch(addError('Удаление пользователя', error.message));
            dispatch(responseUser());
            dispatch(stopCommonLoader());
        });

    }
}

export function selectUserEditing (id) {
    return {
        type: 'SELECT_USER_EDITING',
        payload: id,
    };
}

export function clearUserEditing () {
    return {
        type: 'CLEAR_USER_EDITING',
    };
}

export function selectUser (id) {
    return {
        type: 'SELECT_USER',
        payload: id,
    };
}

function createUser (data) {
    const user = makeUser(data);
    return {
        type: 'CREATE_USER',
        payload: user,
    };
}

function updateUser (data) {
    const user = makeUser(data);
    return {
        type: 'UPDATE_USER',
        payload: user,
    };
}

export function remoteSaveUser () {
    return (dispatch, getState) => {

        const {user, account: {token}} = getState();
        const isCreate = user.editing.id === null;
        const url = isCreate ? `${config.api}/user` : `${config.api}/user/${user.editing.id}`;
        const method = isCreate ? 'POST' : 'PUT';
        const action = isCreate ? createUser(user.editing) : updateUser(user.editing);

        dispatch(action);
        dispatch(requestUser());
        dispatch(startCommonLoader());


        return fetch(url, {
            method,
            body: JSON.stringify(action.payload),
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            },
        }).then(response => response.json()).then(data => {
            if (data.success) dispatch(fetchUser(data.info));
            else data.errors.forEach(error => {
                if (isCreate) dispatch(addError('Создание пользователя', error));
                else dispatch(addError('Обновление пользователя', error));
            });

            dispatch(responseUser());
            dispatch(stopCommonLoader());
            dispatch(clearUserEditing());
        }).catch(error => {
            if (isCreate) dispatch(addError('Создание пользователя', error.message));
            else dispatch(addError('Обновление пользователя', error.message));
            dispatch(responseUser());
            dispatch(stopCommonLoader());
            dispatch(clearUserEditing());
        });

    };
}

export function changeUserEditingField (name, value) {
    return {
        type: 'CHANGE_USER_EDITING_FIELD',
        payload: { name, value },
    };
}