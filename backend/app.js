const express = require("express");



const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const cors = require("cors")

const associates = require("./src/models/associates")
const bookings = require("./src/models/bookings")



//port
const port = 3000;
const App = express();

function verifyToken(req,res,next){
  if(!req.headers.authorization){
    return res.status(401).send('Unauthorized request');
  }
  let token = req.headers.authorization.split(' ')[1];
  console.log(token);
  if(token==null){
    return res.status(401).send('Unauthorized request');
  }
  let payload=jwt.verify(token,'secretKey');
  console.log(payload);
//   if(!payload){
//     return res.status(401).send('Unauthorized request');
//   } else {
   console.log(payload.username);
  if(payload.username ==="admin"){
    return res.status(401).json({message:'Unauthorized'});
  }
 
    
  req.username=payload.username;
  req.email=payload.email;
  
  next();
}

function verifyAdminToken(req,res,next){
    if(!req.headers.authorization){
      return res.status(401).send('Unauthorized request');
    }
    let token = req.headers.authorization.split(' ')[1];
    console.log(token);
    if(token==null){
      return res.status(401).send('Unauthorized request');
    }
    let payload=jwt.verify(token,'secretKey')
    console.log(payload);
    console.log(payload.username);
    // if(!payload){
    //   return res.status(401).send('Unauthorized request');
    // } 
  
    if(payload.username!=="admin"){
      return res.status(401).json({message:'Unauthorized'});
    }

    req.username=payload.username;
    
    
    next();
  }




//Middlewares
App.use(cors());
App.use(express.json());
App.use(express.urlencoded({extended:true}));


App.post('/register', function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    let associateData = req.body;
    console.log(associateData.username);
     
        bcrypt.hash(associateData.password,10,function(err,hash){
            if(err){
                res.status(400).json({
                    msg:"Something went wrong",results:err
                });
            }else{
                var associate = new associates({
                    username:associateData.username,
                    email:associateData.email,
                    password:hash
                });
                associate.save((error, registeredUser)=>{
                    if(error){
                        res.status(401).json({message:"Email already exists"});
                    console.log(error)
                } else {
                    // let payload={username:registeredUser.username,
                    //              email:registeredUser.email};
                    // let token = jwt.sign(payload,'secretKey');
                    // res.status(200).send({token});
                    res.status(200).send();
                }
                })
            }
        })
            
        // let associate = new associates(associateData);
    //     associate.save((error, registeredUser)=>{
    //     if(error){
    //         res.status(401).json({message:"Email already exists"});
    //     console.log(error)
    // } else {
    //     // let payload={username:registeredUser.username,
    //     //              email:registeredUser.email};
    //     // let token = jwt.sign(payload,'secretKey');
    //     // res.status(200).send({token});
    //     res.status(200).send();
    // }
    // })
})

App.post('/login', function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    let associateData = req.body;
    console.log(associateData.email);
    associates.findOne({email:associateData.email})
    .exec( function (err, item) {
        

        if (err) {
            console.log(err);
            res.send();
        }
            if (!item) {
                console.log('no user');                
                          
                res.status(401).json({message:"Email does not exist"});
               
            } else {
                // const validPassword = item.comparePassword(item.password);
                // console.log(validPassword)
            // if (item.password !== associateData.password)
            let validation =  bcrypt.compareSync(associateData.password,item.password);
            console.log(validation);
            if(validation==false) 
    
            {
                console.log("Incorrect password");
                
                res.status(401).json({message:"Incorrect Password"});
                
            }else{
                console.log("Match");
                let payload = {username:item.username,
                               email:item.email};
                let token= jwt.sign(payload,'secretKey');
                res.status(200).send({token});
               
            }
                    
            }
        })    
})

App.post('/adm-login', function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    let adminData = req.body;
    console.log(adminData);
    
            if (adminData.username!=="admin") {
                console.log('incorrect usrname');                
                          
                res.status(401).json({message:"Username is incorrect"});
               
            } else {
                // const validPassword = item.comparePassword(item.password);
                // console.log(validPassword)
            if (adminData.password!=="12345") 
    
            {
                console.log("Incorrect password");
                
                res.status(401).json({message:"Incorrect Password"});
                
            }else{
                console.log("Match");
                let payload = {username:adminData.username};
                let token= jwt.sign(payload,'secretKey');
                res.status(200).send({token});
               
            }
                    
            }
        })    

