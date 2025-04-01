import React from 'react'

function ProductCard({item}) {
  return (
    <div>
        <div className='bg-[#D9D9D9] flex flex-col'>
            <div>
                <img src={item.image} alt="product" className='h-[350px] object-contain'/>
            </div>
        </div>
        <div className='flex flex-col justify-start'>
            <h5>{item.title}</h5>
            <h6>{item.price}/-</h6>
        </div>
    </div>
  )
}

export default ProductCard
