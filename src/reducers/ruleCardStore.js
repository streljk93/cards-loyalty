const initialState = {
    data: [],
    meta: {},
};

const ruleCardStore = (state = initialState, action) => {
    switch (action.type) {

        case 'REQUEST_RULE_CARD_STORE':
            return Object.assign({}, state, {
                meta: Object.assign({}, state.meta, {
                    isFetching: true,
                }),
            });

        case 'RESPONSE_RULE_CARD_STORE':
            return Object.assign({}, state, {
                meta: Object.assign({}, state.meta, {
                    isFetching: false,
                }),
            });

        case 'SYNC_RULE_CARD_STORE_LIST':
            return Object.assign({}, state, {
                data: action.payload,
                meta: Object.assign({}, state.meta, {
                    updated: Date.now(),
                }),
            });

        case 'UPDATE_RULE_CARD_STORE_FIELD':
            return Object.assign({}, state, {
                data: state.data.map(rule => {
                    if (rule.id === action.payload.id) {
                        return { ...rule, ...action.payload };
                    }
                    return rule;
                }),
            });

        case 'DELETE_RULE_CARD_STORE':
            return Object.assign({}, state, {
                data: state.data.filter(rule => {
                    return rule.id !== action.payload
                }),
            });

        default:
            return state;

    }
};

export default ruleCardStore;