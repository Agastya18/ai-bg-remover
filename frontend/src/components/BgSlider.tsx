import { useState } from "react"
import { assets } from "../assets/assets"

const BgSlider = () => {
    const [sliderPos,setSliderPosition] = useState<number>(50)
    const handleSlider = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSliderPosition(parseInt(e.target.value))
    }
  return (
    <div className=" pb-10  md:py-20 mx-2">
        <h1 className=" mb-10 sm:mb-20 text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-slate-600 to-gray-500  bg-clip-text text-transparent">Remove background with high <br /> quality and accuracy.</h1>
        <div className=" relative w-full max-w-3xl overflow-hidden m-auto rounded-xl">
            <img src={assets.image_w_bg} style={{clipPath:`inset(0 ${100.2-sliderPos}% 0 0)`}} alt="" />
            <img className=" absolute top-0 left-0 w-full h-full" src={assets.image_wo_bg} style={{clipPath:`inset(0 0 0 ${sliderPos}%)`}} alt="" />

            <input className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full z-10 slider" type="range" min={0} max={100} value={sliderPos} onChange={handleSlider} name="" id="" />
        </div>
    </div>
  )
}

export default BgSlider