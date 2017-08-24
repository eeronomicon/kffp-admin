import { GET_SHOW, USER_SHOW_SELECT, SHOW_SELECT } from '../constants';

const initialState = {
    currentShow: {},
    shows: [],
    userShows: []
};

export default function showReducer (state = initialState, action) {
    switch (action.type) {

    case GET_SHOW:
        return {
            ...state,
            currentShow: action.data
        };

    case USER_SHOW_SELECT:
        return {
            ...state,
            userShows: action.data
        };

    case SHOW_SELECT:
        return {
            ...state,
            shows: action.data
        };

    default:
        return state;
    }
}