App.get("/associates" , verifyAdminToken, function(req,res){
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
     associates.find()
       .then(function(associate){
        res.send(associate);
      })
})

App.get("/associate/:id" ,verifyAdminToken, function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    const id = req.params.id;
    console.log(id);
    associates.findOne({"_id":id})
      .then(function(associate){
       res.send(associate);
     })
})

App.put("/edit-associate" ,verifyAdminToken, function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    console.log(req.body);
    // var id=req.body._id;
    // var username=req.body.username;
    // var email=req.body.email;
    // var password=req.body.password;
    
    // associates.findByIdAndUpdate(id,
    //                        {$set:{
    //                          "password":password
    //                          }})
    // .then(function(){
    //     res.send();
    // })      

    bcrypt.hash(req.body.password,10,function(err,hash){
        if(err){
            res.status(400).json({
                msg:"Something went wrong",results:err
            });
        }else{
            var id=req.body._id;
            var username=req.body.username;
            var email=req.body.email;
             var password=hash;
             associates.findByIdAndUpdate(id,
                {$set:{
                  "password":password
                  }})
                 .then(function(){
                    res.send();
    })  
    
}

})
})


App.post("/del-associate",verifyAdminToken, function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    
    
    console.log(req.body.id);
    let id = req.body.id;
    // associates.findByIdAndDelete(req.params.id)
    // .then(()=>{
    //     console.log("Success");})

    associates.deleteOne({"email":id})
    .then(()=>{console.log("Success");})

    bookings.deleteMany({"associateEmail":id})
        .then((err,data)=>{
            if(err)
            console.log(err)
        });   console.log("Success");  
        
        res.send();
    
})


App.route("/users")
.post((req,res)=>{
    res.header("Access-Contol-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    var user ={
        username: req.body.name,
        email:req.body.email,
        password:req.body.password
    }
    var user = new associates(user);
    user.save((err,data)=>{
    if(err)
    console.log(err)
    else
    console.log(data)
    });
})

