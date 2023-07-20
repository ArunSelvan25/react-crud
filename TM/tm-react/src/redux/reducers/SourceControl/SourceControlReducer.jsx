import { SourceControlActionType } from '../../constants/SourceControlActionType.js';

const initialState = {
    sourceControl : [],
};

export const SourceControlReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case SourceControlActionType.SET_SOURCE_CONTROL:
            return {
                ...state,
                sourceControl: payload
            };

        case SourceControlActionType.CREATE_SOURCE_CONTROL:
            return {
                ...state,
                sourceControl: [ 
                    ...state.sourceControl,
                    payload
                ]
            };

        case SourceControlActionType.SOURCE_CONTROL_EDIT_ENABLE:
            return {
                ...state,
                sourceControlEditForm: payload
            };

        case SourceControlActionType.EDIT_SOURCE_CONTROL:
            state.sourceControl = state.sourceControl.filter((singleSourceContorl) => singleSourceContorl.id !== payload.id);
            return {
                ...state,
                sourceControl: [
                    ...state.sourceControl, payload
                ],
                sourceControlEditForm: 0
            };

        case SourceControlActionType.DELETE_SOURCE_CONTROL:
            state.sourceControl = state.sourceControl.filter((singleSourceContorl) => singleSourceContorl.id !== payload);
            return {
                ...state,
                sourceControl: [
                    ...state.sourceControl
                ],
            };
    
        default:
            return state;
    }
}

export default SourceControlReducer;