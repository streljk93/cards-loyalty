function requestCardUnitList () {
    return {
        type: 'REQUEST_CARD_UNIT_LIST',
    };
}

function responseCardUnitList (cardUnitList) {
    return {
        type: 'RESPONSE_CARD_UNIT_LIST',
        payload: cardUnitList,
        receivedAt: Date.now(),
    };
}

export function fetchReceiveCardUnitList () {
    return dispatch => {

        dispatch(requestCardUnitList());

        return fetch(`http://localhost:3005/loyality/card`)
            .then(response => reponse.json())
            .then(data => dispatch(responseCardUnitList(data.info)))
            .catch(error => addError('Загрузка card unit', error.message));

    };
}