import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import axios from "axios";

const BASEURL = "http://localhost:8004/public/api/v1/logout";

export function Navbar() {

  const navigate = useNavigate();

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

  function handleSourceControl() {
    navigate('/source-control/list');
  }

  function handleLogout(e) {
    e.preventDefault()
    const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('authorization') };
    // Send datas to api
    axios
      .get(BASEURL, {
        headers 
      })
      .then((response) => {
        if (response.data.status == true) {
          navigate('/login');
          showSuccessToastMessage(response.data.message)
        } else {
          showErrorToastMessage(response.data.message)
        }
      });
  }

    return (
      <>
      <div className="container p-5">
        <nav className="navbar navbar-default fixed-top p-2">
          <div className="container-fluid">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-white" href="#" id="profile-menu" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Masters
              </a>
              <ul className="dropdown-menu" aria-labelledby="profile-menu">
                <li><Link className="font-sans" to="/source-control" >Source Control</Link></li>
                <li><Link className="font-sans" to="/project" >Project</Link></li>
              </ul>
            </li>

            <li className="nav-item dropdown">
             
                <li><Link className="font-sans" to="/task-sheet" >Task Sheet</Link></li>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-white" href="#" id="profile-menu" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Profile
              </a>
              <ul className="dropdown-menu" aria-labelledby="profile-menu">
                <li><Link className="font-sans" onClick={handleLogout} >Logout</Link></li>
              </ul>
            </li>
          </div>
          
        </nav>

        {/* <nav class="navbar navbar-default lg:block mx-8">
          <div className="container-fluid">
            <ul>
                <li className="nav-item dropdown">
                    <a href="#" class="top-menu">
                      
                        <div class="top-menu__title font-sans">Project </div>
                    </a>
                </li>
            </ul>
            <ul>
                <li>
                    <a href="#" class="top-menu">
                        
                        <div class="top-menu__title font-sans"> Source Control
                        </div>
                    </a>
                </li>
            </ul>
          </div>
          
        </nav> */}
      </div>

      
        
      </>
    );
}

export default Navbar;