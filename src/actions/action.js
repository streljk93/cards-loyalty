import { addError } from './ui';

function requestActionList () {
    return {
        type: 'REQUEST_ACTION_LIST',
    };
}

function responseActionList (actionList) {
    return {
        type: 'RESPONSE_ACTION_LIST',
        payload: actionList,
        receivedAt: Date.now(),
    };
}

export function fetchActionList () {
    return dispatch => {

        dispatch(requestActionList());

        return fetch(`http://localhost:3005/loyality/card`)
            .then(response => response.json())
            .then(data => dispatch(responseActionList(data.info)))
            .catch(error => addError('Загрузка событий', error.message));

    };
}