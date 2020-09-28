import axios from 'axios'
import { Toast, WhiteSpace, WingBlank, Button } from 'antd-mobile';
const BASE_URL="http://42.194.179.50/zyapi";
const source = axios.CancelToken.source();
function uploadMedia(payload,callback1,callback2){
    axios({
        url:BASE_URL + '/upload/media',
        method:'post',
        onUploadProgress:function(ProgressEvent){ //原生获取上传进度的事件
            if(ProgressEvent.lengthComputable){
                //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
                //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
                callback1(ProgressEvent);
            }
        },
        withCredentials:false,
        cancelToken:source.token,
        data:payload
    }).then(res =>{
        callback2(res.data);
    })
}
export function uploadImg(payload,callback1,callback2){
    axios({
        url:BASE_URL + '/upload/img',
        method:'post',
        onUploadProgress:function(ProgressEvent){ //原生获取上传进度的事件
            if(ProgressEvent.lengthComputable){
                //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
                //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
                callback1(ProgressEvent);
            }
        },
        withCredentials:false,
        cancelToken:source.token,
        data:payload
    }).then(res =>{
        callback2(res.code);
    })
}


export default uploadMedia;