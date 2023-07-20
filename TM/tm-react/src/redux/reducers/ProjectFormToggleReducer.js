import { ActionTypes } from "../constants/ActionTypes.js";
const initialState = {
    formToggle : 0,
};

export const formToggle = (state = initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.FORM_TOGGLE_ENABLE:
            return {
                formToggle: payload
            }
        case ActionTypes.FORM_TOGGLE_DISABLE:
            return {
                formToggle: 0
            }
        default:
            return state;
    }
}

export default formToggle;