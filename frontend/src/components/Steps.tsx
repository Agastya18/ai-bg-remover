import { assets } from "../assets/assets"


const Steps = () => {
  return (
    <div className=" mx-4 py-20 lg:mx-44 xl:py-40">
        <h1 className=" text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-slate-600 to-gray-500  bg-clip-text text-transparent">Steps to remove background <br /> image in seconds</h1>
        <div className=" flex items-start flex-wrap gap-4 mt-16  xl:mt-24 justify-center">
            <div className=" flex items-start gap-4 bg-white border drop-shadow-md p-7 pb-10 rounded hover:scale-105  transition-all duration-500">
                <img className=" max-w-9" src={assets.upload_icon} alt="" />
                <div>
                    <p className=" text-xl font-medium">Upload image</p>
                    <p className=" text-sm text-neutral-500 mt-1">This is demo will replace it later.</p>
                </div>
            </div>
            <div className=" flex items-start gap-4 bg-white border drop-shadow-md p-7 pb-10 rounded hover:scale-105  transition-all duration-500">
                <img className=" max-w-9" src={assets.remove_bg_icon} alt="" />
                <div>
                    <p className=" text-xl font-medium">Remobe background</p>
                    <p className=" text-sm text-neutral-500 mt-1">This is demo will replace it later.</p>
                </div>
            </div>
            <div className=" flex items-start gap-4 bg-white border drop-shadow-md p-7 pb-10 rounded hover:scale-105  transition-all duration-500">
                <img className=" max-w-9" src={assets.download_icon} alt="" />
                <div>
                    <p className=" text-xl font-medium">Downlaod Image</p>
                    <p className=" text-sm text-neutral-500 mt-1">This is demo will replace it later.</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Steps