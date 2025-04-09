import React, { useState } from 'react';
import { toast } from 'sonner';
import { MdDeleteOutline } from "react-icons/md";
import { removeFromCart, updateQuantity } from '../services/cartApi'; // 👈 Use distinct name

function CartCard({ item, onRemove, onTotal }) {
    const [value, setValue] = useState(item.quantity);

    // remove from cart Api
    const handleRemove = (id) => {
        try {
            removeFromCart(id).then((res) => {
                onRemove(id, res.data.cart.totalPrice);
                toast.success(res.data.message);
            }).catch((error) => {
                console.log(error);
                toast.error("Failed to remove item");
            });
        } catch (error) {
            console.log(error);
        }
    };

    // quantity Api
    const handleQuantityUpdate = async (newQuantity, id) => {
        if (newQuantity < 1) return;
        try {
            setValue(newQuantity);
            await updateQuantity(id, newQuantity).then((res) => {
                onTotal(res.data.cart.totalPrice);
            }).catch((error) => {
                console.log(error);
                toast.error("Quantity update failed");
            });
        } catch (error) {
            console.log(error);
            toast.error("Failed to update quantity");
        }
    };

    return (
        <div>
            <div className='grid grid-cols-5 gap-2 border border-black p-3 justify-center items-center mb-2'>
                <div>
                    <img src={item.productId.image} alt="" className='h-[100px] object-contain' />
                </div>
                <div>
                    <p>{item.productId.title}</p>
                </div>
                <div className='flex gap-2 items-center text-center'>
                    <button onClick={() => handleQuantityUpdate(value - 1, item.productId._id)}>-</button>
                    <p className='bg-black px-2 text-white'>{value}</p>
                    <button onClick={() => handleQuantityUpdate(value + 1, item.productId._id)}>+</button>
                </div>
                <div>
                    <button className='text-[#ff1f1f] text-[25px] p-2' onClick={() => handleRemove(item.productId._id)}><MdDeleteOutline /></button>
                </div>
                <div>
                    <p>{item.price}</p>
                </div>
            </div>
        </div>
    );
}

export default CartCard;
