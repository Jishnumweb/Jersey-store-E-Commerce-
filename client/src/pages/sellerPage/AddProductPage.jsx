import React, { useState } from 'react';
import { toast } from 'sonner';
import { createProduct } from '../../services/productApi';

function AddProductPage() {
  const [image, setImage] = useState(null);

  const [values, setValues] = useState({
    title: "",
    description: "",
    category: "",
    type: "",
    team: "",
    price: ""
  });

  // product data 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  // product image store
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // new variable for collectng all datas
  // create product Api
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("category", values.category);
    formData.append("type", values.type);
    formData.append("team", values.team);
    formData.append("price", values.price);
    formData.append("image", image); // the actual file
    try {
      await createProduct(formData).then((res) => {
        toast.success(res.data.message)
      }).catch((error) => {
        console.log(error);
        toast.error(error.response.data)
      })
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='mt-[100px] container'>
      <h2 className='text-center font-bold mb-6'>ADD NEW PRODUCT</h2>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-3 justify-center items-center'>
          <input type="text" name="title" placeholder='Enter title' className='bg-black w-[500px] p-2 text-white' onChange={handleChange} />
          <input type="text" name="description" placeholder='Enter description' className='bg-black w-[500px] p-2 text-white' onChange={handleChange} />
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
              trending
            </label>
            <label className='flex items-center gap-2'>
              <input type="radio" name="type" value="highlight" onChange={handleChange} />
              highlight
            </label>
          </div>
          <input type="text" name="team" placeholder='Enter team name' className='bg-black w-[500px] p-2 text-white' onChange={handleChange} />
          <input type="file" name="image" className='bg-black w-[500px] p-2 text-white' onChange={handleImageChange} />
          <input type="text" name="price" placeholder='Enter price' className='bg-black w-[500px] p-2 text-white' onChange={handleChange} />
          <button className='bg-black text-white w-[100px] p-2'>SUBMIT</button>
        </div>
      </form>
    </div>
  );
}

export default AddProductPage;
