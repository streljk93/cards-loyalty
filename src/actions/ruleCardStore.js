import config from '../config';
import { addError } from './ui';
import { checkExpiryDate } from "../libraries/helpers";

function requestRuleCardStoreList () {
    return {
        type: 'REQUEST_RULE_CARD_STORE_LIST',
    };
}

function responseRuleCardStoreList (ruleCardStoreList) {
    return {
        type: 'RESPONSE_RULE_CARD_STORE_LIST',
        payload: ruleCardStoreList,
    };
}

export function fetchRuleCardStoreList () {
    return (dispatch, getState) => {

        const { rule, account } = getState();
        if (checkExpiryDate(rule.meta.updated)) return null;

        dispatch(requestRuleCardStoreList());

        return fetch(`${config.api}/rule/card-store`, {
            method: 'GET',
            headers: {
                'Authorization': account.token,
            },
        })
            .then(response => response.json())
            .then(data => dispatch(responseRuleCardStoreList(data.info)))
            .catch(error => addError('Загрузка общих правил', error.message));

    };
}