// App.route("/book-hall")
App.post("/book-hall",verifyToken,(req,res)=>{
    res.header("Access-Contol-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    console.log(req.username);
    console.log(req.email);
    
    var booking ={
        associateName: req.username,
        associateEmail:req.email,
        hallName:req.body.item.hallName,
        Date:req.body.item.Date,
        fromTime:req.body.item.fromTime,
        toTime:req.body.item.toTime
    }
    
// booking.fromTime= booking.fromTime;
    var booking = new bookings(booking);
    booking.save((err,data)=>{
    if(err)
    console.log(err)
    else
    console.log(data)
    });
})

// App.route("/checkslot")
App.post("/checkslot", verifyToken, (req,res)=>{
    res.header("Access-Contol-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
     
    var  date ={
        associateName: req.username,
        associateEmail:req.email,
        hallName:req.body.item.hallname, //hallname
        Date:req.body.item.date,
        fromTime:req.body.item.fromtime,  //fromtime
        toTime:req.body.item.totime  //totime
    }
    ////

    let day =date.Date.split('T')[0];
    date.fromTime=day+"T"+date.fromTime+":00"
    date.toTime=day+"T"+date.toTime+":00"
    ///

        bookings.find({"hallName":date.hallName,"fromTime":{$lt: (date.toTime)},"toTime":{$gt: (date.fromTime)}},(err,data)=>{
       if(err)
        console.log(err)
        else
        {
            if(data.length!==0)
            {
                var msg = "slotunavailable";
                 res.status(200).send(false);
            }
            else
            {
                console.log("available")
                res.status(200).send(date);}

        }

    })
});

// App.route("/getbookingdetails")
App.get("/getbookingdetail", verifyToken, (req,res)=>{
    res.header("Access-Contol-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
var email = req.email;
bookings.find({"associateEmail":email},(err,data)=>{
    if(err)
    console.log(err)
    else
    {
        res.send(data)
    }
})
})

App.post("/getbookingdetail", verifyToken, (req,res)=>{
    res.header("Access-Contol-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
var email = req.email;
bookings.find({"associateEmail":email},(err,data)=>{
    if(err)
    console.log(err)
    else
    {
        res.send(data)
    }
})
})

App.get("/getbookingdetails", verifyAdminToken, (req,res)=>{
    res.header("Access-Contol-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    var email = req.email;
    bookings.find({})
    .then(data=>{
        res.send(data);
    })
});
    // bookings.find({"associateName":uname})
    // .then(data=>{
    //     res.send(data);
    // })
//     bookings.find({"associateEmail":email},(err,data)=>{
//         if(err)
//         console.log(err)
//         else
//         {
//             res.send(data)
//         }
//     })
// });

App.route("/deletebooking")
.post(verifyToken, (req,res)=>{
    res.header("Access-Contol-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    console.log(req.body)
    let id = req.body.id;
    bookings.deleteOne({"_id":id})
    .then((err,data)=>{
        if(err)
        console.log(err)
    });
    console.log("Success")
});

App.route("/delbooking")
.post(verifyAdminToken, (req,res)=>{
    res.header("Access-Contol-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    console.log(req.body)
    let id = req.body.id;
    bookings.deleteOne({"_id":id})
    .then((err,data)=>{
        if(err)
        console.log(err)
    });
    console.log("Success")
});

App.get("/currentbookings", verifyToken,(req,res)=>{
    res.header("Access-Contol-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

    let todayDate = new Date();
    let afterDate = new Date();
    afterDate.setDate(afterDate.getDate() + 7);
    todayDate.setDate(todayDate.getDate() - 1);
    console.log(todayDate);
    console.log(afterDate);

    bookings.aggregate([
        {
            "$match":
                {   
                    "associateEmail": req.email,
                    "Date":
                        {
                            "$lte": afterDate,
                            "$gte": todayDate
                        }
                }
        }
    ],function(err, docs) {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log("Successful loaded data");
            res.send(docs);
        }
    }) 

})

App.route("/getbookingitem/:id")
.get(verifyAdminToken,(req,res)=>{
    res.header("Access-Contol-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    let id = req.params.id
    bookings.findById({"_id":id})
    .then(data=>{
        res.send(data);
    })
});

App.route("/admcheckslot")
        .post(verifyAdminToken,(req,res)=>{
            res.header("Access-Contol-Allow-Origin","*");
            res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
            var  date ={
                associateName: req.body.item.associateName,
                associateEmail:req.body.item.associateEmail,
                hallName:req.body.item.hallname,
                Date:req.body.item.DATE,
                fromTime:req.body.item.fromTime,
                toTime:req.body.item.toTime,
                _id:req.body.item._id
            }
            ////
        console.log(date)
            let day =date.Date.split('T')[0];
            date.fromTime=day+"T"+date.fromTime+":00"
            date.toTime=day+"T"+date.toTime+":00"
            ///
        
                bookings.find(
                    {"_id":{$ne:(date._id)},"hallName":date.hallName,"fromTime":{$lt: (date.toTime)},"toTime":{$gt: (date.fromTime)}},(err,data)=>{
               if(err)
                console.log(err)
                else
                {
                    if(data.length!==0)
                    {
                        var msg = "slotunavailable";
                         res.status(200).send(false);
                    }
                    else
                    {
                        console.log("available")
                        res.status(200).send(date);}
        
                }
        
            })
        });


 App.route("/admbooking")
   .post(verifyAdminToken,(req,res)=>{
            res.header("Access-Contol-Allow-Origin","*");
            res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
            let id = req.body.item._id;
            var booking ={
                associateName: req.body.username,
                associateEmail:req.body.email,
                hallName:req.body.item.hallName,
                Date:req.body.item.Date,
                fromTime:req.body.item.fromTime,
                toTime:req.body.item.toTime,
            
            }

        bookings.findByIdAndUpdate({"_id":id},{$set:booking},(err,data)=>{
        if(err)
        console.log(err)
        else
        res.send(data);
        })
        })


App.listen(port,(err)=>{
    if(err)
    console.log(err)
    else
    console.log("Server connected on port "+port)
});