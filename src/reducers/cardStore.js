const initialState = {
    selected: null,
    data: [],
    meta: {},
};

const cardStore = (state = initialState, action) => {
    switch (action.type) {

        case 'REQUEST_CARD_STORE_LIST':
            return Object.assign({}, state, {
                meta: Object.assign({}, state.meta, {
                    isFetching: true,
                }),
            });

        case 'RESPONSE_CARD_STORE_LIST':
            return Object.assign({}, state, {
                data: action.payload,
                meta: Object.assign({}, state.meta, {
                    isFetching: false,
                    updated: Date.now(),
                }),
            });

        case 'ADD_CARD_STORE':
            return Object.assign({}, state, {
                data: [...state.data, {
                    ...action.payload,
                }],
            });

        case 'SYNC_CARD_STORE_LIST':
            return Object.assign({}, state, {
                data: state.data.map(card => {
                    if (card.id === action.payload.id) {
                        return action.payload;
                    }
                    return card;
                }),
                meta: Object.assign({}, state.meta, {
                    isFetching: false,
                })
            });

        default:
            return state;

    }
};

export default cardStore;