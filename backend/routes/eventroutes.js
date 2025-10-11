const express=require("express");
const router=express.Router();
const {storeValue,defaultResponse}=require("../controller/eventController.js")

router.get("/",defaultResponse);
router.post("/store",storeValue);

module.exports=router;
