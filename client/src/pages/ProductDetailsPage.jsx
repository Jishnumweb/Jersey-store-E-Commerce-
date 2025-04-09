import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReviewCard from '../components/ReviewCard'
import { toast } from 'sonner'
import { fetchDetails } from '../services/productApi'
import { addReview, getReviews } from '../services/reviewApi'
import { addToCart } from '../services/cartApi'

function ProductDetailsPage() {
    const [item, setItem] = useState({})
    const [reviewData, setreviewData] = useState([])
    const [values,setValues] = useState({
        rating:"",
        comment:""
    })

    const { id } = useParams()

    // details of one product
    useEffect(() => {
        fetchDetails(id).then((res) => {
            setItem(res.data)
        }).catch((error) => {
            console.log(error);
        })
    },[])

    // Reviews fetching
    useEffect(() => {
        getReviews(id).then((res) => {
            setreviewData(res.data.filteredReviews)
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    // add review datas
    const handleChange = (e)=>{
        setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    // add review Api
    const handleSubmit =async(e)=>{
        try {
            e.preventDefault()
            await addReview(id,values).then((res)=>{
                // console.log(res);
                toast.success(res.data.message)
            }).catch((error)=>{
                // console.log(error);
                toast.error(error.response.data)
            })
        } catch (error) {
            console.log(error);
        }
    }

    // add to cart Api
    const handleAddtocart = async (id) => {
        try {
            await addToCart(id).then((res) => {
                toast.success(res.data.message)
            }).catch((error) => {
                toast.error(error.response.data.error);
            })
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div className='container'>
            <div className='grid grid-cols-2 mt-[100px]'>
                <div className='flex flex-col justify-center items-center '>
                    <div>
                        <img src={item.image} alt="" className='h-[400px] object-contain bg-[#dcd7d7] p-4' />
                    </div>

                </div>
                <div className='flex flex-col'>
                    <h2 className='font-bold text-[25px] mb-0'>{item.title}</h2>
                    <h2 className='font-bold text-[18px] text-[#918989]'>{item.team}</h2>
                    <h2 className='font-bold text-[20px] mb-3'>KIT : {item.description}</h2>
                    <p>Premium Quality Football Jersey,Designed for Passion,Built for Performance Whether you're cheering from the stands or playing on the pitch,this high-quality football jersey keeps you cool,dry,and ready for action.Made from breathable,sweat-wicking fabric,it combines comfort and style with your favorite team's iconic colors and design</p>
                    <div>
                        <div>
                            <button className="border-white border p-2 bg-[#050505] text-white text-[12px] mb-2" onClick={() => handleAddtocart(item._id)}>ADD TO CART</button>
                        </div>
                    </div>
                    <h2 className='font-bold text-[19px]'>{item.price}/-</h2>
                </div>

            </div>

            {/* review submit section */}

            <div className='mt-4 '>
                <h4 className='text-center font-bold mb-3'>ADD REVIEWS</h4>
                <div className='flex justify-center items-center mb-3 gap-3'>
                    <div>
                    <label htmlFor="role">RATING</label>
                    <select name="rating" className='border border-black' onChange={handleChange}>
                        <option value="">/5</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    </div>
                    <textarea id="message" name="comment" style={{ height: "40px" }}className='bg-black text-white' cols="50" onChange={handleChange}></textarea>
                    <button className='bg-black text-white p-1 text-[12px]' onClick={handleSubmit}>SUBMIT</button>
                </div>

                {/* customer reviews */}
                <h4 className='text-center font-bold mb-3'>CUSTOMER REVIEWS</h4>
                <div className='grid lg:grid-cols-3 grid-cols-1 gap-2 mb-5'>
                    {
                        reviewData.map((products, index) => (
                            <div key={index}>
                                <ReviewCard item={products} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductDetailsPage
