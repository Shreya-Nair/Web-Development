const express = require("express");
const app=express();
const mongoose=require('mongoose');
const _=require("lodash");
require('dotenv').config();
mongoose.set('useUnifiedTopology', true);
const mongourl=process.env.MONGOURI;
// console.log(mongourl);
mongoose.connect(mongourl,{useNewUrlParser:true,useFindAndModify: false});
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
// let items=["Buy food","Cook food","Eat food"];
// let workItems=[];

const itemsSchema={
    name:String
}
const Item=mongoose.model("item",itemsSchema);
const item1= new Item( {
     name:"Welcome to to-do list"
});
const item2= new Item( {
    name:"Click on plus button to add new item"
});
const item3= new Item( {
    name:"<--Hit this to delete item"
});
const defaultItems=[item1,item2,item3];
const listSchema={
    name:String,
    items:[itemsSchema]
};
const List=mongoose.model("list",listSchema);

app.get("/",function(req,res)
{
    Item.find({},function(err,foundItems)
    {
        if(foundItems.length===0)
        {
            Item.insertMany(defaultItems,function(err)
            {
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    console.log("Successfully entered!");
                }
                
            });
            res.redirect("/");
        }
        else
        {
            res.render("list",{listTitle:"Today",nextListItem:foundItems});
        }
       
    });
   
    
});
app.get("/:customListName",function(req,res){
   const customListName=_.capitalize(req.params.customListName);
   const listNameFound=List.findOne({name:customListName},function(err,found)
   {
       if(!err)
       {
           if(found)
           {
              res.render("list",{listTitle:customListName,nextListItem:found.items});
             
           }
           else
           {
                const list=new List({
                    name:customListName,
                    items: defaultItems
                });
                list.save();
           }
       }
   })
  
});
app.post("/",function(req,res){
     let itemName=req.body.nextItem;
     const listName=req.body.list;
     const item=new Item({
        name:itemName
     });
     if(listName==="Today")
     {
        item.save();
        res.redirect("/");
     }
     else
     {
        List.findOne({name:listName},function(err,returnedobj)
        {
            returnedobj.items.push(item);
            returnedobj.save();
            res.redirect("/"+listName);
        });
     }
    
     
});
app.post("/delete",function(req,res)
{
   const checkedItemId=req.body.checkbox;
   const listName=req.body.listName;
   if(listName==="Today")
   {
    Item.findByIdAndRemove(checkedItemId.trim(),function(err)
    {
         if(err)
         {
             console.log(err);
         }
         else
         {
             console.log("Successively deleted item");
         }
    });
    res.redirect("/");
   }
   else
   {
        List.findOneAndUpdate({name:listName},{$pull:{items:{_id:checkedItemId}}},function(err,foundlist)
        {
            if(!err)
            {
                res.redirect("/"+listName);
            }
            else
            {
                console.log(err);
            }
        });
   }
  
   
});
let port = process.env.PORT;


app.listen(port);
