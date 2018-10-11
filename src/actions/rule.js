import config from '../config';
import { addError } from './ui';
import { checkExpiryDate } from "../libraries/helpers";
import { startCommonLoader, stopCommonLoader } from "./ui";

function requestRuleList () {
    return {
        type: 'REQUEST_RULE_LIST',
    };
}

function responseRuleList (ruleList) {
    return {
        type: 'RESPONSE_RULE_LIST',
        payload: ruleList,
    };
}

export function remoteFetchRuleList () {
    return (dispatch, getState) => {

        const { rule, account } = getState();
        if (checkExpiryDate(rule.meta.updated)) return null;

        dispatch(requestRuleList());
        dispatch(startCommonLoader());

        return fetch(`${config.api}/rule`, {
            method: 'GET',
            headers: {
                'Authorization': account.token,
            },
        })
            .then(response => response.json())
            .then(data => {
                dispatch(responseRuleList(data.info));
                dispatch(stopCommonLoader());
            })
            .catch(error => {
                dispatch(responseRuleList([]));
                dispatch(stopCommonLoader());
                addError('Загрузка общих правил', error.message);
            });

    };
}