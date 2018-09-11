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

export function fetchCardTypeList () {
    return dispatch => {

        dispatch(requestCardTypeList());

        return fetch(`http://localhost:3005/loyality/card`)
            .then(response => response.json())
            .then(data => dispatch(responseCardTypeList(data.info)))
            .catch(error => addError('Загрузка карт', error.message));

    }
}
