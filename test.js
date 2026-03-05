// it is the way to check your mongodb connection
console.log("started");
const mongoose = require("mongoose");

async function testDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/user_app");
    console.log("MongoDB connected");

    const User = mongoose.model("User", {
      name: String
    });

    const doc = await User.create({
      name: "Test User"
    });

    console.log("Document inserted:", doc);

  } catch (err) {
    console.log(err);
  }
}

testDB();