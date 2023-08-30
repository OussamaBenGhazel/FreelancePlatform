import React, { useState } from 'react'
import './Login.css' 
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2'


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
    function Submit(e) {
      e.preventDefault()
        
    
        const formData = {
            username: username,
            password: password
        }
        console.log(formData);
         axios.post('http://localhost:4000/login/signIn', formData)
         .then(response => {
             if (response.status === 200) {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Logged in successfully',
                showConfirmButton: false,
                timer: 1500
              })
              localStorage.setItem('userID', response.data._id);
              navigate(`/feed/${response.data._id}`)
              console.log(response.data._id);
         
             }
         })
         .catch(error => {
          setUsername('')
          setPassword('')
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Oops...',
            text: 'Wrong Credentials!',
            footer: 'Try again!'

          })
             console.error('Error making post request:', error);
         });

    }



  return (
    <>
      <div className="containers">
        <form className="login-form" onSubmit={Submit}>
          <div className="content-container bg-dark">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label text-light">
              username
            </label>
            <input
              required
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label text-light">
              Password
            </label>
            <input
              required
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary" >
            Login
          </button>
          <div>
            <span><Link className="text-light" to="/signup">Click here to Sign Up</Link></span>
          </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login