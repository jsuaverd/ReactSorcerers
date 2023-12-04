import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import auth from '../auth/auth-helper';
import { useNavigate, Navigate } from 'react-router';
import { signin } from '../auth/api-auth';

function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [userInfo, setUserInfo] = useState();

  const submitFn = async (data) => {
    console.log(data);
    setUserInfo(data);
    const user = {
      email: userInfo.email || undefined,
      password: userInfo.password || undefined,
    };
    setTimeout(() => {
      if (user.email !== undefined) {
        signin(user).then((data) => {
          if (data.error) {
            setValues({ ...values, error: data.error });
          } else {
            auth.authenticate(data, () => {
              setValues({ ...values, error: '', redirectToReferrer: true });
            });
          }
        });
      }
    }, 500);
  };

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const clickSubmit = () => {
    console.log(userInfo.email);
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const resetForm = () => {
    reset(); // This will reset the form fields
  };

  const { redirectToReferrer } = values;
  if (redirectToReferrer) {
    return <Navigate to="/" />;
  }
  if (auth.isAuthenticated()) return <Navigate to="/" />;

  return (
    <div className="page">
      <div className="loginPage">
        <form onSubmit={handleSubmit(submitFn)} className="container-login">
          <h1 className="heading1">Login</h1>
          <div className="ui-form">
            <div className="field">
              <input
                onChange={handleChange('email')}
                type="email"
                name="email"
                placeholder="Email"
                {...register('email', { required: 'Email is required', pattern: /^\S+@\S+$/i })}
              />
            </div>
            <p>{errors.email?.message}</p>
            <div className="field">
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
              <button className="login-submit" type="submit">
                Submit
              </button>
              <button className="login-reset" type="button" onClick={resetForm}>
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
