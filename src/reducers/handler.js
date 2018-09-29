const initialState = {
    data: [],
    meta: {},
};

const handler = (state = initialState, action) => {
    switch (action.type) {

        case 'REQUEST_HANDLER_LIST':
            return Object.assign({}, state, {
                meta: Object.assign({}, state.meta, {
                    isFetching: true,
                }),
            });

        case 'RESPONSE_HANDLER_LIST':
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

export default handler;