import axios from "axios";
const BASE_URL = "http://42.194.179.50/zyapi";
const source = axios.CancelToken.source();
function uploadMedia(payload, callback1, callback2) {
  axios({
    url: BASE_URL + "/upload/media",
    method: "post",
    onUploadProgress: function (ProgressEvent) {
      //原生获取上传进度的事件
      if (ProgressEvent.lengthComputable) {
        //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
        //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
        callback1(ProgressEvent);
      }
    },
    withCredentials: false,
    cancelToken: source.token,
    data: payload,
  }).then((res) => {
    callback2(res.data);
  });
}
export function uploadImg(payload, callback1, callback2) {
  axios({
    url: BASE_URL + "/upload/img",
    method: "post",
    onUploadProgress: function (ProgressEvent) {
      //原生获取上传进度的事件
      if (ProgressEvent.lengthComputable) {
        //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
        //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
        callback1(ProgressEvent);
      }
    },
    withCredentials: false,
    cancelToken: source.token,
    data: payload,
  }).then((res) => {
    callback2(res);
  });
}
export function invitateToEnder(payload,col) {
  axios({
    url: BASE_URL + col,
    method: "post",
    withCredentials: false,
    cancelToken: source.token,
    data: payload,
  });
}
export async function invitateFromEnder(payload = {}) {
  let req = "?";
  for (let i in payload) {
    req += `${i}=${payload[i]}&`;
  }
  console.log("req=", req);
  let result = await axios({
    url: BASE_URL + "/invitate" + req,
    method: "get",
    withCredentials: false,
    cancelToken: source.token,
    data: payload,
  });
  return result;
}
export function put(payload={}){
    axios({
        url:BASE_URL + '/invitate',
        method:'put',
        withCredentials:false,
        cancelToken:source.token,
        data:payload
    })
}
export  function getDate(){
  let da = new Date();
  da = new Date(da);
  let year = da.getFullYear();
  let month = da.getMonth() + 1;
  let date = da.getDate();
  let hh = da.getHours();
  let mm = da.getMinutes();
  let ss = da.getSeconds();
  da =
    [year, month, date].join("-") +
    " " +
    [hh, mm, ss].join(":");
  return da;
}
export default uploadMedia;
