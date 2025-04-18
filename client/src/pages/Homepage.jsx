import { useNavigate } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useSelector } from 'react-redux'
import Loginpage from './Loginpage'

function Homepage() {
    const navigate = useNavigate()
    const user = useSelector(state => state.user)

    // navigation based role
    const handleNavigate = () => {
        if (!user.value?.role) {
            navigate("/login", { data: "nation" });
        } else {
            navigate("/shop");
        }
    }
    // get token
    const token = localStorage.getItem("token")


    return (
        <div>
            {
                user.value.role==="user" && 
                <div>
                <div className="relative lg:h-screen h-[320px] lg:bg-cover bg-contain bg-center bg-no-repeat bg-[url('images/mnm.png')]">
                    <div className='absolute flex flex-col lg:top-[450px] lg:left-[100px] text-white top-[170px] left-[30px] '>
                        <h3 className='lg:text-[50px] text-[15px] font-bold text-white lg:mb-1 mb-0'>GEAR UP LIKE A CHAMPION - </h3>
                        <h3 className='lg:text-[50px] text-[15px]  font-bold text-white mb-0'>PREMIUM JERSEYS AWAIT!</h3>
                        <p className='text-center font-bold lg:text-base text-[10px] lg:mb-2 mb-0'>Join the Team – Sign Up to Shop!</p>
                        <div className='flex justify-center'>
                            <button className="bg-[#FF0000] font-medium lg:rounded-[5px] lg:py-[7px] py-[4px] px-2 lg:text-[14px] text-[7px]" onClick={() => navigate("/register")} >SIGN-UP</button>
                        </div>
                    </div>
                </div>


                <div className='lg:mt-[100px] mt-[0px] container mb-4'>
                    <div className='grid lg:grid-cols-2 grid-cols-1 lg:gap-5 gap-3'>

                        <div className='bg-[#D9D9D9] flex rounded-[5px] gap-3'>
                            <div>
                                <img src="/images/mbappe.png" alt="" className='lg:h-[300px] h-[170px] object-cover' />
                            </div>
                            <div className='flex flex-col justify-center item-center'>
                                <h2 className='font-bold lg:text-[23px] text-[14px]'>FOR COUNTRY, FOR GLORY!</h2>
                                <p className='mb-0 lg:text-base text-[10px]'>Home, Away & Third Kits Available</p>
                                <div>
                                    <button className='bg-[#e25a5a7a] lg:text-[14px] text-[10px] text-[white] lg:p-2 p-1' onClick={handleNavigate}>SHOP NOW</button>

                                </div>
                            </div>
                        </div>

                        <div className='bg-[#D9D9D9] flex rounded-[5px] gap-3'>
                            <div>
                                <img src="images/yamal.png" alt="" className='lg:h-[300px] h-[170px] object-cover' />
                            </div>
                            <div className='flex flex-col justify-center item-center'>
                                <h2 className='font-bold lg:text-[23px] text-[14px]'>CLUB PRIDE, WEAR IT LOUD!</h2>
                                <p className='mb-0 lg:text-base text-[10px]'>Home, Away & Third Kits Available</p>
                                <div>
                                    <button className='bg-[#e25a5a7a] lg:text-[14px] text-[10px] text-[white] lg:p-2 p-1' onClick={handleNavigate}>SHOP NOW</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='mt-5'>
                    <div className='grid grid-cols-4 gap-2'>
                    </div>
                </div>
            </div> 
            }
            {
                user.value.role==="admin" && <div className='h-screen flex justify-center flex-col items-center'>
                        <p>WELCOME ADMIN</p>
                        <button className='bg-black text-white p-2' onClick={()=>navigate("/admin")}>Go to admin dashboard</button>
                </div>
            }
            {
                user.value.role==="seller" && <div className='h-screen flex justify-center flex-col items-center'>
                        <p>WELCOME SELLER</p>
                        <button className='bg-black text-white p-2' onClick={()=>navigate("/seller")}>Go to seller dashboard</button>
                </div>
            }
            {
                token ? <div>
                    <p>"</p>
                </div> : <div>
                    <Loginpage/>
                </div>
            }



        </div>

    )
}

export default Homepage
