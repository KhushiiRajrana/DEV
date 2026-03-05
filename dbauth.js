// 3.2 datasases and auth // after 1:17 :00 
// proem statement i sthat wrote a html code that will hit the ackend server
// in real life you have multiple  ackend servers linked to dataases not to a single server and you have to make sure that only authenticated users can access the data in the database
// for that we use jwt and mongoDB
// jwt --> json web token is a way to create a token for a user when they sign in and then use that token to authenticate the user in subsequent requests
// mongoDB --> is a NoSQL database that is used to store data in a JSON format
// i cannot directly hit database of any firm , i will hit the backend , ti will then authenicate the session and whatevert i want  will be fetched by backend from the database//

//MONGODB
// mongodb lets you create  multiple databases
//in each db , ut lets you create tables(collections)
// in each table , it lets you dump json data
// it is schemaless--> you dont need to define the structure of data/schema
// it scales well and is a decent choice for most use cases

// 🟢 Connecting MongoDB Atlas (Node + Mongoose)
// 1️⃣ Install Mongoose
// npm install mongoose
// 2️⃣ Add Connection String in .env
// MONGO_URI=your_connection_string
// 3️⃣ Connect to Database
// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("DB Connected");
//   } catch (err) {
//     console.log(err);
//   }
// };

// export default connectDB;
// 4️⃣ Call It in server.js
// import dotenv from "dotenv";
// dotenv.config();

// connectDB();

// database name , collection name is table
// now we willn ot import data , we wil actually create a end point for example at signup , we will create end point from where the user data will be put to the database

// how can my node js/backend process connect to this db?
// --> express lets you create an http srever
//--> hwt library lets you create jets
//--> mongoose lets you connect to your db
// ie how to write to db and how to read to databases


// 4 march
// asssignment  -> user exist and not , ie signin and signup page but instead of static data  we will be using mongodb here
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose  = require("mongoose");
const jwtPassword  = "123456";

mongoose.connect(
    "mongodb://localhost:27017/user_app"
    // this is from compass
)
// mongo url is same for all in a clusteer only databse name changes at the end,
// general url mongodb+srv://username:password@cluster0.abcd.mongodb.net/myDatabase
// it is not safe to push this url on git hub 
// safe way to do so is , add your url to .env , create .env in .gitignore whihc prevents env file to be uploaded on git hub

// you always need to validate your schema before wriitng to mongo db 
// const Users  = mongoose.model('Users',{name : String , email:String , password : String});
// // ie table name is uers with attributes name , email , password
// //mongoose.model() create a Model . A model is a javascript object used to inteact with mongoDb collection (create, read, update, delete documents)

// const user = new Users({
//     name : "Khushi Raj Rana" ,
//     email:"agdvghd@gmail.com",
//     password :"12345678"
// });
// // db itself will not save this to it , you need to save it explicitly
// user.save();
// this will save this data you database

//const user = new Users({
//     
// name : "Khushi Raj Rana" ,
//     email:"agdvghd@gmail.com",
//     password :"12345678"
// });

// user.save();
// this might nto work because mongoose.connect is asynchronous  , so user.save() might run before the db connection finishes
// so you require async function

async function main() {

  await mongoose.connect("mongodb://localhost:27017/user_app");

  const Users = mongoose.model("Users", {
    name: String,
    email: String,
    password: String
  });

  const user = new Users({
    name: "Khushi Raj Rana",
    email: "agdvghd@gmail.com",
    password: "12345678"
  });

  await user.save();

  console.log("User saved to database");

}
