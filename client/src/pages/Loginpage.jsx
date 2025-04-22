import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { saveUser } from '../redux/Features/userSlice'
import { loginUser } from '../services/userApi'
import { toast } from 'sonner'

function Loginpage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [values, setValues] = useState({
        email: "",
        password: ""
    })

    //  collecting data
    const handleChange = (e) => {
        setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    // login Api
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await loginUser(values,{withCredentials : true}).then((res) => {
                dispatch(saveUser(res.data.userExist))  
                localStorage.setItem("token",res.data.token) 
                localStorage.setItem("role",res.data.userExist.role) 
                document.cookie = `token=${res.data.token}; path=/; max-age=86400`; 

                // navigation role base
                if (res.data.userExist.role === "admin") navigate("/admin");
                else if (res.data.userExist.role === "seller") navigate("/seller");
                else navigate("/"); 
                toast.success(res.data.message)           
            }).catch((error) => {
                console.log(error);
                toast.error(error.response.data)
            })
        } catch (error) {
            console.log(error);
            alert("Something went wrong")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-center text-red-600 mb-6">Login to Your Account</h2>
      
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition duration-300"
              >
                Login
              </button>
            </form>
      
            <div className="mt-6">
              <p className="text-center text-gray-500 mb-4">Or sign in with</p>
              <div className="flex justify-center space-x-4">
                {/* Social Media Icons */}
                {['facebook', 'instagram', 'twitter', 'github'].map((platform, index) => (
                  <button key={index} className="text-gray-500 hover:text-red-600 transition">
                    <i className={`fab fa-${platform} text-2xl`}></i>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
      
}

export default Loginpage
