import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createProject } from "../../redux/actions/ProjectActions.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const STOREURL = "http://localhost:8004/public/api/v1/project/store";
const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('authorization') };

export function ProjectCreateForm()
{
    const [name, setName] = useState([]);
    const dispatch = useDispatch();

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
        setName(e.target.value);
    }

    

    function handleProjectCreate(e)
    {
        e.preventDefault();
        // Send datas to api
        axios
        .post(STOREURL, {
            name: name,
        }, {
            headers: headers
        })
        .then((response) => {
            showSuccessToastMessage(response.data.message);
            dispatch(createProject(response.data.body));
            document.getElementById("create-form").reset();
        });
    }
    return(
        <>
            <div className="w-50">
                <h3>Form</h3>
                <hr />
                <form className="w-100 p-2" id="create-form">
                    <div className="mb-3">
                        <label>Name</label>
                        <input
                            id="name"
                            type="text"
                            className="form-control"
                            onChange={handleName}
                            />

                    </div>

                    <button className="btn btn-primary" onClick={handleProjectCreate}>
                        Store
                    </button>
                </form>
                <ToastContainer />
            </div>
        </>
    )
}

export default ProjectCreateForm;