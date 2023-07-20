import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addSourceControl } from "../../redux/actions/SourceControlActions";
import { useDispatch } from "react-redux";


const STORE_URL = "http://localhost:8004/public/api/v1/source-control/store";
const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('authorization') };

export function SourceControlCreateForm()
{
    const dispatch = useDispatch();
    const [name, setName] = useState([]);
    const [link, setLink] = useState([]);

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

    function handleSourceControlCreate(e)
    {
        e.preventDefault();

        // Send datas to api
        axios
        .post(STORE_URL, {
            name: name,
            link: link,
        }, {
            headers: headers
        })
        .then((response) => {
            document.getElementById("create-form").reset();
            if (response.data.status == true) {
                dispatch(addSourceControl(response.data.body));
                showSuccessToastMessage(response.data.message)
            } else {
                showErrorToastMessage(response.data.message)
            }
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
                            onChange={e => setName(e.target.value)}
                            />
                    </div>

                    <div className="mb-3">
                        <label>Link</label>
                        <input
                            id="name"
                            type="text"
                            className="form-control"
                            onChange={e => setLink(e.target.value)}
                            />
                    </div>

                    <button className="btn btn-primary" onClick={handleSourceControlCreate}>
                        Store
                    </button>
                </form>
                <ToastContainer />
            </div>
        </>
    )
}

export default SourceControlCreateForm;