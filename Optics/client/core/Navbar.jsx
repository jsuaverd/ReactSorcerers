

import React, {useEffect, useState} from 'react';
import { read } from '../auth/api-auth';
import { useNavigate } from 'react-router';
import { Navigate } from 'react-router-dom';


export const withRouter = (Component) =>{
  
    const Wrapper = (props) =>{
        const history = useNavigate();
        return <Component history={history} {...props}/>
    } 
    return Wrapper;
}
import Button from '@material-ui/core/Button'

import auth from '../auth/auth-helper'

import {Link} from 'react-router-dom'

import './css/bootstrap.css'
import './css/responsive.css'
import './css/style.css'
import './css/style.scss'
import user from '../../server/models/user';
// import './css/style.css.map'


   

// const useStyles = makeStyles(theme => ({
//   card: {
//     maxWidth: 600,
//     margin: 'auto',
//     marginTop: theme.spacing(5),
//   },
//   title: {
//     padding: theme.spacing(3, 2.5, 2),
//     color: theme.palette.openTitle,
//   },
//   media: {
//     minHeight: 400,
//   },
// }));

export default function Navbar(){ 
// const classes = useStyles()
const navigate = useNavigate()
  const [values, setValues] = useState({
    name: "",
    email: "",
    newPassword: '',
  });
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
  
   
    const { name, email, newPassword } = values;
    if (auth.isAuthenticated()){
    read({
      userId: auth.isAuthenticated().user._id
    }, {t: auth.isAuthenticated().token}, signal).then((data) => {
      if (data && data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, name: data.name, email: data.email})
      }
    })}
    return function cleanup(){
      abortController.abort()
    }
  
  }, [auth])



return (

    <header className="header_section">
<div className="container-fluid">
        <nav className="navbar navbar-expand-lg custom_nav-container pt-3">
          <a className="navbar-brand mr-5" href="/">
            <span>
              Bright Optics
            </span>
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="d-flex mr-auto flex-column flex-lg-row align-items-center">
              <ul className="navbar-nav  ">
                <li className="nav-item ">
                  <a className="nav-link" href="/">Home </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/about"> About </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/shop"> Shop </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/glasses"> Glasses </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/contact">Contact us</a>
                </li>
              </ul>
            </div>
            <div className="quote_btn-container ">
              
              <a href="">
                <img src="./images/cart.png" alt="" />
              </a>
              {
        !auth.isAuthenticated() && (<span>
          <Link to="/signup">
            <Button style={{"color":"white"}}>Sign up
            </Button>
          </Link>
          <Link to="/login">
            <Button style={{"color":"white"}}>Sign In
            </Button>
          </Link>
        </span>)
      }
      {
        auth.isAuthenticated() && (<span>
            <Button style={{"color":"white"}}  onClick={()=>navigate("/update")}>{values.name}</Button>
            <Link to="/"><Button style={{"color":"white"}} onClick={() => {
              auth.clearJWT(()=>{
                <Navigate to="/"/>
                // navigate(0)
              })
            }}>Sign out</Button></Link>
        </span>)
      }
              <form className="form-inline">
                <button className="btn  my-2 my-sm-0 nav_search-btn" type="submit"></button>
              </form>
            </div>
          </div>
        </nav>
      </div>
</header>



)}



