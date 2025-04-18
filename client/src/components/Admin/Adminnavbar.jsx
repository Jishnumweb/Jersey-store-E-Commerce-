import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {  useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/Features/userSlice";
import { userLogout } from "../../services/userApi";

function Adminnavbar() {
    const [show, setShow] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userData = useSelector(state => state.user);

    // logout function
    const handleLogout = async ()=>{
        try {
            await userLogout().then((res)=>{
                console.log(res);
                localStorage.removeItem("token");
                dispatch(clearUser())
                navigate("/")
            }).catch((error)=>{
                console.log(error);
            })
        } catch (error) {
            console.log(error);            
        }
    }

    // responsive
    useEffect(() => {
        if (show) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [show]);

    return (
        <div className=" container text-[#ffffffe8] font-varela bg-white">

            {/* Large Screens */}

            <div className="container z-50 fixed top-0 w-full hidden sm:hidden lg:flex justify-between items-center gap-8   rounded-[15px] py-4 ">
                <div>
                    <h6 className="text-[#FF0000] font-bold cursor-pointer" onClick={()=>navigate("/")}>KICKWEAR</h6>
                </div>


                <div className="flex gap-3">
                    {
                        userData.value && Object.keys(userData.value).length > 0 ?
                            <div className="flex gap-3">
                                <div className="text-[#FF0000]">
                                    {userData.value.name}
                                </div>
                                <div>
                                <button className="bg-[#FF0000] font-medium rounded-[5px] py-[3px] px-1 text-[14px]" onClick={() => handleLogout()} >Logout</button>
                                </div>
                            </div>
                            :
                            <div className="flex gap-2">
                                <div>
                                    <button className="bg-[#FF0000] font-medium rounded-[5px] py-[3px] px-1  text-[14px]" onClick={() => navigate("/register")} >SIGN-UP</button>
                                </div>
                                <div>
                                    <button className="bg-[#FF0000] font-medium rounded-[5px] py-[3px] px-1 text-[14px]" onClick={() => navigate("/login")}>SIGN-IN</button>
                                </div>
                            </div>
                    }


                </div>
            </div>

            {/* Mobile Menu */}

            <div className="lg:hidden sm:block block">
                {show ? (
                    <div
                        className={` z-50 fixed top-0 left-0 h-screen w-full backdrop-blur-lg bg-black/80 text-white shadow-lg transition-transform duration-300 ease-in-out ${show ? "translate-x-0" : "-translate-x-full"
                            }`}
                    >
                        <div className="absolute right-4 top-4">
                            <button
                                className="text-3xl font-bold"
                                onClick={() => setShow(false)}
                            >
                                &times;
                            </button>
                        </div>

                        <ul className="flex flex-col items-center gap-2 mt-20 text-lg fs-[10px]">
                            <div>
                                <img src="images/signature.png" alt="" className="h-[30px] object-contain" />
                            </div>

                        </ul>
                    </div>
                ) : (
                    <div className="overflow-hidden mt-2 px-4 fixed z-50 top-0 left-3 right-3 flex items-center justify-between backdrop-blur border-b border-[#ffffff3c] rounded-[10px] py-2">
                        <div className="mt-3">
                            <h6 className="text-[#FF0000] font-bold">KICKWEAR</h6>
                        </div>

                        <div className="flex gap-2">

                            {
                        userData.value && Object.keys(userData.value).length > 0 ?
                            <div className="flex gap-3 mt-1">
                                <div className="text-[#FF0000]">
                                    {userData.value.name}
                                </div>
                                <div>
                                <button className="bg-[#FF0000] font-medium rounded-[1px] py-[3px] px-1 text-[10px]" onClick={() => handleLogout()} >Logout</button>
                                </div>
                            </div>
                            :
                            <div className="flex gap-2 mt-1">
                                <div>
                                    <button className="bg-[#FF0000] font-medium rounded-[1px] py-[3px] px-1  text-[10px]" onClick={() => navigate("/register")} >SIGN-UP</button>
                                </div>
                                <div>
                                    <button className="bg-[#FF0000] font-medium rounded-[1px] py-[3px] px-1 text-[10px]" onClick={() => navigate("/login")}>SIGN-IN</button>
                                </div>
                            </div>
                    }
                        </div>

                        <button className="text-2xl flex-shrink-0 text-black" onClick={() => setShow(true)}>
                            ☰
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Adminnavbar;
