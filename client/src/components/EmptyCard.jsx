import React from 'react';
import { useNavigate } from 'react-router-dom';

function EmptyCard() {
    const navigate = useNavigate();

    return (
        <div className="flex justify-center items-center h-[100%] ">
            <div className="bg-white rounded-lg shadow-xl p-8 text-center max-w-md w-full">
                <h4 className="text-3xl font-semibold text-gray-800 mb-6">Your Cart is Empty!</h4>
                <p className="text-lg text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
                <button
                    onClick={() => navigate('/shop')}
                    className="bg-black text-white px-6 py-3 text-sm font-medium rounded-lg hover:bg-[#FF0000] transition duration-300 ease-in-out"
                >
                    Shop Now
                </button>
            </div>
        </div>
    );
}

export default EmptyCard;
