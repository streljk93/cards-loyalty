const initialState = {
    data: [],
    meta: {
        isFetching: false,
        updated: null,
    },
};

export default (state = initialState, action) => {
    switch (action.type) {

        case 'REQUEST_CARD_USER':
            return Object.assign({}, state, {
                meta: Object.assign({}, state.meta, {
                    isFetching: true,
                }),
            });

        case 'RESPONSE_CARD_USER':
            return Object.assign({}, state, {
                meta: Object.assign({}, state.meta, {
                    isFetching: false,
                }),
            });

        case 'FETCH_CARD_USER_LIST':
            return Object.assign({}, state, {
                data: action.payload,
            });

        case 'CREATE_CARD_USER':
            return Object.assign({}, state, {
                data: [ ...state.data, { ...action.payload }],
            });

        case 'UPDATE_CARD_USER':
            return Object.assign({}, state, {
                data: state.data.map(cardUser => {
                    if (cardUser.id === action.payload.id) {
                        return action.payload;
                    }
                    return cardUser;
                }),
            });

        case 'DELETE_CARD_USER':
            return Object.assign({}, state, {
                data: state.data.map(cardUser => {
                    if (cardUser.id === action.payload) cardUser.isactive = 0;
                    return cardUser;
                }),
            });

        case 'RESTORE_CARD_USER':
            return Object.assign({}, state, {
                data: state.data.map(cardUser => {
                    if (cardUser.id === action.payload) cardUser.isactive = 1;
                    return cardUser;
                }),
            });

        default:
            return state;

    }
};