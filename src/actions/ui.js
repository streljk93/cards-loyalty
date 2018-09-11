export function openDrawer () {
    return {
        type: 'OPEN_DRAWER',
        payload: null,
    };
}

export function closeDrawer () {
    return {
        type: 'CLOSE_DRAWER',
        payload: null,
    };
}

export function toggleDrawer () {
    return {
        type: 'TOGGLE_DRAWER',
        payload: null,
    };
}

export function addError ({ title, text }) {
    return {
        type: 'ADD_ERROR',
        payload: {
            title,
            text,
        },
    };
}

export function AddGlobalMessage ({ lvl, title, text }) {
    return {
        type: 'ADD_GLOBAL_MESSAGE',
        payload: {
            lvl,
            title,
            text,
        },
    };
}