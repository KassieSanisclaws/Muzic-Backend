const jwt = require("jsonwebtoken");  
const dotenv = require("dotenv");
dotenv.config();

module.exports = generateToken = (user) => {
    return jwt.sign({
        _id: user.id,
        user_email: user.user_email,
        user_password: user.user_password
   },
   process.env.JWT_SECRET || process.env.JWT_SECRET,
   {
       expiresIn: "30d",
   }
  );
};