import config from '../config';
import { addError } from './ui';
import { checkExpiryDate } from "../libraries/helpers";
import { startCommonLoader, stopCommonLoader } from "./ui";

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

export function remoteFetchRuleTypeList () {
    return (dispatch, getState) => {

        const { rule, account } = getState();
        if (checkExpiryDate(rule.meta.updated)) return null;

        dispatch(requestRuleTypeList());
        dispatch(startCommonLoader());

        return fetch(`${config.api}/rule/type`, {
            method: 'GET',
            headers: {
                'Authorization': account.token,
            },
        })
            .then(response => response.json())
            .then(data => {
                dispatch(responseRuleTypeList(data.info));
                dispatch(stopCommonLoader());
            })
            .catch(error => {
                dispatch(responseRuleTypeList([]));
                dispatch(stopCommonLoader());
                addError('Загрузка типов общих правил', error.message);
            });

    };
}