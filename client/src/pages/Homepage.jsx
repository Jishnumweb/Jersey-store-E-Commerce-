import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../axios/axiosInstance'
import ProductCard from '../components/ProductCard'

function Homepage() {
    const navigate = useNavigate()
    const [items, setItems] = useState([])
    useEffect(() => {
        try {
            axiosInstance.get("/product/list-products").then((res) => {
                setItems(res.data)

            })

        } catch (error) {
            console.log(error);


        }
    })
    return (
        <div>
            {/* Hero section */}
            <div className="relative lg:h-screen h-[320px] lg:bg-cover bg-contain bg-center bg-no-repeat bg-[url('images/mnm.png')]">
                <div className='absolute flex flex-col lg:top-[450px] lg:left-[100px] text-white top-[170px] left-[30px] '>
                    <h3 className='lg:text-[50px] text-[15px] font-bold text-white lg:mb-1 mb-0'>GEAR UP LIKE A CHAMPION - </h3>
                    <h3 className='lg:text-[50px] text-[15px]  font-bold text-white mb-0'>PREMIUM JERSEYS AWAIT!</h3>
                    <p className='text-center font-bold lg:text-base text-[10px] lg:mb-2 mb-0'>Join the Team – Sign Up to Shop!</p>
                    <div className='flex justify-center'>
                        <button className="bg-[#FF0000] font-medium lg:rounded-[5px] lg:py-[7px] py-[4px] px-2 lg:text-[14px] text-[7px]" onClick={() => navigate("/register")} >SIGN-UP</button>
                    </div>
                </div>
            </div>

            {/* Category section */}

            <div className='lg:mt-[100px] mt-[0px] container'>
                <div className='grid lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-3'>
                    {/* mbappe section */}
                    <div className='bg-[#D9D9D9] flex rounded-[5px] gap-3'>
                        <div>
                            <img src="images/mbappe.png" alt="" className='lg:h-[300px] h-[170px] object-cover' />
                        </div>
                        <div className='flex flex-col justify-center item-center'>
                            <h2 className='font-bold lg:text-[23px] text-[14px]'>FOR COUNTRY, FOR GLORY!</h2>
                            <p className='mb-0 lg:text-base text-[10px]'>Home, Away & Third Kits Available</p>
                            <div>
                                <button className='bg-[#e25a5a7a] lg:text-[14px] text-[10px] text-[white] lg:p-2 p-1'>SHOP NOW</button>

                            </div>
                        </div>
                    </div>
                    {/* yamal section */}
                    <div className='bg-[#D9D9D9] flex rounded-[5px] gap-3'>
                        <div>
                            <img src="images/yamal.png" alt="" className='lg:h-[300px] h-[170px] object-cover' />
                        </div>
                        <div className='flex flex-col justify-center item-center'>
                            <h2 className='font-bold lg:text-[23px] text-[14px]'>CLUB PRIDE, WEAR IT LOUD!</h2>
                            <p className='mb-0 lg:text-base text-[10px]'>Home, Away & Third Kits Available</p>
                            <div>
                                <button className='bg-[#e25a5a7a] lg:text-[14px] text-[10px] text-[white] lg:p-2 p-1'>SHOP NOW</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trending collection section */}

            <div className='lg:mt-[100px] mt-[0px] container'>
                <div className='mb-3'>
                    <h3 className='text-center font-bold'>- WEAR YOUR PASSION – EXPLORE OUR TRENDING COLLECTION! -</h3>
                </div>
                <div>

                    <div className='grid lg:grid-cols-4 grid-cols-2 gap-3'>
                        {
                            items.map((item, index) => (
                                <div key={index}>
                                    <ProductCard item={item} />
                                </div>
                            ))
                        }


                    </div>


                </div>

            </div>

        </div>
    )
}

export default Homepage
