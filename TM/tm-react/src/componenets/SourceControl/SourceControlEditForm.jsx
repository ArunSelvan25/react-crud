import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { editSourceControl } from "../../redux/actions/SourceControlActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UPDATE_URL = "http://localhost:8004/public/api/v1/source-control/update";
const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('authorization') };

export function SourceControlEditForm()
{
    const dispatch = useDispatch();

    const source_control = useSelector((state) => state);
    const currentSourceControl = source_control.sourceControl.sourceControl.find((singleSourceContorl) => singleSourceContorl.id == source_control.sourceControl.sourceControlEditForm);
    const [name, setName] = useState(currentSourceControl.name);
    const [link, setLink] = useState(currentSourceControl.link);

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
    
    function handleUpdateSourceControl(e)
    {
        e.preventDefault();

        // Send datas to api
        axios
        .post(UPDATE_URL, {
            name: name,
            link: link,
            id: currentSourceControl.id
        }, {
            headers: headers
        })
        .then((response) => {
            document.getElementById("update-form").reset();
            showSuccessToastMessage(response.data.message)

            if (response.data.status == true) {
                dispatch(editSourceControl(response.data.body))
            } else {
                showErrorToastMessage(response.data.message)
            }
        });
    }

    function handleName(e)
    {
        setName(e.target.value)
    }

    function handleLink(e)
    {
        setLink(e.target.value)
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
                            defaultValue={currentSourceControl.name}
                            onChange={handleName}
                            />
                    </div>

                    <div className="mb-3">
                        <label>Link</label>
                        <input
                            id="name"
                            type="text"
                            className="form-control"
                            defaultValue={currentSourceControl.link}
                            onChange={handleLink}
                            />
                    </div>

                    <button className="btn btn-primary" onClick={handleUpdateSourceControl}>
                        Update
                    </button>
                </form>
                <ToastContainer />

            </div>
        </>
    )
}

export default SourceControlEditForm;