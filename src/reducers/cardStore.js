const initialState = {
    data: [],
    meta: {
        isFetching: false,
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

        case 'CHANGE_CARD_STORE':
            return Object.assign({}, state, {
                data: state.data.map(card => {
                    if (card.id === action.payload.id) {
                        return { ...card, ...action.payload };
                    }
                    return card;
                }),
            });

        case 'EDIT_CARD_STORE':
            return Object.assign({}, state, {
                data: state.data.map(card => {
                    if (card.id === action.payload) {
                        card.editing = true;
                    }
                    return card;
                })
                // meta: Object.assign({}, state.meta, {
                //     editing: action.payload,
                // }),
            });

        case 'CANCEL_EDIT_CARD_STORE':
            return Object.assign({}, state, {
                data: state.data.map(card => {
                    if (card.id === action.payload) {
                        card.editing = false;
                    }
                    return card;
                })
                // meta: Object.assign({}, state.meta, {
                //     editing: null,
                // }),
            });

        case 'DELETE_CARD_STORE':
            return Object.assign({}, state, {
                data: state.data.filter(card => card.id !== action.payload),
            });

        case 'RESPONSE_CARD_STORE':
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

        default:
            return state;

    }
};

export default cardStore;