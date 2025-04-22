import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { saveUser } from '../redux/Features/userSlice';
import { registerApi } from '../services/userApi';

function Registerpage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerApi(values).then((res) => {
                dispatch(saveUser(res.data.saved));
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("role",res.data.saved.role) 

                document.cookie = `token=${res.data.token}; path=/; max-age=86400`;

                if (res.data.saved.role === "admin") navigate("/admin");
                else if (res.data.saved.role === "seller") navigate("/seller");
                else navigate("/");

                toast.success(res.data.message);
            }).catch((error) => {
                console.log(error);
                toast.error(error.response.data.error);
            });
        } catch (error) {
            console.log(error);
            toast.error(error.response);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-md">
                <h2 className="text-2xl font-bold text-center text-red-600 mb-6">Create Account</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={values.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={values.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <button
                        type="submit"
                        className="w-full py-3 mt-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 font-semibold"
                    >
                        Register
                    </button>
                </form>

                <div className="flex justify-center gap-4 mt-6">
                    {/* Social icons - unchanged functionality */}
                    {["facebook", "instagram", "twitter", "github"].map((icon, idx) => (
                        <span key={idx} className="text-gray-500 hover:text-black cursor-pointer transition">
                            <i className={`fab fa-${icon} text-2xl`}></i>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Registerpage;
