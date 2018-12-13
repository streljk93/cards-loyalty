const editing = {
    id: null,
    firstname: '',
    middlename: '',
    lastname: '',
    dob: null,
    email: '',
    phone: '',
    gender: 'F',
};
const initialState = {
    selected: editing,
    editing,
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

        case 'FETCH_USER_LIST':
            return Object.assign({}, state, {
                data: action.payload,
            });

        case 'CREATE_USER':
            return Object.assign({}, state, {
                data: [ ...state.data, { ...action.payload }],
            });

        case 'UPDATE_USER':
            return Object.assign({}, state, {
                data: state.data.map(user => {
                    if (user.id === action.payload.id) {
                        return action.payload;
                    }
                    return user;
                }),
            });

        case 'DELETE_USER':
            return Object.assign({}, state, {
                data: state.data.filter(user => user.id !== action.payload),
            });

        case 'SELECT_USER_EDITING':
            const user = state.data.filter(user => user.id === action.payload)[0];
            return Object.assign({}, state, {
                editing: user,
            });

        case 'CLEAR_USER_EDITING':
            return Object.assign({}, state, {
                editing: editing,
            });

        case 'SELECT_USER':
            return Object.assign({}, state, {
                selected: (state.selected.id === action.payload)
                    ? editing
                    : state.data.filter(user => user.id === action.payload)[0],
            });

        case 'CHANGE_USER_EDITING_FIELD':
            if (!state.editing.hasOwnProperty(action.payload.name)) return state;
            return Object.assign({}, state, {
                editing: Object.assign({}, state.editing, {
                    [action.payload.name]: action.payload.value,
                }),
            });

        default:
            return state;

    }
}