import jwt from 'jsonwebtoken';

const authUser =(req,res,next)=>{

    try {
        const {token} = req.headers;
        if(!token){
            return res.status(401).json({msg:"Unauthorized"});
        }
        const token_decoded = jwt.decode(token);

        req.body.clerkId=token_decoded.clerkId;
       // console.log(req.body.clerkId);
        next();
        
    } catch (error) {

        console.log(error);
        
    }

}

export default authUser;