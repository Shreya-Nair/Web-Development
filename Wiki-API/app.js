
const express = require("express");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/WikiDB",{useNewUrlParser:true,useFindAndModify: false,useUnifiedTopology:true});
const articleSchema={
    title:String,
    content:String
};
const Article=mongoose.model("Article",articleSchema);
app.route("/articles")

.get(function(req,res)
{
   
    Article.find({},function(err,foundItems)
    {
        if(!err)
        {
            res.send(foundItems); 
        }else
        {
            res.send(err);
        }
          
    })
})

.post(function(req,res)
{
    
    const newArticle=new Article({
        title:req.body.title,
        content:req.body.content
    });
    newArticle.save(function(err)
    {
        if(!err)
        {
            res.send("Added article");

        }
        else
        {
            res.send(err);
        }
    });
})

.delete(function(req,res)
{
    Article.deleteMany({},function(err)
    {
         if(!err)
         {
             res.send("Deleted");
         }
         else
         {
             res.send(err);
         }
    });
});


app.route("/articles/:articleTitle")
.get(function(req,res)
{
   const articleName=req.params.articleTitle;
   Article.findOne({title:articleName},function(err,foundArticle)
   {
       if(foundArticle)
       {
           res.send(foundArticle);
       }
       else
       {
           res.send("No article found");
       }

   });
})

.put(function(req,res)
{
     Article.update
     ({title:req.params.articleTitle},{title:req.body.title,content:req.body.content},{overwrite:true},function(err)
     {
         if (!err)
         {
             res.send("updated");
         }
         else
         {
             res.send(err);
         }
     });
})
.patch(function(req,res)
{
    Article.update
     ({title:req.params.articleTitle},{$set:req.body},function(err)
     {
         if (!err)
         {
             res.send("updated");
         }
         else
         {
             res.send(err);
         }
     });
})
.delete(function(req,res)
{
   Article.deleteOne({title:req.params.articleTitle},function(err)
   {
       if(!err)
       {
           res.send("Deleted record");
       }
       else
       {
           res.send(err);
       }
   })
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});