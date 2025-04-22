import React, { useState } from 'react';
import { toast } from 'sonner';
import { createProduct } from '../../services/productApi';
import Loader from '../../components/Loader';

function AddProductAdmin() {
  const [image, setImage] = useState(null);
  const [show, setShow] = useState(true);

  const [values, setValues] = useState({
    title: "",
    description: "",
    category: "",
    type: "",
    team: "",
    price: "",
    branch: ""
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("category", values.category);
    formData.append("type", values.type);
    formData.append("team", values.team);
    formData.append("price", values.price);
    formData.append("branch", values.branch);
    formData.append("image", image); // Append the image file
    try {
      setShow(false);
      await createProduct(formData).then((res) => {        
        toast.success(res.data.message);
        setShow(true);
      }).catch((error) => {        
        toast.error(error.response.data.error);
        setShow(true);
      })
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container mt-[80px] px-4'>
      <h2 className='text-center text-xl font-bold text-gray-800 mb-6'>ADD NEW PRODUCT</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-lg max-w-md mx-auto">
        <div className='flex flex-col gap-4'>
          <input 
            type="text" 
            name="title" 
            placeholder='Enter title' 
            className='border border-gray-300 rounded-md p-2 text-gray-800' 
            onChange={handleChange} 
          />
          <textarea 
            name="description" 
            placeholder='Enter description' 
            className='border border-gray-300 rounded-md p-2 text-gray-800' 
            onChange={handleChange} 
          />
          
          <div className="flex gap-4">
            <label className='flex items-center gap-2'>
              <input type="radio" name="category" value="club" onChange={handleChange} />
              Club
            </label>
            <label className='flex items-center gap-2'>
              <input type="radio" name="category" value="nation" onChange={handleChange} />
              Nation
            </label>
          </div>

          <div className="flex gap-4">
            <label className='flex items-center gap-2'>
              <input type="radio" name="type" value="trending" onChange={handleChange} />
              Trending
            </label>
            <label className='flex items-center gap-2'>
              <input type="radio" name="type" value="highlight" onChange={handleChange} />
              Highlight
            </label>
          </div>
          
          <input 
            type="text" 
            name="team" 
            placeholder='Enter team name' 
            className='border border-gray-300 rounded-md p-2 text-gray-800' 
            onChange={handleChange} 
          />
          
          <input 
            type="file" 
            name="image" 
            className='border border-gray-300 rounded-md p-2 text-gray-800' 
            onChange={handleImageChange} 
          />
          
          <input 
            type="text" 
            name="price" 
            placeholder='Enter price' 
            className='border border-gray-300 rounded-md p-2 text-gray-800' 
            onChange={handleChange} 
          />

          <div className='flex flex-col gap-2'>
            <label htmlFor="branch" className='text-gray-600 text-sm'>SELECT BRANCH</label>
            <select 
              name="branch" 
              id="branch" 
              className='border border-gray-300 rounded-md p-2 text-gray-800'
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="kochi">KOCHI</option>
              <option value="ptm">PATHANAMTHITTA</option>
              <option value="alp">ALAPPUZHA</option>
              <option value="tvm">TRIVANDRUM</option>
            </select>
          </div>

          {show ? (
            <button type="submit" className='bg-black text-white p-2 rounded-md hover:bg-gray-800 transition duration-300'>
              SUBMIT
            </button>
          ) : (
            <Loader />
          )}
        </div>
      </form>
    </div>
  );
}

export default AddProductAdmin;
