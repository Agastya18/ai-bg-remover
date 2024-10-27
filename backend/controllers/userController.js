import { Webhook } from "svix";
import userModel from "../models/userModels.js";
export const clerkWebhook= async(req,res) =>{
    try {
        const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        await webhook.verify(JSON.stringify(req.body),{
            "svix-id": req.headers["svix-id"],
            "svix-signature": req.headers["svix-signature"],
            "svix-timestamp": req.headers["svix-timestamp"],

        });

        const {data,type}= req.body;

        switch(type){
            case "user.created":{
                const userData={
                    clerkId:data.id,
                    email:data.email_addresses[0].email_address,
                    photo:data.image_url,
                    firstName:data.first_name,
                    lastName:data.last_name
                }

                await userModel.create(userData);
                res.json({})
                break;
            }
              
               
            case "user.updated":{
                const userData={
                   
                    email:data.email_addresses[0].email_address,
                    photo:data.image_url,
                    firstName:data.first_name,
                    lastName:data.last_name
                }

                await userModel.findOneAndUpdate({clerkId:data.id},userData);

                res.json({})

                break;
            }
                
            case "user.deleted":{
                await userModel.findOneAndDelete({clerkId:data.id});
                res.json({})
                break;
            }
           
            default:
                console.log("Unknown Event");
                break;
        }



        
    }
    catch (error) {
        console.log('Clerk Webhook Error');
        
    }

}