const initialState = {
    selected: null,
    data: [],
    meta: {},
};

const cardStore = (state = initialState, action) => {
    switch (action.type) {

        case 'REQUEST_CARD_STORE':
            return Object.assign({}, state, {
                meta: Object.assign({}, state.meta, {
                    isFetching: true,
                }),
            });

        case 'ADD_CARD_STORE':
            return Object.assign({}, state, {
                data: [...state.data, {
                    ...action.payload,
                }],
            });

        case 'SYNC_CARD_STORE_LIST':
            return {
                selected: null,
                data: [ ...action.payload ],
                meta: {
                    updated: action.updated,
                    isFetching: false,
                },
            };

        default:
            return state;

    }
};

export default cardStore;