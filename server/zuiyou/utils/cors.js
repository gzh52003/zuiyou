const allow_origin = ['http://42.194.179.50',' http://ihuanu.cn',' http://www.ihuanu.cn','http://10.3.138.19:8080','http://localhost:3000','http://localhost:3001']
// let curOrigin = http://10.3.138.33:8080

function cors(req,res,next){
    // 获取请求者的域名
     let allower = req.get('origin')?req.get('origin'):req.get('host');

    allow_origin.some(item=>{
      
        item.includes(allower)
    })

    if(allow_origin.some(item=>item.includes(allower)))
	{
        res.set({
            "Access-Control-Allow-Origin":allower,
            "Access-Control-Allow-Headers":"Content-Type,Content-Length, Authorization, Accept,X-Requested-With",
            "Access-Control-Allow-Methods":"PUT,POST,GET,PATCH,DELETE,OPTIONS",
            "Access-Control-Allow-Credentials":true,
            "Set-cookie":"key=value;SameSite:None;Secure:true"
        })
        // 跨域请求CORS中的预请求
        if(req.method=="OPTIONS") {
            res.sendStatus(200);/*让options请求快速返回*/
        } else{
            next();
        }
    }else{
        res.send('401');
    }

}

module.exports = cors;