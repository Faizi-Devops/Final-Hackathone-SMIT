const UserregisterModel = require("../models/Userregistration");

const bcrypt = require('bcrypt');
const Changing = async(req,res) =>{
    const { email, password, newPassword } = req.body;

    try {
      if (password && newPassword ) {
        const user = await UserregisterModel.findOne({ email });
  
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
module.exports={Changing}