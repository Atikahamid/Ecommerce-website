const express=require('express');
const cors =require("cors");
require('./db/config');
const User=require('./db/user');
const Product=require('./db/Product');
const app=express();

//jwt authentication

const Jwt=require('jsonwebtoken');
const jwtKey='e-comm';

app.use(express.json());
app.use(cors());

app.post('/signup',async(req,resp)=>{
    let user=new User(req.body);
    let result= await user.save();
    result=result.toObject();
    delete result.passwd;
    Jwt.sign({ result },jwtKey,{expiresIn: "2h"},(err,token)=>{
        if(err){
            resp.send({result: "something went wrong please try again"})
        }
        resp.send({result,auth:token})
    })
});
app.post('/login',async(req,resp)=>{
    console.log(req.body);
    if(req.body.passwd && req.body.email){
        let user=await User.findOne(req.body).select("-passwd");
        if(user){
            resp.send(user);
        }
        else{
            resp.send({result:"No user found"});
        }
    }else{
        resp.send({result:"No user found"});
    }
});

// app.post('/login',async(req,resp)=>{
//     console.log(req.body);
//     if(req.body.passwd && req.body.email){
//         let user=await User.findOne(req.body).select("-passwd");
//         if(user){
//             Jwt.sign({ user },jwtKey,{expiresIn: "2h"},(err,token)=>{
//                 if(err){
//                     resp.send({result: "something went wrong please try again"})
//                 }
//                 resp.send({user,auth:token})
//             })
//         }
//         else{
//             resp.send({result:"No user found"});
//         }
//     }else{
//         resp.send({result:"No user found"});
//     }
    
    
// });

//add product
app.post("/add-product",async(req,resp)=>{
    let product=new Product(req.body);
    let result= await product.save();
    resp.send(result);
});

app.get("/products",async(req,resp)=>{
    let products=await Product.find();
    if(products.length>0){
        resp.send(products)
    }else{
        resp.send({result:"no result found"});
    }
});

app.delete('/product/:id',async(req,resp)=>{
    let result=await Product.deleteOne({_id:req.params.id});
    resp.send(result);
});

app.get('/product/:id',async(req,resp)=>{
    let result=await Product.findOne({_id:req.params.id});
    if(result){
        resp.send(result)
    }else{
        resp.send({result:"No record found"})
    }
});

app.put('/product/:id',async(req,resp)=>{
    let result=await Product.updateOne(
        {_id:req.params.id},
        {
            $set:req.body
        }
    )
    resp.send(result)
});

//search api
app.get('/search/:key',async(req,resp)=>{
    let result=await Product.find({
        "$or":[
            {name:{$regex:req.params.key}},
            {company:{$regex:req.params.key}},
            {category:{$regex:req.params.key}}
        ]
    });
    resp.send(result)
});

app.listen(5000);