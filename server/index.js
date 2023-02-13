const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require('./db/User');
const Product = require('./db/Product'); 
const app = express();


//The express.json() function is a built-in middleware function in Express. 
//It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());
app.use(cors());

app.post('/register', async(req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  res.send(result);
})
//api for checking login data is with in the data base or not 
app.post('/login',async (req,res)=>{
  if (req.body.password && req.body.email){
  let user = await User.findOne(req.body).select("-password");
  if(user)
    res.send(user);
  else 
    res.send({result:"Data not found"})
  }
  else
  res.send({result:"Data not found"})

})

app.post('/add-product',async (req,res)=>{
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);

})

app.get('/products',async (req,res)=>{
  let product = await Product.find();
  if(product.length>0){
    res.send(product);
  }
  else{
    res.send({result:"No Product found"});
  }

})
// api for deleting products using id
app.delete('/product/:id',async (req,res)=>{
    let result = await Product.deleteOne({_id:req.params.id});
    res.send(result);
})

app.get('/product/:id',async (req,res)=>{
    let result = await Product.findOne({_id:req.params.id})
    if(result){
     res.send(result);
    }
    else{
      res.send({result:"No record found"});
    }
})
app.put("/product/:id", async (req, resp) => {
  let result = await Product.updateOne(
      { _id: req.params.id },
      { $set: req.body }
  )
  resp.send(result)
});

app.get('/search/:key',async (req,res)=>{
  let result = await Product.find({
    '$or':[
      {
        name: { $regex: req.params.key }  
    },
    {
        company: { $regex: req.params.key }
    },
    {
        category: { $regex: req.params.key }
    }
    ]
  }); 
  res.send(result);

})


app.listen(5000);