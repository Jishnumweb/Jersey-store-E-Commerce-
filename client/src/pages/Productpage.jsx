import { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard"
import { getProducts } from "../services/productApi"

function Productpage() {
  const [item, setItem] = useState([])
  const [filteritems, setFilteritems] = useState([])
  const [category, setCategory] = useState("all")
  const [value, setValue] = useState("")

  // fetch all products
  useEffect(() => {
    getProducts().then((res) => {
      console.log(res)
      setItem(res.data)
      setFilteritems(res.data)
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  // filter option based on club/nation/all
  const handleFilter = (product) => {
    setCategory(product)
    if (product === "all") {
      setFilteritems(item)
    } else {
      const filtered = item.filter((items) => items.category === product)
      setFilteritems(filtered)
    }
  }

  // data collection from search field
  const handleChange = (e) => {
    setValue(e.target.value)
  }

  // filter products from search 
  const handleSubmit = () => {
    const filterInput = item.filter((products) =>
      products.team.toLowerCase().includes(value.toLowerCase()) ||
      products.title.toLowerCase().includes(value.toLowerCase())
    )
    setFilteritems(filterInput)
  }

  return (
    <div className="container mt-[100px] mb-[100px]">
      {/* Filter and search */}
      <div className="flex lg:flex-row flex-col justify-start items-center gap-3 mb-4">
        <div className="flex gap-1">
          <input
            type="text"
            onChange={handleChange}
            placeholder='player/club'
            className='bg-[white] border border-black placeholder:text-[black] lg:p-1 px-2 py-1 rounded-[3px]'
          />
          <button onClick={handleSubmit} className="bg-black text-white text-[10px] px-3">Search</button>
        </div>
        <div className="flex gap-2">
          <button
            className="border border-black text-[black] p-1 lg:px-2 px-1 rounded-[3px] lg:text-base text-[10px]"
            onClick={() => handleFilter("all")}
          >
            All
          </button>
          <button
            className="border border-black text-[black] p-1 lg:px-2 px-1 rounded-[3px] lg:text-base text-[10px]"
            onClick={() => handleFilter("club")}
          >
            Club
          </button>
          <button
            className="border border-black text-[black] p-1 lg:px-2 px-1 rounded-[3px] lg:text-base text-[10px]"
            onClick={() => handleFilter("nation")}
          >
            Nation
          </button>
        </div>
      </div>

      {/* product listing */}
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-3">
        {
          filteritems.length ? filteritems.map((items, index) => (
            <div key={index}>
              <ProductCard item={items} />
            </div>
          )) : (
            <div className="col-span-full text-center text-gray-500 font-semibold mt-10">
              No matching products found.
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Productpage
