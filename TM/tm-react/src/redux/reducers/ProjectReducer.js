import { ActionTypes } from "../constants/ActionTypes.js";
const initialState = {
    projects : [],
};

export const projectReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.CREATE_PROJECT:
            return {
                projects: [...state.projects, payload]
            }
        case ActionTypes.EDIT_PROJECT:
            state.projects = state.projects.filter((project) => project.id !== payload.id);
            return {
                projects: [...state.projects, payload]
            }
            // return state;
        case ActionTypes.DELETE_PROJECT:
            return state;
        case ActionTypes.SET_PROJECTS:
            return {
                ...state, projects: payload
            };
        default:
            return state;
    }
}

export default projectReducer;