import React from 'react';
import { useNavigate } from 'react-router-dom';

function Admindashboard() {
  const navigate = useNavigate();

  return (
    <div className="lg:mt-[100px] container px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">WELCOME BACK!</h2>
        <h2 className="text-lg text-gray-600">ADMIN DASHBOARD</h2>
      </div>

      {/* Admin Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 justify-center items-center mt-12">
        <div className="flex justify-center">
          <button
            className="w-full md:w-[400px] py-3 px-6 text-white bg-[#FF6347] rounded-lg shadow-md transition-all duration-300 hover:bg-[#FF4500] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FF6347] focus:ring-opacity-50"
            onClick={() => navigate("add-product")}
          >
            ADD PRODUCT
          </button>
        </div>

        <div className="flex justify-center">
          <button
            className="w-full md:w-[400px] py-3 px-6 text-white bg-[#FF6347] rounded-lg shadow-md transition-all duration-300 hover:bg-[#FF4500] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FF6347] focus:ring-opacity-50"
            onClick={() => navigate("view-all-products")}
          >
            VIEW ALL PRODUCTS
          </button>
        </div>

        <div className="flex justify-center">
          <button
            className="w-full md:w-[400px] py-3 px-6 text-white bg-[#FF6347] rounded-lg shadow-md transition-all duration-300 hover:bg-[#FF4500] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FF6347] focus:ring-opacity-50"
            onClick={() => navigate("view-all-users")}
          >
            VIEW ALL USERS
          </button>
        </div>

        <div className="flex justify-center">
          <button
            className="w-full md:w-[400px] py-3 px-6 text-white bg-[#FF6347] rounded-lg shadow-md transition-all duration-300 hover:bg-[#FF4500] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FF6347] focus:ring-opacity-50"
            onClick={() => navigate("view-all-sellers")}
          >
            VIEW ALL SELLERS
          </button>
        </div>

        <div className="flex justify-center">
          <button
            className="w-full md:w-[400px] py-3 px-6 text-white bg-[#FF6347] rounded-lg shadow-md transition-all duration-300 hover:bg-[#FF4500] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FF6347] focus:ring-opacity-50"
            onClick={() => navigate("all-orders")}
          >
            VIEW ALL ORDERS
          </button>
        </div>
      </div>
    </div>
  );
}

export default Admindashboard;
