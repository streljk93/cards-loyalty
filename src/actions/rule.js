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

        const { rule } = getState();
        if (checkExpiryDate(rule.meta.updated)) return null;

        dispatch(requestRuleList());

        return fetch(`${config}/rule`)
            .then(response => response.json())
            .then(data => dispatch(responseRuleList(data.info)))
            .catch(error => addError('Загрузка общих правил', error.message));

    };
}