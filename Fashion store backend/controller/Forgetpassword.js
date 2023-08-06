const UserregisterModel = require("../models/Userregistration");
const nodemialer = require("nodemailer")
const randomstring = require("randomstring")


const sendemail = async(fullName,email,token)=>{
  try {
   const transporter =  nodemialer.createTransport({
      host:"smtp.gmail.com",
      port:587,
      secure:false,
      requireTLS:true,
      auth:{
        user:"fa1694701@gmail.com",
        pass:"something45"

      },
      tls: {
        // Add this TLS option to enable STARTTLS
        rejectUnauthorized: false,
      },
    })
    const mailOptions = {
      from:"fa1694701@gmail.com",
      to:email,
      subject:"For Reset Password",
      html:"<p> Hii " +
      fullName +
      ", please copy the link <a href='http://localhost:3000/change/forgetPassword/" +
      token +
      "'>here</a> and reset your password.</p>",

    }
    transporter.sendMail(mailOptions,(error,info)=>{
      if(error){
        console.log(error)
      }
      else{
        console.log("Mail Has been send ",info.response)
      }

    })
    
  } catch (error) {
    res.status(400).send({
      status:"failed",
      message:error.message
    })
    
  }

}
const forgetPaasword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find user by email
    const user = await UserregisterModel.findOne({ email });

    if (user) {
        const randomString = randomstring.generate();
        user.token = randomString;
        await user.save();
        sendemail(user.fullName,user.email,randomString)
    
      res.send({
        status: "success",
        message: "Email exists. Password reset email sent.",
      });
    } else {
      // Email does not exist in the database
      // Implement your logic for handling the case when the email does not exist
      // For example, you can show an error message to the user
      res.send({
        status: "failed",
        message: "Email does not exist.",
      });
    }
  } catch (error) {
    // Handle any error that occurred during the process
    console.log(error);
    res.send({
      status: "failed",
      message: "Forget Password",
    });
  }
};

module.exports = {forgetPaasword}