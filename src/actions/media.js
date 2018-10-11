import config from '../config';
import { startCommonLoader, stopCommonLoader, addError } from "./ui";
import { checkExpiryDate } from "../libraries/helpers";

function requestMedia () {
    return {
        type: 'REQUEST_MEDIA',
    };
}

function responseMedia () {
    return {
        type: 'RESPONSE_MEDIA',
    };
}

function responseMediaList (mediaList) {
    return {
        type: 'RESPONSE_MEDIA_LIST',
        payload: mediaList,
    };
}

export function createMedia ({ id, store_id, url, isactive, lastupdated }) {
    return {
        type: 'CREATE_MEDIA',
        payload: {
            id,
            store_id,
            url,
            isactive,
            lastupdated,
        },
    };
}

export function deleteMedia (id) {
    return {
        type: 'DELETE_MEDIA',
        payload: id,
    };
}

export function remoteFetchMediaList () {
    return (dispatch, getState) => {

        const { media, account } = getState();
        if (checkExpiryDate(media.meta.updated)) return null;

        dispatch(requestMedia());
        dispatch(startCommonLoader());

        return fetch(`${config.api}/media`, {
            method: 'GET',
            headers: {
                'Authorization': account.token,
            },
        })
            .then(response => response.json())
            .then(data => {
                dispatch(responseMediaList(data.info));
                dispatch(stopCommonLoader());
            })
            .catch(error => {
                dispatch(addError('Получение медиафайлов', error));
                dispatch(responseMediaList([]));
                dispatch(stopCommonLoader());
            });

    };
}

export function remoteUploadMedia (image) {
    return (dispatch, getState) => {

        const { account } = getState();

        dispatch(requestMedia());
        dispatch(startCommonLoader());

        // add form-data
        const formData = new FormData();
        formData.append('file', image);

        return fetch(`${config.api}/media`, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': account.token,
            }
        })
            .then(response => response.json())
            .then(data => {
                if (!data.success) data.errors.map(error => dispatch(addError('Сохранение карты', error)));
                else dispatch(createMedia(data.info));
                dispatch(responseMedia());
                dispatch(stopCommonLoader());
            })
            .catch(error => {
                dispatch(addError('Загрузка медиафайла', error.message));
                dispatch(responseMedia());
                dispatch(stopCommonLoader());
            })

    }
}

export function remoteDeleteMedia (id) {
    return (dispatch, getState) => {

        const { account } = getState();

        dispatch(requestMedia());
        dispatch(startCommonLoader());

        return fetch(`${config.api}/media/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': account.token,
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) dispatch(deleteMedia(id));
                dispatch(responseMedia());
                dispatch(stopCommonLoader());
            })
            .catch(error => {
                dispatch(addError('Удаление медиафайла', error.message));
                dispatch(responseMedia());
                dispatch(stopCommonLoader());
            })

    }
}