import uuid from 'uuid/v4';

export function addCardUser ({ card_store_id, user_id, number, qrcode }) {
    return {
        type: 'ADD_CARD_USER',
        payload: {
            id: uuid(),
            card_store_id,
            user_id,
            number,
            qrcode,
        },
    };
}