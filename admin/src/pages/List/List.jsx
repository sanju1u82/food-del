// import "./List.css"
// import {useState,useEffect} from "react"
// import axios from "axios"
// const List = ({url}) => {

//   const [list,setList] = useState([])
//   const fetchList = async () => {
//     const response = await axios.get(`${url}/api/food/list`)
//     if(response.data.success){
//       setList(response.data.data);
//     }
    
//   }
  
//   useEffect(()=>{
//     fetchList();
//   },[])
//   return (
//     <div className="list add flex-col">
//       <p>All Foods List</p>
//       <div className="list-table">
//         <div className="list-table-format title">
//           <b>Image</b>
//           <b>Name</b>
//           <b>Category</b>
//           <b>Price</b>
//           <b>Action</b>
//         </div>
//         {list.map((item,index)=>{
//           return (
//             <div key={index} className="list-table-format">
//               <img src={`${url}/images/`+item.image} alt="" />
//               <p>{item.name}</p>
//               <p>{item.category}</p>
//               <p>${item.price}</p>
//               <p onClick={()=>removeFood(item._id)} className="cursor"><MdDelete/></p>
//             </div>
//           )
//         })}
//       </div>
//     </div>
//   )
// }

// export default List

import React, { useState, useEffect } from 'react';
import "./List.css";
import axios from "axios";

const List = () => {
  const url = "http://localhost:4000";
  const [list, setList] = useState([]);

  // Function to fetch list of food items
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        alert("Error fetching data");
      }
    } catch (error) {
      console.error("Error fetching food list:", error);
      alert("An error occurred while fetching the food list");
    }
  };

  const removeFood = async (id) => {
  try {
    // Sending the ID as part of the URL, not in the request body
    const response = await axios.delete(`${url}/api/food/remove/${id}`);
    if (response.data.success) {
      await fetchList();  // Fetch the updated list
    }
  } catch (error) {
    console.error("Error deleting food:", error);  // Handle error if request fails
  }
};


  useEffect(() => {
    fetchList();
  }, []);

 
  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          // Format the image URL to replace backslashes with forward slashes
          
           const formattedImagePath = item.image
            ? item.image.replace(/^uploads\\/, '').replace(/\\/g, '/')
            : '';
          
          return (
            
            <div key={index} className="list-table-format">
              
              <img src={`${url}/images/` + formattedImagePath} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={()=>removeFood(item._id)} className="cursor">x</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
