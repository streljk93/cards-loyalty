const initialState = {
    data: [],
    meta: {
        isFetching: false,
        updated: null,
    },
};

export default (state = initialState, action) => {
    switch (action.type) {

        case 'REQUEST_RULE_CARD_TYPE':
            return Object.assign({}, state, {
                meta: Object.assign({}, state.meta, {
                    isFetching: true,
                }),
            });

        case 'RESPONSE_RULE_CARD_TYPE':
            return Object.assign({}, state, {
                meta: Object.assign({}, state.meta, {
                    isFetching: false,
                }),
            });

        case 'SYNC_RULE_CARD_TYPE_LIST':
            return Object.assign({}, state, {
                data: action.payload,
                meta: Object.assign({}, state.meta, {
                    updated: Date.now(),
                }),
            });

        default:
            return state;

    }
};