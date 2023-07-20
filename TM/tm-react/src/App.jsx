import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import { Login } from "./componenets/Login/Login.jsx";
import { Dashboard } from "./componenets/Dashboard/Dasboard.jsx";
import { Landing } from "./componenets/Landing/Landing.jsx";
import { Project } from "./componenets/Project/Project.jsx";
import { SourceControl } from "./componenets/SourceControl/SourceControl.jsx";
import { TaskSheet } from "./componenets/TaskSheet/TaskSheet.jsx";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing/>} exact />
          <Route path="/login" element={<Login/>} exact />
          <Route path="/dashboard" element={<Dashboard/>} exact />
          <Route path="/source-control" element={<SourceControl/>} />
          <Route path="/project" element={<Project/>} />
          <Route path="/task-sheet" element={<TaskSheet/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
