require('dotenv').config()

const AWS=require("aws-sdk")
AWS.config.update({
    region:'us-east-1'
})


const dynamoDB = new AWS.DynamoDB.DocumentClient();

const storeValue=async (req,res)=>{
    console.log("Request body:", req.body)
    const data=req.body
     const params = {
    TableName: "TaskTable",   // replace with your DynamoDB table
    Item: {
      id: Date.now().toString(),
      ...data                     // store all fields from frontend
         }
    };

     try{
        await dynamoDB.put(params).promise();
        res.json({ message: "Data stored in DynamoDB successfully!" });
        } catch (err) {
        console.error("Error saving:", err);
         res.status(500).json({ error: "Could not save data" });
        }
}

const defaultResponse=(req,res)=>{
    res.send({message:"Hello World"})
}

module.exports={storeValue,defaultResponse}