import { useContext } from "react"
import { assets } from "../assets/assets"
import { AppContext } from "../context/AppContext"

const Hero = () => {
  const {removeBg}= useContext(AppContext)
  return (
    <div className=" flex items-center  justify-between max-sm:flex-col-reverse gap-y-10 px-4 mt-10 sm:mt-20 lg:px-44">
        {/* left side */}
        <div >
            <h1 className=" text-4xl xl:text-5xl 2xl:text-6xl font-bold text-neutral-700 leading-tight">Remove the <br className=" max-md:hidden" /><span className=" bg-gradient-to-r from-violet-600 to-violet-800 bg-clip-text text-transparent"> background</span> from <br className=" max-md:hidden" /> the image.</h1>
            <p className=" my-6 text-[15px] text-gray-500">Lorem ipsum dolor sit, amet consectetur adipisicing elit., in laborum <br className=" max-sm:hidden" /> necessitatibus consequuntur! Deleniti eaque!</p>
           <div>
           <input onChange={e => {
             if (e.target.files && e.target.files[0]) {
               removeBg(e.target.files[0]);
             }
           }} type="file" accept="image/*" id="upload" hidden />
           <label className=" inline-flex gap-3 px-8 py-3.5 rounded-full  cursor-pointer bg-gradient-to-r from-violet-600  to-fuchsia-500 m-auto hover:scale-105  transition-all duration-700" htmlFor="upload">
             <img width={20} src={assets.upload_btn_icon} alt="uplaod" />
             <p className=" text-white text-sm">Uplaod your image</p>
           </label>

           </div>

        </div>
        {/* right side */}

        <div className=" max-w-md w-full">

            <img className="" src={assets.header_img} alt="" />

        </div>
    </div>
  )
}

export default Hero