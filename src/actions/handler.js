import config from '../config';
import { addError } from './ui';
import { checkExpiryDate } from "../libraries/helpers";

function requestHandlerList () {
    return {
        type: 'REQUEST_HANDLER_LIST',
    };
}

function responseHandlerList (handlerList) {
    return {
        type: 'RESPONSE_HANDLER_LIST',
        payload: handlerList,
    };
}

export function fetchHandlerList () {
    return (dispatch, getState) => {

        const { rule, account } = getState();
        if (checkExpiryDate(rule.meta.updated)) return null;

        dispatch(requestHandlerList());

        return fetch(`${config.api}/rule/handler`, {
            method: 'GET',
            headers: {
                'Authorization': account.token,
            },
        })
            .then(response => response.json())
            .then(data => dispatch(responseHandlerList(data.info)))
            .catch(error => addError('Загрузка общих правил', error.message));

    };
}