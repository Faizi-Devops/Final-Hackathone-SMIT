const jwt = require("jsonwebtoken");
const userReg = require('../models/Userregistration');

const checkuserAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      token = authorization.split(" ")[1];
      const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await userReg.findById(userID).select('-password');
      next();
    } catch (error) {
      res.send({
        status: "failed",
        message: "Unauthorized User"
      });
    }
  }
  if (!token) {
    res.send({
      status: "failed",
      message: "Token not found"
    });
  }
};

module.exports = { checkuserAuth };
