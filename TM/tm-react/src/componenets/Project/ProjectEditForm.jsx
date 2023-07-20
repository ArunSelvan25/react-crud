import { useSelector, useDispatch } from "react-redux";
import { disableEditFrom, editProject } from "../../redux/actions/ProjectActions.js";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function ProjectEditForm()
{
    const dispatch = useDispatch();
    const projects = useSelector((state) => state);
    const currentProject = projects.allProjects.projects.find((project) => project.id == projects.formToggle.formToggle);
    const [name, setName] = useState('');
    const UPDATEURL = "http://localhost:8004/public/api/v1/project/update";
    const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('authorization') };

     // Success toast
    const showSuccessToastMessage = (message) => {
        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    // Error toast
    const showErrorToastMessage = (message) => {
        toast.error(message, {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    
    function handleName(e)
    {
        setName(e.target.value)
    }

    function handleUpdate(e)
    {
        e.preventDefault();
        // Send datas to api
        axios
        .post(UPDATEURL, {
            name: name,
            id: currentProject.id
        }, {
            headers: headers
        })
        .then((response) => {
            showSuccessToastMessage(response.data.message);
            dispatch(disableEditFrom(0));
            dispatch(editProject(response.data.body));
            document.getElementById("update-form").reset();
        });
    }

    return(
        <>
            <div className="w-50">
                <h3>Edit Form</h3>
                <hr />
                <form className="w-100 p-2" id="update-form">
                    <div className="mb-3">
                        <label>Name</label>
                        <input
                            id="name"
                            type="text"
                            className="form-control"
                            defaultValue={currentProject.name}
                            onChange={handleName}
                            />
                    </div>

                    <button className="btn btn-primary" onClick={handleUpdate}>
                        Update
                    </button>
                </form>
                <ToastContainer />
            </div>
        </>
    )
}

export default ProjectEditForm;
