import React, {useContext} from 'react';
import './FoodItem.css'
import { assets } from '../../assets/assets'
import {StoreContext} from '../../Context/StoreContext'


// get the image, price, description, and name from the food_list array in the StoreContext
const FoodItem = ({id, name, description, price, image}) => {

const {cartItems, addToCart, removeFromCart, url} = useContext(StoreContext);

const formattedImagePath = image
    ? image.replace(/^uploads[\\/]/, '').replace(/\\/g, '/')
    : '';

  const imageUrl = `${url}/images/${formattedImagePath}`;

  return (
    <div className='food-item'>
      <div className='food-item-img-container'>
        <img src={imageUrl} alt={name} className='food-item-image' />
        {!cartItems[id]
            ? <img className="add" onClick={()=>addToCart(id)} src={assets.add_icon_white} alt=""></img>
            : <div className="food-item-counter">
                <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                <p>{cartItems[id]}</p>
                <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
            </div>

        }
      </div>
      <div className="food-item-info">
        <div className='food-item-name-rating'>
            <p>{name}</p>
            <img src={assets.rating_starts} alt="" />

            </div>
            <p className='food-item-desc'>{description}</p>
            <p className='food-item-price'>Price: ${price}</p>
      </div>
    </div>
  )
}

export default FoodItem
