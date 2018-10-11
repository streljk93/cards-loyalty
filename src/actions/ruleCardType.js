import config from '../config';
import { checkExpiryDate } from "../libraries/helpers";
import { startCommonLoader, stopCommonLoader, addError } from "./ui";

function requestRuleCardType () {
    return {
        type: 'REQUEST_RULE_CARD_TYPE',
    };
}

function responseRuleCardType () {
    return {
        type: 'RESPONSE_RULE_CARD_TYPE',
    };
}

function syncRuleCardTypeList (ruleCardTypeList) {
    return {
        type: 'SYNC_RULE_CARD_TYPE_LIST',
        payload: ruleCardTypeList,
    };
}

export function remoteFetchRuleCardTypeList () {
    return (dispatch, getState) => {

        const { ruleCardType, account } = getState();
        if (checkExpiryDate(ruleCardType.meta.updated)) return null;

        dispatch(startCommonLoader());
        dispatch(requestRuleCardType());

        return fetch(`${config.api}/rule/card-type`, {
            method: 'GET',
            headers: {
                'Authorization': account.token,
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) dispatch(syncRuleCardTypeList(data.info));
                dispatch(responseRuleCardType());
                dispatch(stopCommonLoader());
            })
            .catch(error => {
                dispatch(addError('Получение правил карт-типов', error.message));
                dispatch(responseRuleCardType());
                dispatch(stopCommonLoader());
            });

    }
}