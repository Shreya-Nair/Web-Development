const express=require("express");
const request=require('request');
const app=express();
require('dotenv').config();
const mailchimp = require("@mailchimp/mailchimp_marketing");
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

mailchimp.setConfig({
    
     apiKey: process.env.API_KEY,
     server: process.env.SERVER
    });

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res)
{
    const fName=req.body.firstname;
    const lName=req.body.lastname;
    const Email=req.body.email;

    const data={
     firstName:fName,
     lastName:lName,
     email:Email
        
     }
     async function run() 
     {
        const response = await mailchimp.lists.addListMember(process.env.AUDIENCE_ID, {
         email_address: data.email,
         status: "subscribed",
         merge_fields: {
         FNAME: data.firstName,
         LNAME: data.lastName
        }
      });
   }

        res.sendFile(__dirname + "/success.html");
        run().catch(e => res.sendFile(__dirname + "/failure.html"));

});
app.listen("3000",function(){
    console.log("Server started on port 3000");
})

