import "./Login.css"
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { RightImg } from "../Login/RightImg.jsx";

const BASEURL = "http://localhost:8004/public/api/v1/login";
export function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  function handleLogin(e) {
    e.preventDefault()
    // Send datas to api
    axios
      .post(BASEURL, {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data.status == true) {
          showSuccessToastMessage(response.data.message)
          sessionStorage.setItem('authorization', response.data.body);
          navigate('/dashboard');
        } else {
          showErrorToastMessage(response.data.message)
        }
      });
  }

  function handleEmail(e) {
    // Handle email change event
    if(e.target.value == '') {
      showErrorToastMessage('Please enter email');
    } else {
      // Assign email to useState
      setEmail(e.target.value);
    }
  }

  function handlePassword(e) {
    // Handle password change event
    if(e.target.value == '') {
      showErrorToastMessage('Please enter password');
    } else {
      // Assign password to useState
      setPassword(e.target.value);
    }
  }

    return (
      <>

        <div className="dis-flex">
          <div className="w-50 asdsa">
            <form>

            <h2>Sign In</h2>

              <label>Email</label><br />
              <input type="email" name="email" className="input-form" onChange={handleEmail}></input><br />
              <label>Password</label><br />
              <input type="password" name="password" className="input-form" onChange={handlePassword}></input><br />
              <button onClick={handleLogin}>Sign In</button>
              <ToastContainer />
            </form>
          </div>
          <div className="w-50">
            <RightImg />
          </div>
        </div>
      </>
  );
}

export default Login;