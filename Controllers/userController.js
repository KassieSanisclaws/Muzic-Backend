const User = require("../Models/userModel.js");
const utils = require("../utils.js");
const bcrypt = require("bcryptjs");
const dbConnection = require("../SqlConfig/config.db");
////////////////////////////////////////////////////////////////////////////////////
exports.seedUsersData = (req, res) => {

}
////////////////////////////////////////////////////////////////////////////////////
//getUserByID.//
exports.getUsersByID = (req, res) => {
    User.getUserByID(req.params.id, (err, user) => {
        if(err){
            res.send(err);
            console.log("Single User Data", user);
            res.send(user);
        }  
    });
};
////////////////////////////////////////////////////////////////////////////////////
//createNewUser.//
exports.registerUsers = (req, res) => {
    //TEST-CASE[1]: (construct constant of variables from form).//
    //Destructured variable constant below for less declarations of the same variables.//
     const {name, email, password, confirmPassword } = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
        });

//TEST-CASE[2]: (if statment checking each input field).//(WORKING)
//Checking All Input Fields Of Empty Data Being submitted Into DataBase.//
if(name == req.body.name < 0){
    return res.status(400).json({ success: false, message: "Name Field Must Be Completed Before Submitting!" }); 
   }else{
if(email == req.body.email < 0){
  return res.status(400).json({ success: false, message: "Email Field Must Be Completed Before Submitting!" });
   }else{
if(password == req.body.password < 0){
  return res.status(400).json({ success: false, message: "Password Field Must Be Completed Before Submitting!" });
   }else
if(confirmPassword == req.body.confirmPassword < 0){
  return res.status(400).json({ success: false, message: "ConfirmPassword Field Must Be Completed Before Submitting!" });
}
//TEST-CASE[3]: (SQL Query).//(WORKING)
//Do Sql Query of email checking if there is already a user with that email in the database.//  
dbConnection.query("SELECT * FROM `users` WHERE user_email = ?",[email], (err, reqDataResult) => {
if(err){ 
  return res.status(500).json({ success: false, message: "An Error Occured While Creating User" });
  }else{
//TEST-CASE[4]: (if statement).//(WORKING)
//Checks If User Already in DataBase.//
if(reqDataResult.length == 1){
  return res.status(401).json({ success: false, message: "User Email Already In Use! "});
  }else{
if(reqDataResult.length == 0){
//TEST-CASE[5]:(Bcrypt Code).//(WORKING)
//Bcrypt Code Block Runs Generating The Hash Of The Password An Saulting Rounds.// 
bcrypt.hash(password, 10, (err, hash) => {
if(err){
  res.status(500).json({ success: false, message: "Error Occured Creating User!." });
  console.log(err);
  }else{
if(hash){
//TEST-CASE[6]:(SQL Query INSERT INTO users table).//(WORKING)
//SQL Query INSERT INTO DB All Fields From Registration Form Into DB Columns.//
dbConnection.query("INSERT INTO `users` (user_name, user_email, user_password) VALUES (?,?,?)", [name, email, hash ], (err, reqDataResult) => { 
if(err){
  return res.status(500).json({ success: false, message: "Error Occured!" });
}else if(reqDataResult){
  return res.status(200).send({ success: true, authToken: generateToken({ user: email })});  
  }
})
}
}})         
}
}}})
}}
}
////////////////////////////////////////////////////////////////////////////////////
//loginUser.//
exports.loginUsers = (req, res) => {
    //TEST-CASE[1]:(Variables)-deconstruct.//(WORKING)
    //De-construct variables to hold the req.body and can be called within the code easily.//
      const { user_email, user_password } = {
            user_email: req.body.user_email,
            user_password: req.body.user_password };
    //TEST-CASE[2]:(if statement).//(WORKING)
    //If Statement checking user_email and user-password fields before submission.//
      if(user_email == req.body.user_email < 0){
           res.status(400).json({ success: false, message: "Must Have Email Field Complete Before Submitting!" });
           }else{
      if(user_password == req.body.user_password < 0){
           res.status(400).json({ success: false, message: "Must Have Password Field Completed Before Submitting!." });
           }else{
    //TEST-CASE[3]:(SQL Query).//(WORKING)
    //Sql Query Checking The DataBase By user_email Returning (err, results from search).//
     dbConnection.query("SELECT * FROM `users` WHERE user_email = ?", [user_email], (err, reqResult) => {
        if(err){
           res.status(500).json({ success: false, message: "Error Occured Perfoming Request!" });
           }else{
    //TEST-CASE[4]:(is statement).//(WORKING)
    //If Statement Checking For A User By user_email in DataBase Returning False If No User Is Found By user_email.//
        if(reqResult.length == 0){
          res.status(401).json({ success: false, message: "User Not Found!" });
        }else{
    //TEST-CASE[5]:(Bcrypt).//(WORKING)
    //Bcrypt Comparing Password Fopr Validation./// 
     bcrypt.compare(user_password, reqResult[0].user_password, (err, result) => {
        if(err){
          res.status(500).json({ success: false, message: "Error Occured Validating!" });
        }else{
    //TEST-CASE[6]:(if statement).//(WORKING)
    //If Statement Returing Response Of Successful logIn.//
          if(result){
            res.status(200).send({ success: true, authToken: generateToken({ user: user_email })});
          }else{
            return res.status(401).send({ success: false, message: "Password Incorrect!"});
          }
        }})
      }}})
    }}
    }
////////////////////////////////////////////////////////////////////////////////////