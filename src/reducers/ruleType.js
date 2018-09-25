const initialState = {
    data: [],
    meta: {},
};

const ruleType = (state = initialState, action) => {
    switch (action.type) {

        case 'REQUEST_RULE_TYPE_LIST':
            return Object.assign({}, state, {
                meta: Object.assign({}, state.meta, {
                    isFetching: true,
                }),
            });

        case 'RESPONSE_RULE_TYPE_LIST':
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

export default ruleType;