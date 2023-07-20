import { ActionTypes } from "../constants/ActionTypes.js";

export const setProject = (project) => {
    return {
        type: ActionTypes.SET_PROJECTS,
        payload: project
    }
}

export const createProject = (project) => {
    return {
        type: ActionTypes.CREATE_PROJECT,
        payload: project
    }
}

export const editProject = (project) => {
    return {
        type: ActionTypes.EDIT_PROJECT,
        payload: project
    }
}

export const deleteProject = (project) => {
    return {
        type: ActionTypes.DELETE_PROJECT,
        payload: project
    }
}

export const enableEditFrom = (toggleValue) => {
    return {
        type: ActionTypes.FORM_TOGGLE_ENABLE,
        payload: toggleValue
    }
}

export const disableEditFrom = (toggleValue) => {
    return {
        type: ActionTypes.FORM_TOGGLE_DISABLE,
        payload: toggleValue
    }
}