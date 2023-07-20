import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setProject, enableEditFrom } from "../../redux/actions/ProjectActions.js";

const BASEURL = "http://localhost:8004/public/api/v1/project/list";
const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('authorization') };

export function ProjectList() {
    const projects = useSelector((state) => state);

    const dispatch = useDispatch();
    useEffect(() => {
        const fetchProject = async () => {
           // Get datas from api
          axios
          .get(BASEURL, {
            headers
          })
          .then((response) => {
            const data = response.data;
            // Assign datas to Project
            dispatch(setProject(data.body));

          });
        };
        fetchProject();
      }, []);

      function toggleForm(event, param)
      {
        dispatch(enableEditFrom(param));
      }
      let listProjects = projects.allProjects.projects;
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
                        Action
                    </th>
                </tr>
                </thead>
                <tbody>
                {listProjects.map((project, index) => {
                    return (
                    <tr key={project.id}>

                        <td>
                            <p key={project.id}>
                                {project.name}
                            </p>
                        </td>

                        <td>
                            <button onClick={event => toggleForm(event, project.id)} className="btn btn-secondary m-2">Edit</button>
                        </td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
        </div>

    )
}

export default ProjectList;