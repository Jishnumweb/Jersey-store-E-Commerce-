import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loginpage from './Loginpage'

function Homepage() {
    const navigate = useNavigate()
    const user = useSelector(state => state.user)

    // Guard against undefined user value
    const userRole = user?.value?.role

    const handleNavigate = () => {
        if (!userRole) {
            navigate("/login", { data: "nation" })
        } else {
            navigate("/shop")
        }
    }

    const token = localStorage.getItem("token")

    // Role-based dashboard rendering
    const renderRoleDashboard = () => {
        switch (userRole) {
            case 'admin':
                return (
                    <div className="h-screen flex justify-center flex-col items-center">
                        <p>WELCOME ADMIN</p>
                        <button className="bg-black text-white p-2" onClick={() => navigate("/admin")}>Go to admin dashboard</button>
                    </div>
                )
            case 'seller':
                return (
                    <div className="h-screen flex justify-center flex-col items-center">
                        <p>WELCOME SELLER</p>
                        <button className="bg-black text-white p-2" onClick={() => navigate("/seller")}>Go to seller dashboard</button>
                    </div>
                )
            default:
                return (
                    <div>
                        <div className="homepage-walpapper relative lg:h-screen h-[320px] lg:bg-cover bg-contain bg-center bg-no-repeat ">
                            <div className='absolute flex flex-col lg:top-[450px] lg:left-[100px] text-white top-[170px] left-[30px]'>
                                <h3 className='lg:text-[50px] text-[15px] font-bold text-white lg:mb-1 mb-0'>GEAR UP LIKE A CHAMPION - </h3>
                                <h3 className='lg:text-[50px] text-[15px] font-bold text-white mb-0'>PREMIUM JERSEYS AWAIT!</h3>
                                <p className='text-center font-bold lg:text-base text-[10px] lg:mb-2 mb-0'>Join the Team – Sign Up to Shop!</p>
                                <div className='flex justify-center'>
                                    <button className="bg-[#FF0000] font-medium lg:rounded-[5px] lg:py-[7px] py-[4px] px-2 lg:text-[14px] text-[7px]" onClick={() => navigate("/register")}>SIGN-UP</button>
                                </div>
                            </div>
                        </div>

                        <div className='lg:mt-[100px] mt-[0px] container mb-4'>
                            <div className='grid lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-3'>
                                {['mbappe', 'yamal'].map((image, index) => (
                                    <div className='bg-[#D9D9D9] flex rounded-[5px] gap-3' key={index}>
                                        <div>
                                            <img src={`images/${image}.png`} alt={image} className='lg:h-[300px] h-[170px] object-cover' />
                                        </div>
                                        <div className='flex flex-col justify-center item-center'>
                                            <h2 className='font-bold lg:text-[23px] text-[14px]'>FOR COUNTRY, FOR GLORY!</h2>
                                            <p className='mb-0 lg:text-base text-[10px]'>Home, Away & Third Kits Available</p>
                                            <div>
                                                <button className='bg-[#e25a5a7a] lg:text-[14px] text-[10px] text-[white] lg:p-2 p-1' onClick={handleNavigate}>SHOP NOW</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )
        }
    }

    return (
        <div>
            {userRole === "user" && renderRoleDashboard()}
            {userRole === "admin" && renderRoleDashboard()}
            {userRole === "seller" && renderRoleDashboard()}

            {token ? (
                <div>
                    <p>Token Present</p>
                </div>
            ) : (
                <Loginpage />
            )}
        </div>
    )
}

export default Homepage
