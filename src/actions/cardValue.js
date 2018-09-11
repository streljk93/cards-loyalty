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

export function fetchCardValueList () {
    return dispatch => {

        dispatch(requestCardValueList());

        return fetch('http://localhost:3005/loyality/card')
            .then(response => response.json())
            .then(data => receiveCardValueList(data.info));

    };
}