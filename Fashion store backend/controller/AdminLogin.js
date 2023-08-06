const AdminregisterModel = require("../models/Adminlogin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Adminregistration = async (req, res) => {

    const {email,password } = req.body;
    const user = await AdminregisterModel.findOne({ email: email });
    if (user) {
      res.send({
        status: "Exist",
        message: "User email already exists",
      });
    } else {
      if ( email && password  !==  "") {
        try {
          const salt = await bcrypt.genSalt(12);
          const hashpassword = await bcrypt.hash(password, salt);
          let newUser = new AdminregisterModel({
         
            email: email,
            password: hashpassword,
           
            
          });
          await newUser.save();
          const saved_user = await AdminregisterModel.findOne({
            email:email
          })
          const token = jwt.sign({userID:saved_user._id},process.env.JWT_SECRET_KEY,{expiresIn:'5d'})
          res.status(201).send({
            status: "Success",
            message: "Admin register successfully",
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
  const Adminlogin = async(req,res) =>{
    try {
        const {email,password} = req.body;
        if(email && password){
            const user = await AdminregisterModel.findOne({email:email})
            if(user != null){
                const isMatch = await bcrypt.compare(password,user.password)
                if((user.email === email) && isMatch){
                  
                  const token = jwt.sign({userID:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'5d'})
                    res.status(200).send({
                        status:"success",
                        message:"Admin login successfully",
                        Token:token
                    })
                     //for unique id
                // const timestamp = Date.now().toString(36); // Convert current timestamp to base 36 string
                // const randomChars = Math.random().toString(36).substring(2, 7); // Generate random characters
                // const uniqueId = `${timestamp}-${randomChars}`;
                // user.uniqueId = uniqueId;
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
        console.log(error)
    }

}


const AdminPassword = async(req,res) =>{
  const { email, password, newPassword } = req.body;
  console.log(email,password,newPassword)

  try {
    if (password && newPassword ) {
      const user = await AdminregisterModel.findOne({ email });

      if (!user) {
        return res.status(404).json({
          status: 'failed',
          message: 'User not found',
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          status: 'failed',
          message: 'Current password is incorrect',
        });
      }

      // if (newPassword !== confirmPassword) {
      //   return res.status(400).json({
      //     status: 'failed',
      //     message: 'New password and confirm password do not match',
      //   });
      // }

      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Update the user's password in the database
      user.password = hashedPassword;
      await user.save();

      return res.status(200).json({
        status: 'success',
        message: 'Password changed successfully',
      });
    } else {
      return res.status(400).json({
        status: 'failed',
        message: 'All fields are required',
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 'failed',
      message: 'Internal server error',
      error: error.message,
    });
  }

}
  module.exports ={Adminregistration,Adminlogin,AdminPassword}