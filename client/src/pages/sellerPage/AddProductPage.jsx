import React, { useState } from 'react';
import { toast } from 'sonner';
import { createProduct } from '../../services/productApi';
import Loader from '../../components/Loader';

function AddProductPage() {
  const [image, setImage] = useState(null);
  const [show, setShow] = useState(true);

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
      setShow(false)
      await createProduct(formData).then((res) => {
        toast.success(res.data.message)
        setShow(true)
      }).catch((error) => {
        console.log(error);
        setShow(true)
        toast.error(error.response.data.error)
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
          <input type="text" name="title" placeholder='Enter title' className='border border-black placeholder:text-[13px] w-[500px] p-2 text-white' onChange={handleChange} />
          <input type="text" name="description" placeholder='Enter description' className='border border-black placeholder:text-[13px] w-[500px] p-2 text-white' onChange={handleChange} />
          <div className="flex gap-4">
            <label className='flex items-center gap-2 '>
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
          <input type="text" name="team" placeholder='Enter team name' className='border border-black placeholder:text-[13px] w-[500px] p-2 text-white' onChange={handleChange} />
          <input type="file" name="image" className='border border-black placeholder:text-[13px] w-[500px] p-2 text-black' onChange={handleImageChange} />
          <input type="text" name="price" placeholder='Enter price' className='border border-black placeholder:text-[13px] w-[500px] p-2 text-white' onChange={handleChange} />

          {
            show ?           <div>
            <button className='bg-black text-white w-[100px] p-2'>SUBMIT</button>
          </div> : <div><Loader/></div>
          }
        </div>
      </form>
    </div>
  );
}

export default AddProductPage;
