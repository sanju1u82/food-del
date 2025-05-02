import React, {useContext} from 'react'
import './Cart.css'
import {StoreContext} from '../../Context/StoreContext'
import PlaceOrder from '../PlaceOrder/PlaceOrder'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

  const {food_list,
    cartItems, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext)
    const navigate = useNavigate();

const handleCheckout = () => {
  if (getTotalCartAmount() === 0) {
    alert("Your cart is empty. Please add items before checking out.");
  } else {
    navigate('/order');  // <-- This navigates to PlaceOrder page
  }
};


  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
       {food_list.map((item, index) => {
        if(cartItems[item._id] > 0) {

          const formattedImagePath = item.image
      ? item.image.replace(/^uploads[\\/]/, '').replace(/\\/g, '/')
      : '';
    const imageUrl = `${url}/images/${formattedImagePath}`;

    
          return (
            <div>
              <div className="cart-items-title cart-items-item" key={index}>
              <img src={imageUrl} alt="" />
              <p>{item.name}</p>
              <p>${item.price}</p>
              <p>{cartItems[item._id]}</p>
              <p>${item.price * cartItems[item._id]}</p>
              <p className='cross' onClick={() => removeFromCart(item._id)}>x</p>
            </div>
            <hr />

            </div>
          );
        }
      })}
      </div>


      <div className='cart-bottom'>
        <div className="cart-total">
          <h2> Card Total</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>${getTotalCartAmount()}</p>

            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:5}</p> {/* Assuming a fixed delivery fee for now */}
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>${getTotalCartAmount()===0?0:getTotalCartAmount() + 5}</p>
            </div>
          </div>
          <button onClick={handleCheckout} className='cart-checkout'>Checkout</button>

        </div>

        <div className="cart-promocode">
          <p>If you have a promo code, enter it here:</p>
          <div className="cart-promocode-input">
            <input type="text" placeholder="Promo code" />
          <button>Apply</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
