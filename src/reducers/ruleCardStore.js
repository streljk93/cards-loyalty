const initialState = {
    data: [],
    meta: {},
};

const ruleCardStore = (state = initialState, action) => {
    switch (action.type) {

        case 'REQUEST_RULE_CARD_STORE_LIST':
            return Object.assign({}, state, {
                meta: Object.assign({}, state.meta, {
                    isFetching: true,
                }),
            });

        case 'RESPONSE_RULE_CARD_STORE_LIST':
            return Object.assign({}, state, {
                data: action.payload,
                meta: Object.assign({}, state.meta, {
                    isFetching: false,
                    updated: Date.now(),
                }),
            });

        default:
            return state;

    }
};

export default ruleCardStore;