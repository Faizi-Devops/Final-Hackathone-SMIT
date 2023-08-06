const UserregisterModel = require("../models/Userregistration");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Userregistration = async (req, res) => {

  const { fullName, email, password,  contactNumber,address,state,country,pincode,regdate,image,updatedAt } = req.body;
  const user = await UserregisterModel.findOne({ email: email });
  if (user) {
    res.send({
      status: "Exist",
      message: "User email already exists",
    });
  } else {
    if (fullName && email && password && contactNumber && address && state && country && pincode && regdate && image && updatedAt !==  "") {
      try {
        const salt = await bcrypt.genSalt(12);
        const hashpassword = await bcrypt.hash(password, salt);
        let newUser = new UserregisterModel({
        fullName: fullName,
          email: email,
          password: hashpassword,
          contactNumber: contactNumber,
          address:address,
          state:state,
          country:country,
          pincode:pincode,
          regdate:regdate,
          image:image,
          updatedAt:updatedAt
          
        });
        await newUser.save();
        const saved_user = await UserregisterModel.findOne({
          email:email
        })
        const token = jwt.sign({userID:saved_user._id},process.env.JWT_SECRET_KEY,{expiresIn:'5d'})
        res.status(201).send({
          status: "Success",
          message: "User registered successfully",
          token:token
        });
      } catch (error) {
        console.log(error); // Log the error for debugging
        res.send({
          status: "Failed",
          message: "Unable to register",
        });
      }
    } else {
      res.send({
        status: "Failed",
        message: "All fields are required",
      });
    }
  }
};


const LoggedinuserData = async(req,res) =>{
  const { email } = req.query;

  try {
    const user = await UserregisterModel.findOne({ email }).select('-password -_id');
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({
        status: "Failed",
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(error); // Log the error for debugging
    res.status(500).json({
      status: "Failed",
      message: "Unable to fetch user data",
    });
  }

}

const Userlogin = async(req,res) =>{
    try {
        const {email,password} = req.body;
        if(email && password){
            const user = await UserregisterModel.findOne({email:email})
            if(user != null){
                const isMatch = await bcrypt.compare(password,user.password)
                if((user.email === email) && isMatch){
                  
                  const token = jwt.sign({userID:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'5d'})
                    res.status(200).send({
                        status:"success",
                        message:"User login successfully",
                        Token:token
                    })
                     //for unique id
                const timestamp = Date.now().toString(36); // Convert current timestamp to base 36 string
                const randomChars = Math.random().toString(36).substring(2, 7); // Generate random characters
                const uniqueId = `${timestamp}-${randomChars}`;
                user.uniqueId = uniqueId;
    await user.save();

                }
                else{
                  res.send({
                    status: "failed",
                    message: "Email or password is not correct",
                  });

                }

            }
            else{
                res.send({
                    status:"failed",
                    message:"You are not a register User"
                })
            }
        }else{
            res.send({
                status:"failed",
                message:"Alld fields are required"
            })
        }
    } catch (error) {
        
    }

}
const getAllUsers = async(req,res) =>{
  try {
    const users = await UserregisterModel.find();
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send('An error occurred while retrieving users.');
  }

}
const deleteUser = async(req,res) =>{
  try {
    const userId = req.params.id;
    await UserregisterModel.findByIdAndDelete(userId);
    res.status(200).send({
      "message":"User Deleted Successfully"
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      "message":"An error occurred while deleting the user."
    });
  }


}
const changePassowrd = async(req,res) =>{
  const {password,password_confirmation} = req.body;
  if(password && password_confirmation){
    if(password === password_confirmation){
      const salt  = await bcrypt.genSalt(12);
      const hashPassword = await bcrypt.hash(password,salt)

      await UserregisterModel.findByIdAndUpdate(req.user._id,{
        $set:{
          password:hashPassword
        }
      })
      res.send({
        "status":"success",
        "message":"change password successfully"
      })

    }
    else{
      res.send({
        "status":"failed",
        "message":"Password and confirm password does not matched"
      })
    }

  }
  else{
    res.send({
      "status":"failed",
      "message":"All fields are required"
    })
  }

}

const userLogged = async (req,res)=>{
  res.send({
    "user":req.user 
  })

}
const sendEmailForgetPassword  = async(req,res)=>{
  const {email} = req.body;
  if(email){
    const user = await UserregisterModel.findOne({email:email})
    const  secret = user._id + process.env.JWT_SECRET_KEY
    if(user){
      const token = jwt.sign({userID:user._id}, secret,{expiresIn:"3m"})
      


    }
    else{
      res.send({
        "status":"failed",
        "message":"Email doesn't exist"
      })
    }

  }
  else{
    res.send({
      "status":"failed",
      "message":"Email not found"
    })
  }


}
const updateUserWithEmail = async (req, res) => {
  console.log(req.file,req.body,"227")
  
  

  try {
    let profile = req.file.filename
    const { email, pincode,fullName,contactNumber,address,state,country,updatedAt } = req.body;

    // Find the state by email
    const kuch = await UserregisterModel.findOne({ email });
    if (!kuch) {
      return res.status(404).send({ error: 'State not found' });
    }

    // Update the fields
    
  
    kuch.pincode= pincode ;
    kuch.fullName=fullName;
    kuch.contactNumber=contactNumber;
    kuch.address = address;
    kuch.state = state;
    kuch.country = country;
    kuch.image = profile;
    kuch.updatedAt = updatedAt
    
    
  

    // Save the updated state
    await kuch.save();

    res.status(200).send({
      message: 'User Profile updated successfully',
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    console.log(error)
  }
};
// const updateUserDataLogin = async(req,res) =>{
//   try {
//         const { email, pincode,fullName,contactNumber,address,state,country } = req.body;
    
//         // Find the state by email
//         const kuch = await UserregisterModel.findOne({ email });
//         if (!kuch) {
//           return res.status(404).send({ error: 'State not found' });
//         }
    
//         // Update the fields
        
      
//         kuch.pincode= pincode ;
//         kuch.fullName=fullName;
//         kuch.contactNumber=contactNumber;
//         kuch.address = address;
//         kuch.state = state;
//         kuch.country = country
      
    
//         // Save the updated state
//         await kuch.save();
    
//         res.status(200).send({
//           message: 'User Profile updated successfully',
//         });
//       } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//         console.log(error)
//       }

// }

module.exports = { Userregistration, Userlogin,changePassowrd,userLogged,sendEmailForgetPassword,getAllUsers,deleteUser,LoggedinuserData,updateUserWithEmail };
  
  
