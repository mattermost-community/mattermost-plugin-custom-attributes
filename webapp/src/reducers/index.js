import {combineReducers} from 'redux';

import ActionTypes from '../action_types';

function attributes(state = {}, action) {
    switch (action.type) {
    case ActionTypes.RECEIVED_ATTRIBUTES: {
        const nextState = {...state};
        nextState[action.userID] = action.data;
        return nextState;
    }
    default:
        return state;
    }
}

export default combineReducers({
    attributes,
});
