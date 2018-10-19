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

        case 'CREATE_RULE_CARD_STORE':
            return Object.assign({}, state, {
                data: [ ...state.data, { ...action.payload }],
            });

        case 'UPDATE_RULE_CARD_STORE':
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

        case 'TOGGLE_EXPANDED_RULE_CARD_STORE':
            return Object.assign({}, state, {
                data: state.data.map(rule => {
                    if (action.payload.isexpanded !== null) rule.isexpanded = false;
                    if (rule.id === action.payload.ruleCardStoreId) {
                        if (action.payload.isexpanded !== null) rule.isexpanded = action.payload.isexpanded;
                        else rule.isexpanded = !rule.isexpanded;
                    }
                    return rule;
                })
            });

        default:
            return state;

    }
};

export default ruleCardStore;