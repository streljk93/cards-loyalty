import config from '../config';
import { addError } from './ui';
import { checkExpiryDate } from "../libraries/helpers";
import { startCommonLoader, stopCommonLoader } from "./ui";

function deleteRuleCardStore (id) {
    return {
        type: 'DELETE_RULE_CARD_STORE',
        payload: id,
    };
}

function requestRuleCardStore () {
    return {
        type: 'REQUEST_RULE_CARD_STORE',
    };
}

function responseRuleCardStoreList (ruleCardStoreList) {
    return {
        type: 'RESPONSE_RULE_CARD_STORE_LIST',
        payload: ruleCardStoreList,
    };
}

function responseMetaRuleCardStore() {
    return {
        type: 'RESPONSE_META_RULE_CARD_STORE',
    };
}

export function remoteFetchRuleCardStoreList () {
    return (dispatch, getState) => {

        const { ruleCardStore, account } = getState();
        if (checkExpiryDate(ruleCardStore.meta.updated)) return null;

        dispatch(requestRuleCardStore());
        dispatch(startCommonLoader());

        return fetch(`${config.api}/rule/card-store`, {
            method: 'GET',
            headers: {
                'Authorization': account.token,
            },
        })
            .then(response => response.json())
            .then(data => {
                dispatch(responseRuleCardStoreList(data.info));
                dispatch(stopCommonLoader());
            })
            .catch(error => {
                dispatch(responseRuleCardStoreList([]));
                dispatch(stopCommonLoader());
                addError('Загрузка общих правил', error.message);
            });

    };
}

export function remoteDeleteRuleCardStore (id) {
    return (dispatch, getState) => {

        const { account } = getState();

        dispatch(requestRuleCardStore());
        // dispatch(startCommonLoader());

        return fetch(`${config.api}/rule/card-store/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': account.token,
            },
        })
            .then(response => response.json())
            .then(data => {
                dispatch(responseMetaRuleCardStore());
                // dispatch(stopCommonLoader());
                if (data.success) dispatch(deleteRuleCardStore(id));
                else addError('Удаление правила', 'Правило не было удалено');
            });
    };
}