import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, Link } from 'react-router-dom';
import { signup } from '../auth/api-auth';

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [userInfo, setUserInfo] = useState();
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    redirectToReferrer: false,
  });

  const submitFn = async (data) => {
    console.log(data);
    setUserInfo(data);
    const user = {
      name: userInfo.name || undefined,
      email: userInfo.email || undefined,
      password: userInfo.password || undefined,
    };

    if (user.email !== undefined) {
      signup(user).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, error: '', redirectToReferrer: true });
        }
      });
    }
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const { redirectToReferrer } = values;

  if (redirectToReferrer) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="page">
      <div className="signupPage">
        <form onSubmit={handleSubmit(submitFn)} className="container-signup">
          <h1 className="heading1">Signup</h1>
          <div className="ui-form2">
            <div className="field1">
              <input
                onChange={handleChange('name')}
                type="text"
                name="name"
                placeholder="Name"
                {...register('name', { required: 'Name is required' })}
              />
            </div>
            <p>{errors.name?.message}</p>
            <div className="field2">
              <input
                onChange={handleChange('email')}
                type="email"
                name="email"
                placeholder="Email"
                {...register('email', { required: 'Email is required', pattern: /^\S+@\S+$/i })}
              />
            </div>
            <p>{errors.email?.message}</p>
            <div className="field3">
              <input
                onChange={handleChange('password')}
                type="password"
                name="password"
                placeholder="Password"
                {...register('password', { required: 'Password is required' })}
              />
            </div>
            <p>{errors.password?.message}</p>
            <div className="buttons">
              <button className="signup-submit" type="submit">
                Submit
              </button>
              <button className="signup-reset" type="button">
                Reset
              </button>
            </div>
            <p className ="p">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
