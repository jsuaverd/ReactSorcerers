import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import unicornbikeImg from './../assets/images/unicornbikeImg.jpg';


import './css/mystyle.css'


export default function Home(){ 
// const classes = useStyles()
return (
    

  <div className= "container1">
     <img src="./images/slider-bg.jpg" alt="glasses" ></img>
     <div className="top-left">  Bright Optics!</div>
     <div className = "button" > <a href="/shop"><button className = "button1" type="button">Buy Now</button></a></div>

  </div>

 
)}



