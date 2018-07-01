const cardsPersonal = (state, action) => {
    switch (action.type) {

        case 'ADD_CARD_PERSONAL':
            return [...state, {
                ...action.payload,
            }];

        default:
            return state;

    }
}