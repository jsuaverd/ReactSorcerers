
import React, { useState, useEffect } from 'react';
import auth from '../auth/auth-helper'
import { update, deleteUser,read } from '../auth/api-auth'
import { useNavigate } from 'react-router';

function Update() {
   const navigate = useNavigate()
    // Update user account
    const [values, setValues] = useState({
        name: auth.isAuthenticated().user.name,
        email: auth.isAuthenticated().user.email,
        newPassword: '',
    });

    const { name, email, newPassword } = values;

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
    
        read({
          userId: auth.isAuthenticated().user._id
        }, {t: auth.isAuthenticated().token}, signal).then((data) => {
          if (data && data.error) {
            setValues({...values, error: data.error})
          } else {
            setValues({...values, name: data.name, email: data.email})
          }
        })
        return function cleanup(){
          abortController.abort()
        }
    
      }, [auth.isAuthenticated().user._id])

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleSubmit = async (e) => {
        console.log(auth.isAuthenticated().user._id)
        e.preventDefault()
        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined
        }
        update({
            userId: auth.isAuthenticated().user._id
        }, {
            t: auth.isAuthenticated().token
        }, user).then((data) => {
            if (data && data.error) {
                setValues({...values, error: data.error})
            } else {
                // setValues({...values, userId: data._id, redirectToProfile: true})
                // auth.clearJWT(()=>{
                    navigate(0)
                //   })
            }
        })
    }

    const handleDelete = () => {
        deleteUser({
            userId: auth.isAuthenticated().user._id
        }, {
            t: auth.isAuthenticated().token
        }).then((data) => {
            if (data && data.error) {
                setValues({...values, error: data.error})
            } else {
                // Perform any necessary actions after deleting the account
                auth.clearJWT(()=>{
                    navigate("/")
                  })
            }
        })
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h1 className="p-5 text-center">Update Account</h1>
                        <br />
                        <br />

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="text-muted">Name</label>
                                <input onChange={handleChange('name')} type="text" value={name} className="form-control" />
                            </div>

                            <div className="form-group">
                                <label className="text-muted">Email</label>
                                <input onChange={handleChange('email')} type="email" value={email} className="form-control" />
                            </div>

                            <div className="form-group">
                                <label className="text-muted">New Password</label>
                                <input onChange={handleChange('newPassword')} type="password" value={newPassword} className="form-control" />
                            </div>

                            <div>
                                <button className="btn btn-primary" type='submit'>Submit</button>
                                <button className="btn btn-danger" onClick={handleDelete}>Delete Account</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Update
