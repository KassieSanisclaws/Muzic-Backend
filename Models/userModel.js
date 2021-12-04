const dbConnection = require("../SqlConfig/config.db");

class User {
    constructor(user){
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.confirmPassword = user.confirmPassword;
    }
}

//SQL db getUserByID.//
User.getUserByID = (id, result) =>{
    dbConnection.query('Select * From users Where user_id=?', id, (error, res) => {
        if(error){
            console.log("Error fetching userby id", error);
            result(null, res);
        }else{
            console.log("User fetched successfully");
            result(null, res);
        }
    });   
};

module.exports = User;