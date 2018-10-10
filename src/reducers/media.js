const initialState = {
    data: [],
    meta: {
        isFetching: false,
        updated: null,
    },
};

export default (state = initialState, action) => {
    switch (action.type) {

        case 'REQUEST_MEDIA':
            return Object.assign({}, state, {
                meta: Object.assign({}, state.meta, {
                    isFetching: true,
                }),
            });

        case 'RESPONSE_MEDIA':
            return Object.assign({}, state, {
                meta: Object.assign({}, state.meta, {
                    isFetching: false,
                }),
            });

        case 'RESPONSE_MEDIA_LIST':
            return Object.assign({}, state, {
                data: action.payload,
                meta: Object.assign({}, state.meta, {
                    isFetching: false,
                    updated: Date.now(),
                }),
            });

        case 'CREATE_MEDIA':
            return Object.assign({}, state, {
                data: [ ...state.data, { ...action.payload }],
            });

        default:
            return state;

    }
};

