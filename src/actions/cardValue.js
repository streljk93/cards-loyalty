import config from "../config";
import { startCommonLoader, stopCommonLoader } from "./ui";

function requestCardValueList () {
    return {
        type: 'REQUEST_CARD_VALUE_LIST',
    };
}

function receiveCardValueList (cardValueList) {
    return {
        type: 'RECEIVE_CARD_VALUE_LIST',
        payload: cardValueList,
        receivedAt: Date.now(),
    };
}

export function remoteFetchCardValueList () {
    return (dispatch, getState) => {

        const { account } = getState();

        dispatch(requestCardValueList());
        dispatch(startCommonLoader());

        return fetch(`${config.api}/loyality/card`, {
            method: 'GET',
            headers: {
                'Authorization': account.token,
            },
        })
            .then(response => response.json())
            .then(data => {
                receiveCardValueList(data.info);
                dispatch(stopCommonLoader());
            });

    };
}