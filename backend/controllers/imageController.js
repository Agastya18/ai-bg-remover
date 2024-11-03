import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import User from "../models/userModels.js";

export const removeImageBg =async(req,res)=>{
try {
    const {clerkId }= req.body

    const user= await User.findOne({clerkId:clerkId})

    if(!user){
        return res.status(404).json({message:"User not found",})
    }

    if(user.creditBalance===0){
       return res.status(400).json({message:"Insufficient credits",success:false,creditBalance:user.creditBalance})
    }

    const imagePath = req.file.path;

    const imageFile = fs.createReadStream(imagePath)

    const formdata = new FormData();

    formdata.append('image_file',imageFile)

    const  {data} = await axios.post('https://clipdrop-api.co/remove-background/v1',formdata,{
        headers:{
            'x-api-key':process.env.CLIP_DROP_KEY,
           
        },
        responseType:"arraybuffer"
    })

    const base64Image = Buffer.from(data, 'binary').toString('base64');

    const resultImage= `data:${req.file.mimetype};base64,${base64Image}`
   // console.log(resultImage)

    await User.findByIdAndUpdate(user._id,{creditBalance:user.creditBalance-1})

    return res.status(200).json({resultImage,creditBalance:user.creditBalance-1,success:true})
    
} catch (error) {

    res.json({error:error.message,success:false})
    
}
}