// It's for frontend components to share data internally.
// https://www.w3schools.com/react/react_usecontext.asp use this website for better undertanding of useContext



import { createContext, useEffect, useState, useContext } from "react";
import { food_list } from "../assets/assets";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);


  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };
  const loadCartData = async(token) => {
    const response = await axios.post(url + "/api/cart/get", {}, { headers: {token} });
    setCartItems(response.data.cartData);
  }

  useEffect(() => {
        
        async function loadData(){
          await fetchFoodList();
          if(localStorage.getItem("token")){
          setToken(localStorage.getItem("token"));
          await loadCartData(localStorage.getItem("token"));
        }
        }
        loadData();
      }, [setToken]);


  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if(token){
      axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
        
    }
    
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(token){
      axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } })
    }
    
  };

   const getTotalCartAmount = () => {
  let totalAmount = 0;
  for (const item in cartItems) {
    if (cartItems[item] > 0) {
      const itemInfo = food_list.find(product => product._id == item); // Use == for type conversion
      if (itemInfo) {
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
  }
  

    return totalAmount;
  };
  useEffect(()=>{
    console.log(cartItems)
  }, [cartItems])


  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
    
  }
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;