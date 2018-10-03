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

        case 'RESPONSE_RULE_CARD_STORE_LIST':
            return Object.assign({}, state, {
                data: action.payload,
                meta: Object.assign({}, state.meta, {
                    isFetching: false,
                    updated: Date.now(),
                }),
            });

        case 'RESPONSE_META_RULE_CARD_STORE':
            return Object.assign({}, state, {
                meta: Object.assign({}, state.meta, {
                    isFetching: false,
                }),
            });

        case 'DELETE_RULE_CARD_STORE':
            return Object.assign({}, state, {
                data: state.data.filter(rule => {
                    console.log(`${rule.id} !== ${action.payload}`, rule.id !== action.payload);
                    return rule.id !== action.payload
                }),
            });

        default:
            return state;

    }
};

export default ruleCardStore;