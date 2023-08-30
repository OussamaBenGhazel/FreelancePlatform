import React, {useState} from 'react'
import './SignUp.css'
import axios from 'axios';
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom';

function SignUp() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [matchPwd, setMatchpwd] = useState('');
    const navigate = useNavigate()
    const data = {
        Username: username,
        password: password
    }

    const Submit = (e) =>{ 
    e.preventDefault();
    if(matchPwd === password) {
        axios.post('http://localhost:4000/login/add', data)
        .then((res)=>{
        console.log(res);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Account has been created successfully',
            showConfirmButton: false,
            timer: 3000
          })
          navigate(`/login`)
     
        }).catch((error)=>{
            console.log(error);
        })
    } else {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Oops... SignUp failed',
            text: 'Passwords not matching',
            footer: 'Try again!'

          })
    }
    



    }

  return (
    <div className='main'>
        <form className='container ' onSubmit={Submit}>
  <div className='content-container bg-dark'>
      <h3 className='text-light text-center'>Register</h3>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label text-light">Username</label>
    <input type="text" value={username} className="form-control" id="exampleInputEmail1" onChange={(e)=>setUsername(e.target.value)} />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label text-light">Password</label>
    <input type="password" value={password} className="form-control" id="exampleInputPassword1" onChange={(e)=>setPassword(e.target.value)} />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword2" className="form-label text-light">Confirm Password</label>
    <input type="password" className="form-control" id="exampleInputPassword2" value={matchPwd}  onChange={(e)=>setMatchpwd(e.target.value)}/>
  </div>
  
  <button type="submit" className="btn btn-primary">Create User</button>
  </div>
</form>
  </div>
  )
}

export default SignUp