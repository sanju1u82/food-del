import React , { useEffect, useState }from 'react'
import { assets } from '../../assets/assets'
import './Navbar.css'
import { Link } from 'react-router-dom';
import LoginPopUp from '../LoginPopUp/LoginPopUp';
import { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';
const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState('home');
    const navigate = useNavigate();

    const {getTotalCartAmount, token, setToken} = useContext(StoreContext)

    const logout= () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    }

    

  return (
    <div>
      <div className='navbar'>
        <Link to="/"> <img src={assets.logo} alt="" className='logo' /> </Link>
        
        <ul className='navbar-menu'>
          <Link to="/" onClick={() => setMenu("home")} className={menu==="home" ? "active" : ""} >Home</Link>
          <a href='#explore-menu' className={menu==="menu" ? "active" : ""} onClick={() => setMenu("menu")}>Menu</a>
          <a href='#app-download' className={menu==="mobile-app" ? "active" : ""} onClick={() => setMenu("mobile-app")}>Mobile-app</a>
          <a href='#footer' className={menu==="contact-us" ? "active" : ""} onClick={() => setMenu("contact-us")}>Contact us</a>
          </ul>
        <div className='navbar-right'>
          <img src={assets.search_icon} alt=""  />
          <div className="navbar-search-icon">
            <Link to='/cart'><img src={assets.basket_icon} alt="" />  </Link>
            <div className={getTotalCartAmount()===0?"": "dot"}></div>
          </div>
          {!token? <button onClick={() => setShowLogin(true)} className=''>Sign in</button>
          :<div className='navbar-profile'>
           <img src={assets.profile_icon} alt="" />
           <div className='navbar-profile-dropdown'>
            <li onClick={() => navigate('/myorders')}> <img src={assets.bag_icon} alt="" />Orders</li>
            <hr />
            <li onClick={logout}><img src={assets.logout_icon} alt="" />Logout</li>
            </div>
            </div>}
          
        </div>
      </div>

    </div>
  )
}

export default Navbar
