import config from '../config';
import { addError } from './ui';
import { checkExpiryDate } from "../libraries/helpers";

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

export function fetchRuleList () {
    return (dispatch, getState) => {

        const { rule, account } = getState();
        if (checkExpiryDate(rule.meta.updated) && process.env.NODE_ENV === 'production') return null;

        dispatch(requestRuleList());

        return fetch(`${config.api}/rule`, {
            method: 'GET',
            headers: {
                'Authorization': account.token,
            },
        })
            .then(response => response.json())
            .then(data => dispatch(responseRuleList(data.info)))
            .catch(error => addError('Загрузка общих правил', error.message));

    };
}