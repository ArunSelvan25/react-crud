import { Navbar } from "../navbar/Navbar.jsx";
import { Footer } from "../Footer/Footer.jsx";
import "./TaskSheet.css";
import { TaskSheetList } from "./TaskSheetList.jsx";

export function TaskSheet()
{
    return(
        <>
            <div className="bg-color hg-100">
                <Navbar />
                <div className="bg-white border border-5 rounded-5 m-90 margin-auto border-radius-pill">
                    <h3 className="p-2">Task Sheet</h3>
                    <div className="w-100 display-flex">
                        <TaskSheetList />
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}


export default TaskSheet;