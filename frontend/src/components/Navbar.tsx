import {assets} from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { useClerk,UserButton,useUser} from '@clerk/clerk-react'
import { useContext, useEffect} from 'react'
import { AppContext } from '../context/AppContext'


const Navbar = () => {


  const {openSignIn} = useClerk()
  const {isSignedIn,user}=useUser()
  const {credit,loadCreditData} = useContext(AppContext)
 const navigate=useNavigate()
  useEffect(()=>{
    if(isSignedIn){
      loadCreditData()
    }
  },[isSignedIn])
 console.log("this isit",credit);
  return (
    <div className=' flex items-center justify-between py-3 mx-4 lg:px-44'>
       <Link to={'/'}>
       <img className=' w-32  sm:w-44' src={assets.logo} alt="" /></Link>
       {
        isSignedIn? <div className=' flex items-center  gap-2 sm:gap-3'>
          <button onClick={()=>navigate('/buy')} className=' flex items-center gap-2 bg-blue-100 px-4 sm:px-7 py-1.5 rounded-full hover:scale-105 transition-all duration-500'>
            <img className=' w-5' src={assets.credit_icon} alt="" />
            <p className=' text-xs sm:text-sm font-medium text-gray-600'>Credit:{credit}</p>
          </button>
          <p className=' text-gray-600 max-sm:hidden'>Hi,{user.fullName}</p>
          <UserButton/>
        </div>:(<button onClick={()=>openSignIn({})} className=' bg-zinc-800 items-center flex gap-4 sm:px-8 sm:py-3 px-4 py-2 text-sm rounded-full text-white'>
        Get Start    <img className=' w-3 sm:w-4' src={assets.arrow_icon} alt="" />
        </button>)
       }
        
    </div>
  )
}

export default Navbar