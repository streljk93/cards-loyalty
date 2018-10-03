const initialState = {
    selected: null,
    data: [],
    meta: {
        isFetching: false,
        editing: null,
        updated: null,
    },
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

        case 'EDIT_CARD_STORE':
            return Object.assign({}, state, {
                data: state.data.map(card => {
                    if (card.id === action.payload.id) {
                        return { ...card, ...action.payload };
                    }
                    return card;
                }),
            });

        case 'DELETE_CARD_STORE':
            return Object.assign({}, state, {
                data: state.data.filter(card => card.id !== action.payload),
            });

        case 'SYNC_CARD_STORE_LIST':
            return Object.assign({}, state, {
                data: state.data.map(card => {
                    if (card.id === action.payload.id) {
                        return {...card, ...action.payload};
                    }
                    return card;
                }),
                meta: Object.assign({}, state.meta, {
                    isFetching: false,
                })
            });

        case 'CHANGE_CARD_STORE_TAB':
            return Object.assign({}, state, {
                data: state.data.map(card => {
                    if (card.id === action.payload.id) {
                        if (!card.hasOwnProperty('meta')) card.meta = {};
                        card.meta.tab = action.payload.tab;
                    }
                    return card;
                }),
            });

        default:
            return state;

    }
};

export default cardStore;