const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const usersRoutes = require("./Routes/userRoutes");                            
///////////////////////////////////////////////
dotenv.config();
  
//////////////////////////////////////////////
const app = express();

app.use(cors());
app.use(express.json());                                                                                            
app.use(express.urlencoded({ extended: true }));                                                                                                                            
app.use((req, res, next) => {     
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Header", "Content-Type, Acceptm X-Requested-With, Origin");                                                                                        
    next();
});              
//////////////////////////////////////////////    
app.use("/api/user", usersRoutes);                                                                                                                                                                                                                                                         
//////////////////////////////////////////////
app.use((err, req, res, next) => {                                                                                                                                                                                                                                                                          
    res.status(500).send({ message: err.message });                           
});              
//////////////////////////////////////////////
//Server Route Connection-(respond on successful connection).//
app.get("/", (req, res) => {
    res.send("Server Is Ready");
});
/////////////////////////////////////////////
//Server Port Listening-On/ Serving-On.//
const port = process.env.PORT || 54441;
app.listen(port, () => {
    console.log(`Server Is Ready At http://localhost:${port}`);
});


module.exports = app;