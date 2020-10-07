const router = require('express').Router();
const QcloudSms = require('qcloudsms_js');
const { formatData } = require("../utils/tools");

const cfg = {
  appid: 1400430803, // SDK AppID 以1400开头
  appkey: '84fad55ca395d550f566643e7705ebeb', // 短信应用 SDK AppKey
  templateId: 729283, // 短信模板 ID，需要在短信控制台中申请
  smsSign: 'ihuanu网', // NOTE: 签名参数使用的是`签名内容`，而不是`签名ID`。这里的签名"腾讯云"只是示例，真实的签名需要在短信控制台申请
}



// 生成手机验证码
router.get("/", async (req, res) => {
  //生成6位随机数
  let randomNum = () => { return Math.floor(Math.random() * 10) };
  const vcode = "" + randomNum() + randomNum() + randomNum() + randomNum() + randomNum() + randomNum();
  //发送到指定的手机号码
  const {phone} = req.query;
  // 生成手机验证码：腾讯云
  // 简单封装一下, 向指定手机下发验证码
  // sendCode('13711037905', 1234) // 发送短信
  // time 的单位是分钟
  function sendCode(phone, time = 10) {
    phone = typeof (phone) === 'object' ? phone : [phone]
    const qcloudsms = QcloudSms(cfg.appid, cfg.appkey) // 实例化 QcloudSms
    const msender = qcloudsms.SmsMultiSender()
    msender.sendWithParam(86,
      phone, // 一个数组
      cfg.templateId, // 模版 id
      [vcode, time], // 正文中的参数值
      cfg.smsSign, // 签名 未提供或者为空时，会使用默认签名发送短信
      '', '',
      (err, res, resData) => { // 回调函数
        err && console.log('err: ', err)
        // console.log('request data: ', res.req)
        // console.log('response data: ', resData)
      })
  }

  // 把验证码存入会话Session
  req.session.vnum = vcode;
//console.log(vcode)
  //发送验证码

  sendCode(phone);
  res.send(formatData());
});

module.exports = router