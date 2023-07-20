import { Navbar } from "../navbar/Navbar.jsx";
import { Footer } from "../Footer/Footer.jsx";
import { SourceControlList } from "./SourceControlList.jsx";
import { SourceControlCreateForm } from "./SourceControlCreateForm.jsx";
import { SourceControlEditForm } from "./SourceControlEditForm.jsx";
import "./SourceControl.css";
import { useSelector } from "react-redux";


export function SourceControl()
{
    const state = useSelector((state) => state);

    return(
        <>
            <div className="bg-color hg-100 ">
                <Navbar />
                <div className="bg-white border border-5 rounded-5 m-90 margin-auto border-radius-pill">
                    <h1 className="p-2">Source Control</h1>
                    <div className="w-100 display-flex">

                        <SourceControlList />
                        {!state.sourceControl.sourceControlEditForm && <SourceControlCreateForm />}
                        {state.sourceControl.sourceControlEditForm && <SourceControlEditForm />}

                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default SourceControl;