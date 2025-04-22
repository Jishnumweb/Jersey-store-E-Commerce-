import { useEffect, useState } from "react";
import { getProducts } from "../services/productApi";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

function Productpage() {
  const [item, setItem] = useState([]);
  const [filteritems, setFilteritems] = useState([]);
  const [category, setCategory] = useState("all");
  const [value, setValue] = useState("");
  const [load,setLoad] = useState(false)

  // Fetch all products
  useEffect(() => {
    getProducts().then((res) => {
      console.log(res);
      setItem(res.data);
      setLoad(true)
      setFilteritems(res.data);
    }).catch((error) => {
      console.log(error);
      setLoad(true)
    });
  }, []);

  // Filter products based on category
  const handleFilter = (product) => {
    setCategory(product);
    if (product === "all") {
      setFilteritems(item);
    } else {
      const filtered = item.filter((items) => items.category === product);
      setFilteritems(filtered);
    }
  };

  // Handle search input
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  // Filter products from search
  const handleSubmit = () => {
    const filterInput = item.filter((products) =>
      products.team.toLowerCase().includes(value.toLowerCase()) ||
      products.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteritems(filterInput);
  };

  return (
    <div className="container mt-[100px] mb-[100px] px-4">
      {/* Filter and Search Section */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            onChange={handleChange}
            placeholder="Search by player/club"
            className="bg-white border border-gray-300 text-black placeholder:text-gray-500 rounded-lg p-2 w-64 focus:outline-none focus:ring-2 focus:ring-[#FF0000] transition-all"
          />
          <button 
            onClick={handleSubmit} 
            className="bg-gradient-to-r from-[#FF6347] to-[#FF4500] text-white px-6 py-2 rounded-xl font-semibold text-sm shadow-lg transform transition-all hover:scale-105 hover:from-[#FF4500] hover:to-[#FF6347] focus:ring-4 focus:ring-[#FF6347] focus:ring-opacity-50"
          >
            Search
          </button>
        </div>
        <div className="flex gap-3">
          <button
            className={`border border-gray-300 text-black px-6 py-2 rounded-full text-sm transition-all duration-300 transform hover:bg-[#FF6347] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#FF6347] focus:ring-opacity-50 ${category === "all" ? "bg-[#FF6347] text-white" : ""}`}
            onClick={() => handleFilter("all")}
          >
            All
          </button>
          <button
            className={`border border-gray-300 text-black px-6 py-2 rounded-full text-sm transition-all duration-300 transform hover:bg-[#FF6347] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#FF6347] focus:ring-opacity-50 ${category === "club" ? "bg-[#FF6347] text-white" : ""}`}
            onClick={() => handleFilter("club")}
          >
            Club
          </button>
          <button
            className={`border border-gray-300 text-black px-6 py-2 rounded-full text-sm transition-all duration-300 transform hover:bg-[#FF6347] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#FF6347] focus:ring-opacity-50 ${category === "nation" ? "bg-[#FF6347] text-white" : ""}`}
            onClick={() => handleFilter("nation")}
          >
            Nation
          </button>
        </div>
      </div>

      {/* Product Listing */}
      <div>
        {
          load ?       <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">
          {filteritems.length ? filteritems.map((items, index) => (
            <div key={index} className="transition-transform transform hover:scale-105">
              <ProductCard item={items} />
            </div>
          )) : (
            <div className="col-span-full text-center text-gray-500 font-semibold mt-10">
              No matching products found.
            </div>
          )}
        </div> : <Loader/>
        }
      </div>

    </div>
  );
}

export default Productpage;
