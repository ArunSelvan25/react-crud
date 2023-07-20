import { Navbar } from "../navbar/Navbar.jsx";
import { Footer } from "../Footer/Footer.jsx";
import { ProjectList } from "./ProjectList.jsx";
import { ProjectCreateForm } from "./ProjectCreateForm.jsx";
import { ProjectEditForm } from "./ProjectEditForm.jsx";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Project() {
    const state = useSelector((state) => state);

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
    return(
        <>
            <div className="bg-color hg-100">
                <Navbar />
                <div className="bg-white rounded-5 m-90 margin-auto border-radius-pill">
                    <h1 className="p-2">Project Management</h1>
                    <div className="w-100 display-flex">
                        <ProjectList />
                        {!state.formToggle.formToggle && <ProjectCreateForm />}
                        {state.formToggle.formToggle && <ProjectEditForm />}
                    </div>
                    <ToastContainer />
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Project;