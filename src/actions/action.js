import config from '../config';
import { addError } from './ui';
import { checkExpiryDate } from "../libraries/helpers";
import { startCommonLoader, stopCommonLoader } from "./ui";

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

export function remoteFetchActionList () {
    return (dispatch, getState) => {

        const { rule, account } = getState();
        if (checkExpiryDate(rule.meta.updated)) return null;

        dispatch(requestActionList());
        dispatch(startCommonLoader());

        return fetch(`${config.api}/rule/action`, {
            method: 'GET',
            headers: {
                'Authorization': account.token,
            },
        })
            .then(response => response.json())
            .then(data => {
                dispatch(responseActionList(data.info));
                dispatch(stopCommonLoader());
            })
            .catch(error => {
                dispatch(responseActionList([]));
                dispatch(stopCommonLoader());
                addError('Загрузка общих событий', error.message);
            });

    };
}