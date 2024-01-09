const mongose=require('mongoose');
mongose.connect('mongodb://127.0.0.1:27017/db')

const Schema=new mongose.Schema({
    user_Id:String,
   
    Name:String,
    Father_Name:String,
    Number:Number,
    Password:String,
    email:String,
    class:Number
    
    
})
 module.exports=mongose.model('student',Schema);