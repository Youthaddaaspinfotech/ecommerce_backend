

import Model from "../model/user_model.js";
import Randomstring from "randomstring";
import  JsonWebToken from "jsonwebtoken";
import bcrypt from "bcryptjs";

export  const save  =async (req,res) =>{
    
     
     const hashpass = bcrypt.hashSync(req.body.password,10);
     const userDetail = {...req.body,"password":hashpass};
  
      try{
      
          await Model.create(userDetail);
          res.send({"status":200,msg:"user Registration successfully"});

      }catch(error){
          res.send({ status:500, error: error})
          console.log(error);
      };

}

export const login = async (req,res)=>{
    try{
        const {email,password} = req.body;
    
        const user =  await Model.findOne({ email });
        if(!user){
         return res.send({
             code: 200,
             msg: "The email address you entered isn't connected to an account. Please check your credentials and try again."
         });
        }
        const isPassword = await bcrypt.compare(password, user.password);
        if(!isPassword)
        {
            return res.send({
                code: 500,
                msg: "Incorrect password. Please try again."
            });

        }

        var payload = user.email;
        var key = Randomstring.generate();
        var token = JsonWebToken.sign(payload,key);
        res.status(200).json({"status":user,"token":token})
         return res.send({
            code: 200,
            msg: "Login successful.",
           
        });

            
    
    }catch(error){
        console.log(error)
        return res.send({
            code: 501,
            msg: "An error occurred while processing your request.",
           
            
        })
    }
 
   

} 


export const fetch = async (req,res)=>{

    
}