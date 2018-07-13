const initialState = {
    drawerIsOpen: false,
};

const ui = (state = initialState, action) => {
    switch (action.type) {

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