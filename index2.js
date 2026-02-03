// middleware
// code without using middle wares
// for handling username and password sent  the user in query

const express = require("express");
const app = express();
app.use(express.json());

// UGLY WAY OF HANDLING AUTHENTICATION AND INPUT VALIDATION

app.get("/health-checkup", function (req, res) {
  // taking username and password from headers
  const username = req.headers.username;
  const password = req.headers.password;
  // input validation  , input is kidneyId
  const kidneyId = req.query.kidneyId;

  if (username === "Khushi" && password === "password123") {
    // input validation of user input
    if (kidneyId == 1 || kidneyId == 2) {
      // do something here
      res.json({
        msg: "successfully completed",
      });
    }
  } else {
    res.json({
      msg: "wrong input",
    });
  }

  res.status(400).json({ msg: "somethings up with your input" });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});

 // in case of multiple routes t with same input
 // 1-Approach : ugly way of handling authentication and input validation
 ///------> create separate routes and write logic for authentication and input validation in each route --> avpid dry priniciple due to unnecessary repeatation of code

 // 2-Approach : slightly better way of handling authentication and input validation  using wrapper function
 // create function for autrhentication and validation at top and use them in your routes
 // logic is written low
 function authenticate(username, password){
    if(username != "Khushi"|| password !="password123"){
        return false;
    }
    return true;
 }

 function validateKidneyId(kidneyId){
    if(kidneyId ==1 || kidneyId==2){
        return true;
    }
    return false;
 }
// route using these functions

app.put("/replace-kidney",(req,res)=>{
    const kidneyId = req.query.kidneyId;
    const username= req.headers.username;
    const password = req.headers.password;
    if(!authenticate(username , password)){
        res.status(401).json({
            msg:"authentication failed"
        })
        return;
    }

    if(!validateKidneyId(KidneyId)){
        res.status(400).json({
            msg:"invalid kidney id"
        })
        return;
    }

    res.send("Your kidneys are healthy now");
})
// put usually usees Body not query  since put is to update data and Body is meant  to update data;


// 3->using  middleware  function
function userMiddleware(req, res,next){
    if(username != "Khushi" && password != "password123"){
        res.status(403).json({
            msg:"incorrect username or password"
        })
    }
    else{
        next();
    }
};

function kidneyMiddleware (req,res,next){
    const kidneyId = req.query.kidneyId;        
    if(kidneyId !=1 && kidneyId !=2){
        res.status(400).json({
            msg:"invalid kidney id"
        })
    }
    else{       
         next();
    }   
};

app.get("/Kidney-checkup",userMiddleware , kidneyMiddleware ,(req,res)=>{
    // do something ---> write logic for the changes you want
    res.send("Your kidneys are healthy");
})

// only pass the middleware that you need for that  particular route
// example-->
app.get("/heart-check",userMiddleware,(req,res)=>{
    // you dont require kidney chek for heart checkup
    res.send("Your heart is healthy");
})

// we can pass multiple call ack funcitons in our route ,  they will  executed in order
// example-->
app.get("/health-checkup",function(req,res){

},function(req,res){

},function(req,res){

});

// what if i sent response in first function , then there will  no point in executing next functions since response is already sent
// 3 inputs will  used in these function  req,res,next
// next is function in itself
// all other function are precheck except the last one
// if things go fine , i will call next() which will route the request to the next one  and the next function gains the control
app.get("/health-checkup",function(req,res,next){
    // code logic
    next();

},function(req,res,next){
    // code logic
    next();

},function(req,res){
    console.log("final function executed");
    res.send("code completed");
});
// these extra functions in between are called middleware
//  menitoned above snippet is same as
// app.get("/heart-check",userMiddleware,(req,res)=>{
//     // you dont require kidney chek for heart checkup
//     res.send("Your heart is healthy");
// })
// isme middleare function top se declare kiya tha which is a good practice instead of defining function inside route.