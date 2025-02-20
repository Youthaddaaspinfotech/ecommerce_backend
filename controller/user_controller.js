

import Model from "../model/user_model.js";
import Randomstring from "randomstring";
import  JsonWebToken from "jsonwebtoken";
import bcrypt from "bcryptjs";

// export  const save  =async (req,res) =>{
    
   
//      const hashpass = bcrypt.hashSync(req.body.password,10);
//      const userDetail = {...req.body,"password":hashpass};
//      try{
      
//           await Model.create(userDetail);
//             res.send({"status":200,msg:"user Registration successfully"});

//       }catch(error){
//           res.send({ status:500, error: error})
//           console.log(error);
//       };

// }
export const save = async (req, res) => {
    try {
        // Destructure and validate required fields
        const { name, email, password, phoneNumber } = req.body;

        if (!name || !email || !password || !phoneNumber) {
            return res.status(400).send({
                status: 400,
                msg: "All fields (name, email, password, phoneNumber) are required."
            });
        }

        // Hash the password
        const hashpass = bcrypt.hashSync(password, 10);
        const userDetail = { ...req.body, password: hashpass };

        // Save the user
        await Model.create(userDetail);

        return res.status(200).send({
            status: 200,
            msg: "User registered successfully"
        });

    } catch (error) {
        console.error("Save Error:", error);
        return res.status(500).send({
            status: 500,
            msg: "User registration failed",
            error: error.message || error
        });
    }
};


export const login = async (req,res)=>{
    try{
        const {email,password} = req.body;
    
        const user =  await Model.findOne({ email });
        if(!user){
         return res.status({
             code: 500,
             msg: "The email address you entered isn't connected to an account. Please check your credentials and try again."
         });
        }
        const isPassword = await bcrypt.compare(password, user.password);
        if(!isPassword)
        {
            return res.status({
                code: 500,
                msg: "Incorrect password. Please try again."
            });

        }

        var payload = user.email;
        var key = Randomstring.generate();
        var token = JsonWebToken.sign(payload,key);
        res.status(200).json({"status":user,"token":token})
         return res.status({
            code: 200,
            msg: "Login successful.",
           
        });

            
    
    }catch(error){
        console.log(error)
        return res.status({
            code: 501,
            msg: "An error occurred while processing your request.",
           
            
        })
    }
 
   

} 


export const userfetch = async (req,res)=>{
    try {
        let post = req.body;
        
      
        let condition = [];
        if(post.name){
            condition.push({"name":{$regex:post.name,$options:"i"}})
        }
        if(post.status){
            condition.push({"status":post.status})
        }
        let data = await Model.find({ $and :condition});
        // console.log(data)
        let count = await Model.countDocuments({ $and: condition });
        return res.send({ "code": 200,"msg": "data found", "count": count, "data": data });
    }catch(error){
        console.log(error)
        return res.send({ "code": 500, "msg": "data not found", "error": error });
     }
    
}

export const updateuser = async (req, res) => {
    try {
        const { _id, name, email,  phoneNumber } = req.body;

        // Ensure _id is provided
        if (!_id) {
            return res.send({ code: 500, msg: "User ID (_id) is required." });
        }

        let rowData = await Model.findById(_id);
        
        if (!rowData) {
            return res.send({
                code: 500,
                msg: "user not found"
            });
        }

        // Update fields only if provided
        if (name) rowData.name = name;
        if (email) rowData.email = email;
        if (phoneNumber) rowData.phoneNumber = phoneNumber;

        await rowData.save();

        // Remove sensitive information before sending the response
        const userResponse = { ...rowData.toObject() };
        delete userResponse.password;
        delete userResponse.token;

        return res.send({
            code: 200,
            msg: "Profile Updated Successfully",
            data: userResponse
        });

    } catch (error) {
        console.error("Update Error:", error.message || error);
        return res.send({
            code: 500,
            msg: "user not updated",
            error: error.message || error
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { _id } = req.body;

        // Validate input
        if (!_id) {
            return res.send({
                code: 500,
                msg: "User ID (_id) is required."
            });
        }

        // Find user by ID
        let user = await Model.findById(_id);
        if (!user) {
            return res.send({
                code: 500,
                msg: "User not found."
            });
        }

        // Delete user
        await Model.findByIdAndDelete(_id);

        return res.send({
            code: 200,
            msg: "User deleted successfully"
        });

    } catch (error) {
        return res.send({
            code: 500,
            msg: "User not deleted",
            error: error
        });
    }
};




