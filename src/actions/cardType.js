import config from '../config';
import { addError, startCommonLoader, stopCommonLoader } from './ui';
import { checkExpiryDate } from "../libraries/helpers";

function requestCardTypeList () {
    return {
        type: 'REQUEST_CARD_TYPE_LIST',
    };
}

function responseCardTypeList (cardTypeList) {
    return {
        type: 'RESPONSE_CARD_TYPE_LIST',
        payload: cardTypeList,
    };
}

export function remoteFetchCardTypeList () {
    return (dispatch, getState) => {

        const { cardType, account } = getState();
        if (checkExpiryDate(cardType.meta.updated)) return null;

        dispatch(requestCardTypeList());
        dispatch(startCommonLoader());

        return fetch(`${config.api}/loyality/card-type`, {
            method: 'GET',
            headers: {
                'Authorization': account.token,
            },
        })
            .then(response => response.json())
            .then(data => {
                dispatch(responseCardTypeList(data.info));
                dispatch(stopCommonLoader());
            })
            .catch(error => {
                addError('Загрузка карт', error.message);
                dispatch(responseCardTypeList([]));
                dispatch(stopCommonLoader());
            });

    }
}
