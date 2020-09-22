const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require("fs");

const mongo = require('../utils/mongo');
const { formatData, md5 } = require('../utils/tools')

// 配置上传参数
let storage = multer.diskStorage({

    // 上传文件保存目录，无则自动创建
    destination: path.join(__dirname, '../../images/szbook/'),

    // 格式化文件名：字段名+时间戳+扩展名
    // avatar-1597202347355.jpg
    filename: function (req, file, cb) {
        // 获取文件后缀名
        let ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + ext);
    }
})

// 设置中间件
const uploadMiddleware = multer({ storage });

// post /api/upload/avatar

// router.post("/singleimg",(req,res)=>{
//     res.send(formatData({ code: 1}))
// })

router.post('/singleimg', uploadMiddleware.single('goodsImg'), (req, res) => {
    // 中间件会把图片信息格式化到req.file,req.files
    // console.log("到这里了");
     console.log('file=', req.file, req.body._id);
    	const { _id } = req.body;
    // console.log("req="+req)
    // 更新用户信息
    const uploadUrl =  '../images/szbook/'+req.file.filename
    // mongo.update('goods', { _id }, { $set: { avatarUrl } })
    res.send(formatData({ data: { _id, uploadUrl } }));
})

router.delete('/rmimg', (req, res) => {
    const rm_url = req.query.rm_url.slice(2);
    // console.log("url=>>" + rm_url);
    fs.unlinkSync(`C:/项目${rm_url}`, function (error) {
        if (error) {
            // console.log(error);
            res.send(formatData({code:0,msg:'false'}));
            // return false;
        }else{
            res.send(formatData());
        }
    })
    res.send(formatData({ data: rm_url }));
})
// 一次性最多传1张图片
router.post('/goods', uploadMiddleware.array('goods', 3), (req, res) => {
})

module.exports = router;