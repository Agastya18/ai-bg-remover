import {assets} from '../assets/assets'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className=' flex items-center justify-between py-3 mx-4'>
       <Link to={'/'}>
       <img className=' w-32  sm:w-44' src={assets.logo} alt="" /></Link>
        <button className=' bg-zinc-800 items-center flex gap-4 sm:px-8 sm:py-3 px-4 py-2 text-sm rounded-full text-white'>
        Get Start    <img className=' w-3 sm:w-4' src={assets.arrow_icon} alt="" />
        </button>
    </div>
  )
}

export default Navbar