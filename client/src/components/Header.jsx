import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
    const [show, setShow] = useState(false);

    const navLinks = [{ label: "HOME", link: "/" }, { label: "SHOP", link: "/shop" }, { label: "CLUB", link: "#projects" }, { label: "NATIONS", link: "#testimonials" }, { label: "CONTACT", link: "#contact" }]

    const navigate = useNavigate()
    // Prevent background scrolling when menu is open

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
                    <h6 className="text-[#FF0000] font-bold">KICKWEAR</h6>
                </div>
                <div>
                    <ul className="flex gap-5 mb-0">
                        {
                            navLinks.map((nav, index) => (
                                <div key={index}>
                                    <li className=" font-semibold mt-2 text-red-600 relative text-[13px] transition-all duration-300 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#95BD2F] after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"><a href={nav.link} className="no-underline text-[#FF0000]" onClick={() => navigate(nav.link)}>{nav.label}</a></li>

                                </div>
                            ))
                        }
                    </ul>
                </div>
                <div className="flex gap-2">
                    <button className="bg-[#FF0000] font-medium rounded-[5px] py-[3px] px-1 text-[14px]" onClick={() => navigate("/register")} >SIGN-UP</button>
                    <button className="bg-[#FF0000] font-medium rounded-[5px] py-[3px] px-1 text-[14px]" onClick={() => navigate("/login")}>SIGN-IN</button>
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
                            {
                                navLinks.map((nav, index) => (
                                    <div key={index}>
                                        <li className="text-[13px] "><a href={nav.link} className="no-underline text-[#ffffff8f]">{nav.label}</a></li>

                                    </div>
                                ))
                            }
                        </ul>
                    </div>
                ) : (
                    <div className="overflow-hidden mt-2 px-4 fixed z-50 top-0 left-3 right-3 flex items-center justify-between backdrop-blur border-b border-[#ffffff3c] rounded-[10px] py-2">
                        <div className="mt-3">
                            <h6 className="text-[#FF0000] font-bold">KICKWEAR</h6>
                        </div>

                        <div className="flex gap-2">
                            <button className="bg-[#FF0000] font-medium lg:rounded-[5px] lg:py-[3px] py-[4px] rounded-[3px] lg:mt-0 mt-2 px-1 lg:text-[14px] text-[10px]" onClick={() => navigate("/register")} >SIGN-UP</button>
                            <button className="bg-[#FF0000] font-medium lg:rounded-[5px] lg:py-[3px] py-[4px] rounded-[3px] lg:mt-0 mt-2 px-1 lg:text-[14px] text-[10px]" onClick={() => navigate("/login")}>SIGN-IN</button>
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

export default Header;
