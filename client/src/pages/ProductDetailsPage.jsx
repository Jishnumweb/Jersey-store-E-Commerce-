import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReviewCard from '../components/ReviewCard'
import { toast } from 'sonner'
import { fetchDetails } from '../services/productApi'
import { addReview, getReviews } from '../services/reviewApi'
import { addToCart } from '../services/cartApi'

function ProductDetailsPage() {
    const [item, setItem] = useState({})
    const [reviewData, setReviewData] = useState([])
    const [values, setValues] = useState({ rating: "", comment: "" })

    const { id } = useParams()

    // Fetch product details
    useEffect(() => {
        fetchDetails(id)
            .then((res) => setItem(res.data))
            .catch((error) => console.log(error))
    }, [id])

    // Fetch product reviews
    useEffect(() => {
        getReviews(id)
            .then((res) => setReviewData(res.data.filteredReviews))
            .catch((error) => console.log(error))
    }, [id])

    const handleChange = (e) => {
        setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await addReview(id, values)
                .then((res) => {
                    toast.success(res.data.message)
                    setValues({ rating: "", comment: "" }) // reset form
                })
                .catch((error) => toast.error(error.response?.data || "Failed to submit review"))
        } catch (error) {
            console.log(error)
        }
    }

    const handleAddToCart = async (productId) => {
        try {
            await addToCart(productId)
                .then((res) => toast.success(res.data.message))
                .catch((error) => toast.error(error.response?.data?.error || "Failed to add to cart"))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='container mt-[100px] px-4 md:px-10 mb-10'>
            {/* Product Info */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mb-12'>
                <div className='flex justify-center items-center'>
                    <img
                        src={item.image}
                        alt={item.title}
                        className='h-[400px] w-full max-w-[400px] object-contain bg-gray-200 p-4 rounded-lg shadow-sm'
                    />
                </div>
                <div className='flex flex-col gap-4'>
                    <h2 className='text-2xl font-bold text-gray-800'>{item.title}</h2>
                    <h3 className='text-lg font-semibold text-gray-500'>{item.team}</h3>
                    <p className='text-md font-medium'>KIT: {item.description}</p>
                    <p className='text-gray-700 text-sm leading-relaxed'>
                        Premium Quality Football Jersey designed for passion, built for performance.
                        Whether you're cheering from the stands or playing on the pitch, this high-quality
                        jersey keeps you cool and ready. Made from breathable, sweat-wicking fabric with
                        iconic team design.
                    </p>
                    <div className='flex justify-between items-center mt-4'>
                        <h2 className='text-xl font-bold text-green-600'>{item.price}/-</h2>
                        <button
                            onClick={() => handleAddToCart(item._id)}
                            className='bg-black text-white px-4 py-2 text-sm font-semibold rounded-md hover:bg-gray-800 transition'
                        >
                            ADD TO CART
                        </button>
                    </div>
                </div>
            </div>

            {/* Add Review */}
            <div className='border-t pt-6'>
                <h3 className='text-center text-xl font-semibold mb-4'>Add Your Review</h3>
                <form onSubmit={handleSubmit} className='flex flex-col md:flex-row gap-4 justify-center items-center mb-8'>
                    <div>
                        <label htmlFor="rating" className='block text-sm font-medium'>Rating</label>
                        <select
                            name="rating"
                            id="rating"
                            className='border px-3 py-1 rounded-md text-sm w-[100px]'
                            onChange={handleChange}
                            value={values.rating}
                        >
                            <option value="">--</option>
                            <option value="1">1 ⭐</option>
                            <option value="2">2 ⭐⭐</option>
                            <option value="3">3 ⭐⭐⭐</option>
                            <option value="4">4 ⭐⭐⭐⭐</option>
                            <option value="5">5 ⭐⭐⭐⭐⭐</option>
                        </select>
                    </div>
                    <textarea
                        name="comment"
                        placeholder="Write your review..."
                        className='border px-3 py-2 rounded-md text-sm w-full md:w-[400px] h-[50px]'
                        onChange={handleChange}
                        value={values.comment}
                        required
                    />
                    <button
                        type="submit"
                        className='bg-black text-white px-4 py-2 text-sm rounded-md hover:bg-gray-800 transition'
                    >
                        Submit
                    </button>
                </form>

                {/* Reviews */}
                <h3 className='text-center text-xl font-semibold mb-4'>Customer Reviews</h3>
                {reviewData.length > 0 ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {reviewData.map((review, index) => (
                            <ReviewCard key={index} item={review} />
                        ))}
                    </div>
                ) : (
                    <p className='text-center text-gray-500'>No reviews yet.</p>
                )}
            </div>
        </div>
    )
}

export default ProductDetailsPage
