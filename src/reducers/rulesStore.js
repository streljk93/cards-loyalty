import uuid from 'uuid/v4';
import moment from 'moment';

const initialState = [{
    sign: '=',
    left: '{_INT_} руб.',
    right: '{_INT_} бонус.',
    uuid: uuid(),
}]

const rulesStore = (state = initialState, action) => {
    switch (action.type) {

        default:
            return state;

    }
};

export default rulesStore;