const initialState = {
    data: [],
    meta: {
        isFetching: false,
        updated: null,
    },
};

export default (state = initialState, action) => {
    switch (action.type) {

        case 'REQUEST_USER':
            return Object.assign({}, state, {
                meta: Object.assign({}, state.meta, {
                    isFetching: true,
                }),
            });

        case 'RESPONSE_USER':
            return Object.assign({}, state, {
                meta: Object.assign({}, state.meta, {
                    isFetching: false,
                }),
            });

        default:
            return state;

    }
}