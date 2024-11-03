import { createContext, useState } from "react";
import { useAuth,useClerk,useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface AppContextType {
    credit: boolean;
    loadCreditData: () => Promise<void>;
    setcredit: React.Dispatch<React.SetStateAction<boolean>>;
    url: string;
}

export const AppContext = createContext<AppContextType | null>(null);

const AppContextProvider = (props)=>{
    const url=import.meta.env.VITE_BACKEND_URL
    const [credit,setcredit]= useState(false)
    const [image,setImage] = useState(false)
    const [resultImage,setResultImage] = useState(false)
    const { getToken } = useAuth();
    const {isSignedIn}=useUser();
    const {openSignIn} = useClerk()
   const navigate= useNavigate()
  // console.log(credit);
    const loadCreditData = async () => {
        try {
            const token = await getToken();
         //   console.log(token);
            const { data } = await axios.get(`${url}/api/user/credits`, { headers: { token } });
            // if(data.success){
            //     setcredit(data.creditBalance
            //     )
               
            // }

            if(data){
                setcredit(data.creditBalance)
            }
          
        } catch (error) {
            console.log(error);
        }
    }

    const removeBg = async (image: any) => {
        try {
         if(!isSignedIn){
               return openSignIn()}

               setImage(image)
               setResultImage(false)
               navigate('/result')

               const token = await getToken();

               const formData = new FormData();
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
               image && formData.append('image', image);

                const {data} = await axios.post(`${url}/api/image/removebg`, formData, { headers: { token } });
               
              
         
                if(data.success){
                    setResultImage(data.resultImage)
                    //console.log("inside if",data.creditBalance)
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  data.creditBalance &&  setcredit(data.creditBalance)
                }

             // console.log(resultImage)
         
        } catch (error) {
            console.log(error);
            navigate('/buy')
             // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                   //data.creditBalance &&  setcredit(data.creditBalance)
                
        }
       
    }

   // console.log("this is result,",resultImage)

    const value={
        credit,
        loadCreditData,setcredit,url,image,setImage,removeBg,resultImage,setResultImage
    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;