const cardsStore = (state = [], action) => {
    switch (action.type) {

        case 'ADD_CARD_STORE':
            return [...state, {
                ...action.payload,
            }];

        default:
            return state;

    }
};

export default cardsStore;