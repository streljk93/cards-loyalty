function requestStore() {
    return {
        type: 'REQUEST_STORE',
    };
}

function responseStore() {
    return {
        type: 'RESPONSE_STORE',
    };
}

function syncStore(store) {
    return {
        type: 'SYNC_STORE',
        payload: store,
    };
}