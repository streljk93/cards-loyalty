export function reloadCards(cards) {
    return {
        type: 'RELOAD_CARDS',
        payload: cards,
    };
}