// import {useEffect, useState} from "react"
// import { assets } from "../../assets/assets"
// import axios from "axios"
// import "./Add.css"
// const Add = ({url}) => {
//     const [image,setImage] = useState(false);
//     const [data,setData] = useState({
//         name:"",
//         description:"",
//         price:"",
//         category:"Salad",
//     })
//     const onChangeHandler = (event) => {
//         const name = event.target.name
//         const value = event.target.value
//         setData(data=>({...data,[name]:value}))
//     }

//     useEffect(()=>{
//         console.log(data);
//     },[data])

//     const onSubmitHandler = async(event) => {
//         event.preventDefault();
//         const formData = new FormData();
//         formData.append("name",data.name)
//         formData.append("description",data.description)
//         formData.append("price",Number(data.price))
//         formData.append("category",data.category)
//         formData.append("image",image)
        
//         const response = await axios.post(`${url}/api/food/add`,formData);
//         if(response.data.success){
//             setData({
//                 name:"",
//                 description:"",
//                 price:"",
//                 category:"Salad",
//             })
//             setImage(false)
//         }
        
//     }

//   return (
//     <div className="add">
//       <form className="flex-col" onSubmit={onSubmitHandler}>
//         <div className="add-img-upload flex-col">
//             <p>Upload Image</p>
//             <label htmlFor="image">
//                 <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
//             </label>
//             <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required/>
//         </div>
//         <div className="add-product-name flex-col">
//             <p>Product Name</p>
//             <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Type here"/>
//         </div>
//         <div className="add-product-description flex-col">
//             <p>Product Description</p>
//             <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder="Write Content Here" required></textarea>
//         </div>
//         <div className="add-category-price">
//             <div className="add-category flex-col">
//                 <p>Product Category</p>
//                 <select onChange={onChangeHandler} name="category">
//                     <option value="Salads">Salads</option>
//                     <option value="Rolls">Rolls</option>
//                     <option value="Desserts">Desserts</option>
//                     <option value="Sandwiches">Sandwiches</option>
//                     <option value="Cakes">Cakes</option>
//                     <option value="Pure Veg">Pure Veg</option>
//                     <option value="Pasta">Pasta</option>
//                     <option value="Noodles">Noodles</option>
//                 </select>
//             </div>
//             <div className="add-price flex-col">
//                 <p>Product Price</p>
//                 <input onChange={onChangeHandler} value={data.price} type="Number" name="price" placeholder="$20"/>
//             </div>
//         </div>
//         <button type="submit" className="add-btn">ADD</button>
//       </form>
//     </div>
//   )
// }

// export default Add

import React, {useState, useEffect} from 'react'
import "./Add.css"
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Add = () => {

    const url = "http://localhost:4000"
    const [image,setImage] = useState(false);
    const [data,setData] = useState({
            name:"",
            description:"",
            price:"",
            category:"Salad",
        })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data=>({...data,[name]:value}))
    }

    useEffect(()=>{
        console.log(data);
    },[data])

    const onSubmitHandler = async (event) => {
    event.preventDefault();

    toast.success("Added successfully!", {
      position: "top-right",
      autoClose: 3000,
    });

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    console.log("Form Data: ", formData); // Debug log

    try {
        const response = await axios.post(`${url}/api/food/add`, formData);
        console.log(response.data); // Debug response
        
        if (response.data.success) {
            // Reset form and image on success
            setData({
                name: "",
                description: "",
                price: "",
                category: "Salad",
            });
            setImage(false);
            alert("✅ Food item added successfully!"); // Show success message using toast
            // Refresh the page after success
            window.location.reload(); // This will reload the page // You can also use a success message here
            
            // Optionally, if you want to refresh the page or redirect:
            // window.location.reload(); // to reload the page
        } else {
            alert("❌ Failed to add food item."); // Show error message using toast
        }
    } catch (error) {
        console.error("Error during form submission:", error);
    }
};

    return (
        <div className="add">
            <form className="flex-col" onSubmit={onSubmitHandler} >
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={assets.upload_area } alt="" />
                    </label>
                        <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={(e) => {
                            console.log("Image selected:", e.target.files[0]); // Debug log
                            setImage(e.target.files[0]);
                        }}
                        style={{ display: 'none' }} // if you want to hide the file input and use the label image
                    />
                </div>

                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input type="text" name="name" placeholder="Type here" onChange={onChangeHandler} />
                </div>

                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea name="description" rows="6" placeholder="Write Content Here" required onChange={onChangeHandler}></textarea>
                </div>

                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select name="category" onChange={onChangeHandler}>
                            <option value="Salads">Salads</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Desserts">Desserts</option>
                            <option value="Sandwiches">Sandwiches</option>
                            <option value="Cakes">Cakes</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>

                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input type="Number" name="price" placeholder="$20" onChange={onChangeHandler} />
                    </div>
                </div>
                <button  type="submit" className="add-btn">ADD</button>

            </form>
        </div>
    );
};

export default Add

