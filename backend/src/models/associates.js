const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
mongoose.connect('mongodb://xyz123:fvyosiRBHs3PQDvg@ac-bz3ghis-shard-00-00.77f4z4w.mongodb.net:27017,ac-bz3ghis-shard-00-01.77f4z4w.mongodb.net:27017,ac-bz3ghis-shard-00-02.77f4z4w.mongodb.net:27017/HallBookingPortal?ssl=true&replicaSet=atlas-xsylnh-shard-0&authSource=admin&retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error"));
db.once("open",()=>{
    console.log("connected to Mongodb");
});
const Schema = mongoose.Schema;

const associateSchema = new Schema({


    username:{
        type: String,
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    }

    
});



const associates = mongoose.model('associates',associateSchema)
module.exports= associates;

