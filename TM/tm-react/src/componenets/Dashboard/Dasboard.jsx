import { Navbar } from "../navbar/Navbar.jsx";
import { Footer } from "../Footer/Footer.jsx";
import { ToastContainer } from 'react-toastify';
import "./Dashboard.css"
export function Dashboard() {
    return (
      <div className="bg-color hg-100">
        <Navbar />
        <div className="bg-white rounded-5 m-90 margin-auto border-radius-pill">
          
        </div>
        <Footer />
      </div>
    );
}

export default Dashboard;