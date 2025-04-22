import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { addToCart, getCarts, removeFromCart } from "../services/cartApi";

function ProductCard({ item }) {
  const [check, setCheck] = useState(false); // 
  const navigate = useNavigate()


  // fetch all products from cart
  useEffect(() => {
    getCarts().then((res) => {
      const cartItems = res.data.products;
      const isInCart = cartItems.some((pro) => pro.productId._id === item._id);
      setCheck(isInCart);
    }).catch((error) => console.error("Error checking cart:", error));
  }, [item._id]);

  //  Add to Cart function
  const handleSubmit = (id) => {
    addToCart(id).then((res) => {
      toast.success(res.data.message);
      setCheck(true); // 
    })
      .catch((error) => {
        toast.error(error.response?.data?.error || "Error adding to cart");
      });
  };

  //  Remove from Cart function
  const handleRemove = (id) => {
    removeFromCart(id).then((res) => {
      toast.success(res.data.message);
      setCheck(false);
    })
      .catch((error) => {
        toast.error(error.response?.data || "Error removing from cart");
      });
  };

  return (
    <div className="mb-4">
      <div className="bg-[#eceaea] flex flex-col">
        <div>
          <img src={item.image} alt="product" className="lg:h-[350px] h-[250px] object-contain" />
        </div>
      </div>
      <div className="flex flex-col justify-start">
        <div className="flex flex-col">
          <h5 className="lg:text-base text-[13px] mb-0">{item.title}</h5>
          <h5 className="lg:text-base text-[13px] mb-0">{item.description}</h5>
        </div>
        <h6 className="lg:text-base text-[13px]">{item.price}/-</h6>
        <div className="flex justify-between">
          {check ? (
            <button
              className="border-white border p-1 bg-[#c01f1f] text-white text-[12px]"
              onClick={() => handleRemove(item._id)}
            >
              REMOVE CART
            </button>
          ) : (
            <button
              className="border-white border p-1 bg-black text-white text-[12px]"
              onClick={() => handleSubmit(item._id, item)}
            >
              ADD TO CART
            </button>
          )}
          <div>
            <button className="bg-green-700 text-[white] p-2 text-[10px]" onClick={() => navigate(`/view-product/${item._id}`)}>VIEW PRODUCT</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
