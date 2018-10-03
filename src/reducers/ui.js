const initialState = {
    drawerIsOpen: false,
    isLoading: false,
};

const ui = (state = initialState, action) => {
    switch (action.type) {

        case 'START_COMMON_LOADER':
            return { ...state, isLoading: true };

        case 'STOP_COMMON_LOADER':
            return { ...state, isLoading: false };

        case 'OPEN_DRAWER':
            return { ...state, drawerIsOpen: true };

        case 'CLOSE_DRAWER':
            return { ...state, drawerIsOpen: false };

        case 'TOGGLE_DRAWER':
            return { ...state, drawerIsOpen: !state.drawerIsOpen };

        default:
            return state;

    }
}

export default ui;