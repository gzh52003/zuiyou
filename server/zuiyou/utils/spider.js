const puppeteer = require("puppeteer-core");
const mongo = require("./mongo");
//find_chrome模块来源于GoogleChromeLabs的Carlo,可以查看本机安装Chrome目录

const findChrome = require("../node_modules/carlo/lib/find_chrome");

(async () => {
  let findChromePath = await findChrome({});
  let executablePath = findChromePath.executablePath;
  const browser = await puppeteer.launch({
    executablePath,
    headless: false,
    devtools: true,
    showMo: 300,
    args: ["--disable-web-security"],
  });
  async function getInfo(url) {
    var evalVar = 111;
    const page = await browser.newPage();
    try {
      await page.goto(url, { waitUntil: "networkidle0" });
      await page.setDefaultTimeout(3000);
      await page.waitForSelector(".productBox");
      const goods = page.$$eval(".productBox", (el) => {
        let info = { imgArr: [], infos: {} };
        for (let i = 0; i < el.length; i++) {
          const detail = el[i].children[1].querySelector(".book-classif")
            .children;
          for (let j = 0; j < 4; j++) {
            switch (j) {
              case 0:
                let pic = el[i].children[0]
                  .querySelector("img")
                  .getAttribute("src");
                  if(pic.split("/")[7]==="fa"){
                    info.infos["img"] = "../images/szbook/fa.jpg";
                  }else{
                    info.infos["img"] = "../images/szbook/"+pic.split("/")[7];
                  }
                // 获取图片http网站，goto- > 截图保存到本地 （命名 goods+imgName）
                info.imgArr.push(pic);
                break;
              case 1:
                info.infos["bookName"] = el[i].children[1].querySelector(
                  ".title"
                ).innerHTML;
                info.infos["desc"] = el[i].children[1].querySelector(
                  ".title-desc"
                ).innerHTML;

                info.infos["author"] = detail[0].children[1].textContent;
                info.infos["public"] = detail[1].children[1].textContent;
                info.infos["isbn"] = detail[2].children[1].textContent;
                info.infos["time"] = detail[3].children[1].textContent;
                break;
              case 2:
                info.infos["line_price"] = el[i].children[1].querySelector(
                  ".price-box"
                ).children[1].textContent;
                info.infos["price"] = el[i].children[1].querySelector(
                  ".price-box"
                ).children[2].textContent;
              case 3:
                info.infos["num"] = el[i].children[1].querySelector(
                  ".count-box .number"
                ).textContent;
            }
          }


          return JSON.stringify(info);
        }
      });
      evalVar = await page.evaluate(async function (evalVar) {
        if (document.querySelector(".productBox img").complete) return 222;
      }, evalVar);
      if (evalVar === 222) {
        await page.waitFor(1000)
        await page.close();
      }
      return goods;
    } catch {
      await page.close();
    }
  }
  var res;
  var imgArr = [];
  for (let i = 2; i < 288; i++) {
    try {
      res = await getInfo("https://www.szbookmall.com/detail/" + i);
      res = JSON.parse(res);
      /*info 对象--- 数据库*/
      res.infos.on_line = true;
      console.log(res.infos);
      if(res.imgArr.length>0){
        await mongo.insert("goods",res.infos)
      }
      imgArr.push(res.imgArr[0]);
    } catch {
      console.log("noneinfo");
    }
    console.log(imgArr);
  }
  //截图
  async function getPic(url,urlimg) {

    var evalVar = 111;
    const page = await browser.newPage();
    await page.setViewport({
      width: 1366,
      height: 768,
    });
    await page.goto(url, { waitUntil: "networkidle0" });
    await page.setDefaultTimeout(3000);
    await page.waitFor(1000);
    try {
      //获取页面Dom对象form
      let form = await page.$("img");
      //调用页面内Dom对象的screenshot 方法进行截图
      form.screenshot({
        path: `C:/项目/images/szbook/${urlimg}`,
      });
      await page.waitFor(2000);
    } catch (e) {
      console.log("执行异常" + e);
    }
    evalVar = await page.evaluate(async function (evalVar) {
      if (document.querySelector("img").complete) return 222;
    }, evalVar);
    if (evalVar === 222) {
      await page.close();
    }
  }


let urlimg;
// const picList = imgArr.filter(cur=>{
//   return !cur.includes('fa');
// })
const picList = [...new Set(imgArr)];
  for (let i = 0; i < picList.length; i++) {
    urlimg =String(picList[i]).split("/")[7];    
    console.log(urlimg)
    if(urlimg==="fa"){
      await getPic(picList[i],'fa.jpg');
    }else{
      await getPic(picList[i],urlimg);
    }
  }
  await browser.close();
})();
