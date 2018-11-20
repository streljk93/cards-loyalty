const initialState = {
    data: {
        id: '076125aa-b59b-11e8-991b-d9aedd48cf37',
        slug: 'jk',
        name: 'Strel JK Magazine',
        email: 'strel_93@mail.ru',
        phone: '9103684565',
        password: '13771993a',
        isactive: 1,
        lastupdate: '2018-10-18 10:57:38',
    },
    meta: {
        isFetching: false,
        updated: null,
    },
};

export default (state = initialState, action) => {
    switch (action.type) {

        case 'REQUEST_STORE':
            return Object.assign({}, state, {
                meta: Object.assign({}, state.meta, {
                    isFetching: true,
                }),
            });

        case 'RESPONSE_STORE':
            return Object.assign({}, state, {
                meta: Object.assign({}, state.meta, {
                    isFetching: false,
                }),
            });

        case 'SYNC_STORE':
            return Object.assign({}, state, {
                data: action.payload,
                meta: Object.assign({}, state.meta, {
                    updated: Date.now(),
                }),
            });

        default:
            return state;

    }
};