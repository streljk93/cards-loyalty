import uuid from 'uuid/v4';
import config from '../config';
import moment from 'moment';
import { addError } from './ui';
import { checkExpiryDate } from "../libraries/helpers";
import { startCommonLoader, stopCommonLoader } from "./ui";

function makeRuleCardStore (data) {
    return {
        id: data.id || uuid(),
        card_store_id: data.card_store_id,
        rule_id: data.rule_id,
        sign: data.sign,
        value: data.value,
        result: data.result,
        isactive: (data.isactive !== undefined) ? data.isactive : null,
        lastupdated: data.lastupdated || moment().format('YYYY-MM-DD HH:mm:ss'),
    };
}

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

function responseRuleCardStore () {
    return {
        type: 'RESPONSE_RULE_CARD_STORE',
    };
}

function syncRuleCardStoreList (ruleCardStoreList) {
    return {
        type: 'SYNC_RULE_CARD_STORE_LIST',
        payload: ruleCardStoreList,
    };
}

function updateRuleCardStoreField (id, field, value) {
    return {
        type: 'UPDATE_RULE_CARD_STORE_FIELD',
        payload: {
            id,
            [field]: value,
        },
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
                dispatch(syncRuleCardStoreList(data.info));
                dispatch(responseRuleCardStore());
                dispatch(stopCommonLoader());
            })
            .catch(error => {
                dispatch(syncRuleCardStoreList());
                dispatch(responseRuleCardStore());
                dispatch(stopCommonLoader());
                addError('Загрузка общих правил', error.message);
            });

    };
}

export function remoteUpdateRuleCardStore (data) {
    return (dispatch, getState) => {

        const { account } = getState();

        dispatch(requestRuleCardStore());
        dispatch(startCommonLoader());

        return fetch(`${config.api}/rule/card-store/${data.id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Authorization': account.token,
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                // if (data.success) dispatch(updateRuleCardStore(data.info));
                // dispatch(responseRuleCardStore());
            })

    }
}

export function remoteUpdateRuleCardStoreField (id, field, value) {
    return (dispatch, getState) => {

        dispatch(updateRuleCardStoreField(id, field, value));
        const { ruleCardStore } = getState();

        remoteUpdateRuleCardStore(ruleCardStore.filter(rule => rule.id === id).shift());

    }
}

export function remoteDeleteRuleCardStore (id) {
    return (dispatch, getState) => {

        const { account } = getState();

        dispatch(requestRuleCardStore());
        dispatch(startCommonLoader());

        return fetch(`${config.api}/rule/card-store/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': account.token,
            },
        })
            .then(response => response.json())
            .then(data => {
                dispatch(responseRuleCardStore());
                dispatch(stopCommonLoader());
                if (data.success) dispatch(deleteRuleCardStore(id));
                else addError('Удаление правила', 'Правило не было удалено');
            });
    };
}