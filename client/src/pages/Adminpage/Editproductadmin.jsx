import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { fetchDetails, updateProduct } from '../../services/productApi'

function Editproductadmin() {
  const [item, setItem] = useState({})
  const [image, setImage] = useState(null);
  const [values, setValues] = useState({
    title: "",
    description: "",
    category: "",
    type: "",
    team: "",
    price: ""
  });
  const { id } = useParams()
  const navigate = useNavigate()

  // fetch one products
  useEffect(() => {
    fetchDetails(id).then((res) => {
      setItem(res.data)
    }).catch((error) => {
      console.log(error);
    })
  }, [])

  // datas
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  // image data
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // update product api
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
      await updateProduct(formData, id).then((res) => {
        toast.success(res.data.message)
        navigate("/admin/view-all-products")
      }).catch((error) => {
        toast.error(error.data.response)
      })
    } catch (error) {
      console.error(error);
    }
  };

  return (

    <div className='mt-[100px] container'>
      <h2 className='mb-5  text-center'>EDIT PRODUCT</h2>

      <div className='grid grid-cols-4 justify-center item-center bg-[#c8c8c8] p-2 mb-2'>
        <img src={item.image} alt="" className='h-[100px] object-contain' />
        <p className='font-bold'>{item.title}</p>
        <p className='font-bold'>{item.price}</p>
        <p className='font-bold'>{item.description}</p>

      </div>
      <div className='text-center'>
        <h2 className='font-bold text-[19px]'>UPDATE PRODUCT</h2>
      </div>

      <div className='mb-5'>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-3 justify-center items-center'>
            <input type="text" name="title" placeholder='Enter title' className='bg-black w-[500px] p-2' onChange={handleChange} />
            <input type="text" name="description" placeholder='Enter description' className='bg-black w-[500px] p-2' onChange={handleChange} />

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

            <input type="text" name="team" placeholder='Enter team name' className='bg-black w-[500px] p-2' onChange={handleChange} />
            <input type="file" name="image" className='bg-black w-[500px] p-2 text-white' onChange={handleImageChange} />
            <input type="text" name="price" placeholder='Enter price' className='bg-black w-[500px] p-2' onChange={handleChange} />

            <button className='bg-black text-white w-[100px] p-2'>SUBMIT</button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default Editproductadmin
