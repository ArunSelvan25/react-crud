import { SourceControlActionType } from "../constants/SourceControlActionType";

export const setSourceControl = (sourceControl) => {
    return {
        type: SourceControlActionType.SET_SOURCE_CONTROL,
        payload: sourceControl
    }
}

export const addSourceControl = (sourceControl) => {
    return {
        type: SourceControlActionType.CREATE_SOURCE_CONTROL,
        payload: sourceControl
    }
}

export const editSourceControl = (sourceControl) => {
    return {
        type: SourceControlActionType.EDIT_SOURCE_CONTROL,
        payload: sourceControl
    }
}

export const deleteSourceControl = (id) => {
    return {
        type: SourceControlActionType.DELETE_SOURCE_CONTROL,
        payload: id
    }
}

export const enableSourceControlEditFrom = (toggleValue) => {
    return {
        type: SourceControlActionType.SOURCE_CONTROL_EDIT_ENABLE,
        payload: toggleValue
    }
}