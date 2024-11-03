import { useContext } from "react"
import { assets, plans } from "../assets/assets"
import { AppContext } from "../context/AppContext"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@clerk/clerk-react"
import axios from "axios"
const BuyCredit = () => {
  const {url,loadCreditData} = useContext(AppContext)
  const navigate = useNavigate()
  const {getToken} = useAuth()
  const initPay=(order)=>{
    const option={
      key:import.meta.env.RAZORPAY_KEY_ID,
      amount:order.amount,
      currency:order.currency,
      name:"Credit payment",
      description:"Buy Credit",
      order_id:order.id,
      receipt:order.receipt,
      handler: async(response)=>{
       console.log(response);
      }


    }

    const rzp = new window.Razorpay(option)
    rzp.open()


  }
  const PaymentRazorpay = async(planId)=>{
    try {
      const token = await getToken()
      const {data} = await axios.post(`${url}/api/user/pay`,{planId},{headers:{token}})
      if(data.success){
        initPay(data.order)
      }
       
      
    }catch (error) {
      console.log(error);
      
    }
  }
  return (
    <div className=" min-h-[80vh] text-center pt-14 mb-10">
      <button className=" border border-gray-500 px-10 py-2 rounded-full mb-6">Our Plans</button>
      <h1 className=" text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-slate-600 to-gray-500  bg-clip-text text-transparent mb-5">Choose the plan that is right for you</h1>
      <div className=" flex flex-wrap justify-center gap-6 text-left">
        {
          plans.map((item,index)=>(
            <div className=" bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-700 hover:scale-105 transition-all duration-700" key={index}>
              <img width={40} src={assets.logo_icon} alt="" />
              <p className=" mt-3 font-semibold">{item.id}</p>
              <p className=" text-sm">{item.desc}</p>
              <p className=" mt-6">
                <span className=" text-3xl font-medium">${item.price}</span>/ {item.credits} credit
              </p>
              <button onClick={()=>PaymentRazorpay(item)} className=" w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52">Purchase</button>
            </div>
          ))
        }

      </div>
    </div>
  )
}

export default BuyCredit