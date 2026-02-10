const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword="123456";
const app = express();

app.use(express.json());   


// not using db;
const ALL_USERS =[
    {
        username:"khushirajrana017@gmail.com",
        password:"123",
        name:"Khushi Raj Rana",
    },
    {
        username:"rajranakhushi61@gmail.com",
        password:"123",
        name:"Khushi Rajrana",
    },
    {
        username:"23bcs050@nith.ac.in",
        password:"123456",
        name:"Khushi",
    },
];

function userExists(username,password){
    for(let i=0;i<ALL_USERS,length;i++){
        if(ALL_USERS[i].username ===username && password === ALL_USERS[i].password){
            return true;
        }
    return false;
    }
}

app.post("/signin",function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    if(!userExists(username ,password)){
        return res.status(403).json({
            msg :"user doesnt exist ",
        });
    }

    var token = jwt.sign({username : username},'shhhhh');
    return res.json({
        token,
    });
});

// app.get("/users",function(req,res){
//     // authorization header
//     const token = req.headers.authorization;
//     try{
//         const decoded=jwt.verify(token ,jwtPassword);
//         const username = decoded.username;
//         // return a list of users other than this username
//     }catch(err){
//         return res.status(401).json({
//             msg:"invalid token", 

//     });
//     }
// });
app.get("/users",function(req,res){
    // authorization header
    const token = req.headers.authorization;
    const decoded = jwt.verify(token , jwtPassword);
    const username = decoded.username;    
    res.json({
        users : ALL_USERS.filter(function(value){
            if(value.username == username){
                return false;
            }else{
                return true;
            }
        })
    })
});

app.listen(3000); 

