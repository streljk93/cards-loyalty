import uuid from 'uuid/v4';

export function addRuleCardSite ({ card_site_id, rule_id, sign, value, result }) {
    return {
        type: 'ADD_RULE_CARD_SITE',
        payload: {
            id: uuid(),
            card_site_id,
            rule_id,
            sign,
            value,
            result,
        },
    };
};