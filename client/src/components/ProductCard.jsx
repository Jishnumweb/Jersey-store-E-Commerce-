import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { addToCart, getCarts, removeFromCart } from "../services/cartApi";

function ProductCard({ item }) {
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();

  // Check if the item is already in cart
  useEffect(() => {
    getCarts()
      .then((res) => {
        const cartItems = res.data.products;
        const isInCart = cartItems.some((pro) => pro.productId._id === item._id);
        setCheck(isInCart);
      })
      .catch((error) => {
        console.error("Error checking cart:", error);
        toast.error("Error checking cart");
      });
  }, [item._id]);

  // Add to Cart
  const handleSubmit = (id) => {
    addToCart(id)
      .then((res) => {
        toast.success(res.data.message);
        setCheck(true);
      })
      .catch((error) => {
        toast.error(error.response?.data?.error || "Error adding to cart");
      });
  };

  // Remove from Cart
  const handleRemove = (id) => {
    removeFromCart(id)
      .then((res) => {
        toast.success(res.data.message);
        setCheck(false);
      })
      .catch((error) => {
        toast.error(error.response?.data?.error || "Error removing from cart");
      });
  };

  return (
    <div className="mb-4">
      <div className="bg-[#eceaea] flex flex-col">
        <img
          src={item.image}
          alt="product"
          className="lg:h-[300px] h-[250px] object-contain"
        />
      </div>

      <div className="flex flex-col justify-start mt-2">
        <div>
          <h5 className="lg:text-base text-[13px] font-semibold">{item.title}</h5>
          <p className="lg:text-sm text-[12px] text-gray-700">{item.description}</p>
        </div>
        <h6 className="lg:text-base text-[13px] font-medium mt-1">{item.price}/-</h6>

        <div className="flex justify-between items-center mt-2">
          {check ? (
            <button
              onClick={() => handleRemove(item._id)}
              className="border border-white p-1 bg-[#c01f1f] text-white text-[12px] hover:bg-[#a61b1b] transition"
            >
              REMOVE CART
            </button>
          ) : (
            <button
              onClick={() => handleSubmit(item._id)}
              className="border border-white p-1 bg-black text-white text-[12px] hover:bg-gray-800 transition"
            >
              ADD TO CART
            </button>
          )}

          <button
            onClick={() => navigate(`/view-product/${item._id}`)}
            className="bg-green-700 hover:bg-green-600 text-white p-2 text-[10px] transition"
          >
            VIEW PRODUCT
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
