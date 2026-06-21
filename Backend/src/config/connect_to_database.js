const { default: mongoose } = require("mongoose");

const connect_to_database = async () => {

  mongoose.connection.on("Connected", ()=> {console.log("Mongo Connected")})
  mongoose.connection.on("Error", (err)=> {console.log("Mongo Error",err)})

  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DataBase Connected");
  } catch (error) {
    console.log(error)
  }
};

module.exports = {connect_to_database};
