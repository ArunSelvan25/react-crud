import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setSourceControl, enableSourceControlEditFrom, deleteSourceControl } from "../../redux/actions/SourceControlActions.js";

// Source Control List Api
const LIST_URL = "http://localhost:8004/public/api/v1/source-control/list";
const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('authorization') };
const DELETE_URL = "";

export function SourceControlList()
{
    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSourceControl = async () => {
           // Get datas from api
          axios
          .get(LIST_URL, {
            headers
          })
          .then((response) => {
            const data = response.data.body;
            // Set state for source-control
            dispatch(setSourceControl(data));

          });
        };
        fetchSourceControl();
      }, []);

      function toggleForm(event, param)
      {
        dispatch(enableSourceControlEditFrom(param));
      }

      function handleDelete(event, id)
      {
        axios
        .get("http://localhost:8004/public/api/v1/source-control/delete/" + id, {
            headers
        })
        .then((response) => {
            const data = response.data.body;
            // Set state for source-control
            dispatch(deleteSourceControl(id));

        });
      }

      let listSourceControl = state.sourceControl.sourceControl;
    return(
        
        <div className="w-50">
            <h3>List</h3>
            <hr />
            <table className="table table-responsive table-hover">
                <thead>
                <tr>
                    <th>
                        Name
                    </th>
                    <th>
                        Link
                    </th>
                    <th>
                        Action
                    </th>
                </tr>
                </thead>
                <tbody>
                {listSourceControl.map((sourceControl) => {
                    return (
                    <tr key={sourceControl.id}>

                        <td>
                            <p key={sourceControl.id}>
                                {sourceControl.name}
                            </p>
                        </td>

                        <td>
                            <p key={sourceControl.id}>
                                {sourceControl.link}
                            </p>
                        </td>

                        <td>
                            <button onClick={event => toggleForm(event, sourceControl.id)} className="btn btn-secondary m-2">Edit</button>
                            <button onClick={event => handleDelete(event, sourceControl.id)} className="btn btn-warning m-2">Delete</button>
                        </td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
        </div>

    )
}

export default SourceControlList;