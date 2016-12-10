import { SET_FORM_FIELDS } from '../constants';

const initialstate = {};

export default function modelReducer (state = initialstate, action) {
    switch (action.type) {

    case SET_FORM_FIELDS:
        const { fields, modelName, formType } = action.data;
        return {
            ...state,
            fields,
            modelName,
            formType
        };

    default:
        return state;
    }
}

/*
model: {
    name: 'Shows',
    fields: {
        new: {},
        show: {},
        edit: {}
    },
    type: 'new',
    data: {}
}
*/
