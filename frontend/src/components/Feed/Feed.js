import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Feed.css'
import Swal from 'sweetalert2';

function Feed() {
  const { id } = useParams();
  const [feed, setFeed] = useState([]);
  const [showAddpost, setShowAddpost] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const formData = {
    title : title ,
    feedOwner : id ,
    description : description ,
    message : message,
  }

  const getData = () => {
    axios.get('http://localhost:4000/feed/getfeed')
      .then((res) => {
        setFeed(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleDelete = (e, id) => {
    e.preventDefault()
    axios.delete(`http://localhost:4000/feed/delete/${id}`).then((res) => {
      console.log(res);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Post has been deleted successfully',
        showConfirmButton: false,
        timer: 3000
      })
      getData()
    }).catch((err) => {
      console.log(err);
    })
  }

  const AddPost =(e)=>{
    e.preventDefault();
    
    axios.post('http://localhost:4000/feed/addfeed',formData)
    .then((res)=>{
    console.log(res);
    setShowAddpost(false);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Post has been created successfully',
      showConfirmButton: false,
      timer: 3000
    })
    getData()
    }).catch((error)=>{
      console.log(error);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Oops... Adding proccess failed !',
        text: 'Server error',
        footer: 'Try again!'

      })
    })
  }

  

  useEffect(() => {
    getData()
  }, []);

  return (
    <div className={'main'}>
        <button type="button" className="btn btn-outline-info m-5" onClick={() => setShowAddpost(true)}>Add a post</button>
        {
            showAddpost ? (
                <>
                    <div className='bg'></div>
                    <div className='popup'>
                        <span className='close' onClick={() => setShowAddpost(false)}><b>X</b></span>
                        <form className="login-form" onSubmit={AddPost}>
                        <div className="content-container">
                        <div className="mb-3">
                          <label htmlFor="exampleInputtitle" className="form-label text-light">
                            Title
                          </label>
                          <input
                            required
                            type="text"
                            className="form-control"
                            value={title}
                            onChange={(e)=>setTitle(e.target.value)}
                            
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="exampleInput1" className="form-label text-light">
                            description
                          </label>
                          <textarea
                            required
                            type="text"
                            className="form-control"
                            value={description}
                            onChange={(e)=>setDescription(e.target.value)}
                            
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="exampleInput2" className="form-label text-light">
                            message
                          </label>
                          <textarea
                            required
                            type="text"
                            className="form-control"
                            value={message}
                            onChange={(e)=>setMessage(e.target.value)}
                            
                          />
                          </div>
                        
                        <button type="submit" className="btn btn-primary" >
                          Add
                        </button>
                        
                        </div>
                      </form>
                    </div>
                </>
            ) : null
        }
        <div className='main-container'>
            {feed.map((c, index) => (
              <div className="card text-center text-bg-dark mb-3" style={{'width': '50rem', 'margin': '50px'}} key={index}>
              <div className="min-title card-header bg-info">
                <b>JOB {index + 1} </b>
                {c.feedOwner === id ? (
                <svg onClick={(e) => handleDelete(e, c._id)} xmlns="http://www.w3.org/2000/svg" color='red' cursor='pointer' width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                </svg>
                ) : null}
              </div>
              <div className="card-body">
                <h5 className="card-title">{c.title}</h5>
                <p className="card-text">{c.description}</p>
                <p className="card-text">{c.message}</p>
              </div>
            </div>
            ))}
        </div>
    </div>
  );
}

export default Feed;
