import config from '../config';
import { addError } from './ui';
import { checkExpiryDate } from "../libraries/helpers";

function requestActionList () {
    return {
        type: 'REQUEST_ACTION_LIST',
    };
}

function responseActionList (actionList) {
    return {
        type: 'RESPONSE_ACTION_LIST',
        payload: actionList,
    };
}

export function fetchActionList () {
    return (dispatch, getState) => {

        const { rule } = getState();
        if (checkExpiryDate(rule.meta.updated)) return null;

        dispatch(requestActionList());

        return fetch(`${config}/rule/action`)
            .then(response => response.json())
            .then(data => dispatch(responseActionList(data.info)))
            .catch(error => addError('Загрузка общих событий', error.message));

    };
}