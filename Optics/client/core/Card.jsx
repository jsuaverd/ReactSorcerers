import React from 'react'

function Card(props) {
   let  imgSrc = './images/g-'+props.imgSrc+".png"
  return (
    <div className= "Card1">
        <img src= {imgSrc} alt=""/>
        <div className="price">
            <h6>
              ${props.price}
            </h6>
            <a href="">
              Add to Cart
            </a>
          </div>
        </div>)
}

export default Card