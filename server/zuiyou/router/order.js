const express= require('express');
const crypto=require('crypto')
const router=express.Router();
const {add,remove,find,update,fuzzyFind,insert}=require('../utils/mongo');
const {formatData}=require('../utils/tools');
const { Logger } = require('mongodb');
//init接口，返回所有商品数据
console.log('order')
router.get('/',async(req,res)=>{
	try{
		// console.log(req.query)
	if(req.query.field&&req.query.contents)
	{	//fuzzyCheck
		// console.log(req.query)
		let {sort="add_time",page=2,size=2,field,contents}=req.query;
		sort=sort.split(',')
		const skip=(page-1)*size;
		const limit=size*1;
		//if(field==="_id")
		//contents=new ObjectId(contents)
		let result = await fuzzyFind("order",{[field]:contents},{skip,limit,sort});
		// console.log({[field]:contents})
		const allorder=(await fuzzyFind("order",{[field]:contents})).length;
		result.push({"orderNum":allorder});
		//console.log(result)
		res.send(JSON.stringify(formatData({data:result})))
	}else{//normalCheck
		const allorder = await (await find("order")).length;
		// console.log(allorder,4554)
		let {sort="add_time",page=2,size=2}=req.query;
		sort=sort.split(',')
		const skip=(page-1)*size;
		const limit=size*1;
		let result = await find("order",{},{skip,limit,sort});
		result.push({"orderNum":allorder});
		//console.log(result)
        res.send(JSON.stringify(formatData({data:result})))
	}

   
   
   } catch(e){
       console.log(e)
   }

})
router.get('/personal',async(req,res)=>{
	try{
		let {username,finished}=req.query;
		let result;
		if(finished){
			console.log(1)
			result = await find("order",{username,finished});
		}else{
			console.log(2)
			result = await find("order",{username});
		}
		//console.log(result)
        res.send(JSON.stringify(formatData({data:result})))
   } catch(e){
	   console.log(e)
       res.send(formatData({ code: 0 }));
   }

})
router.put('/personal',async(req,res)=>{
	try{
		let {_id}=req.body;
		let result = await update("order",{_id},{finished:"true"});
		//console.log(result)
        	res.send(JSON.stringify(formatData({data:result})))
   } catch(e){
       res.send(formatData({ code: 0 }));
   }

})
router.post('/',async (req,res)=>{
	const {
		add_time,
		address,
		goodsNum,
		phone,
		totalPrice,
		username,
		details,
		finished
		}=req.body;

	try{
		const obj={
			add_time,
			address,
			goodsNum,
			phone,
			totalPrice,
			username,
			details,
			finished
			}
			// console.log("obj",obj)
		await insert("order", obj)

		res.send(formatData())


	}catch(err){
		res.send(formatData({ code: 0 }));
	}
})
router.put('/',async (req,res)=>{
    const {_id:id,address,phone} = req.body;
    let newData = {address,phone}
    // console.log("进入put",id,address,phone);
    try{
        await update('order',{_id:id},newData);
        res.send(formatData({data:{_id:id,...newData}}))
    }catch(err){
        // console.log('err=',err);
        res.send(formatData({code:0}))
    }
})
router.delete('/:_id',async (req,res)=>{
    const {_id} = req.params;
    try{
        await remove('order',{_id:_id});
        res.send(formatData())
    }catch(err){
        res.send(formatData({code:0}))
    }
})
module.exports=router