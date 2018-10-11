import config from '../config';
import { addError } from './ui';
import { checkExpiryDate } from "../libraries/helpers";
import { startCommonLoader, stopCommonLoader } from "./ui";

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

export function remoteFetchHandlerList () {
    return (dispatch, getState) => {

        const { rule, account } = getState();
        if (checkExpiryDate(rule.meta.updated)) return null;

        dispatch(requestHandlerList());
        dispatch(startCommonLoader());

        return fetch(`${config.api}/rule/handler`, {
            method: 'GET',
            headers: {
                'Authorization': account.token,
            },
        })
            .then(response => response.json())
            .then(data => {
                dispatch(responseHandlerList(data.info));
                dispatch(stopCommonLoader());
            })
            .catch(error => {
                dispatch(responseHandlerList([]));
                dispatch(stopCommonLoader());
                addError('Загрузка общих правил', error.message);
            });

    };
}