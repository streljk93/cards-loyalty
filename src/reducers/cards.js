const cards = (state, action) => {
    switch (action.type) {

        case 'ADD_CARD':
            return [...state, {
                ...action.payload,
            }];

        default:
            return state;

    }
};