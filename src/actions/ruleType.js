import config from '../config';
import { addError } from './ui';
import { checkExpiryDate } from "../libraries/helpers";

function requestRuleTypeList () {
    return {
        type: 'REQUEST_RULE_TYPE_LIST',
    };
}

function responseRuleTypeList (ruleTypeList) {
    return {
        type: 'RESPONSE_RULE_TYPE_LIST',
        payload: ruleTypeList,
    };
}

export function fetchRuleTypeList () {
    return (dispatch, getState) => {

        const { rule } = getState();
        if (checkExpiryDate(rule.meta.updated)) return null;

        dispatch(requestRuleTypeList());

        return fetch(`${config}/rule/type`)
            .then(response => response.json())
            .then(data => dispatch(responseRuleTypeList(data.info)))
            .catch(error => addError('Загрузка типов общих правил', error.message));

    };
}