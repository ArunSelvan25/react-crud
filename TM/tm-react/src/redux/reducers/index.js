import { combineReducers } from "redux";
import { projectReducer } from "./ProjectReducer";
import { formToggle } from "./ProjectFormToggleReducer";
import { SourceControlReducer } from "./SourceControl/SourceControlReducer";

const reducers = combineReducers({
    allProjects: projectReducer,
    formToggle: formToggle,
    sourceControl: SourceControlReducer,
});

export default reducers;