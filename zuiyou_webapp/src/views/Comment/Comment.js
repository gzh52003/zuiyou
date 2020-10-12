import React, { useContext, useState, useRef } from "react";
import { Icon, SearchBar, ImagePicker, Toast ,Progress} from "antd-mobile";
import { GlobalContext } from "../../store";
import {
  uploadImg,
  invitateFromEnder,
  getDate,
  put,
  invitateToEnder,
} from "../../utils/axios";
import "../../scss/comment.scss";
export default function Comment() {
  const { state, dispatch } = useContext(GlobalContext);
  const [filesList, changFilesList] = useState([]);
  const [context, changeContext] = useState("");
  let [imgMes, changeimgMes] = useState(""); //图片内容
  return (
    <>
      <div className="comment" style={{left:state.showComment?0:'100vw'}}>
        <div className="showner-box">
          <Icon type="cross" size="md" className="cancel" onClick={() => {dispatch({type:'noshowComment'})}} />
          <h3>最右</h3>
          <Icon type="ellipsis" size="md" className="more" onClick={() => {}} />
        </div>
        <div className="content">
          <div
            className="imgPicker-box"
            style={{ display: filesList.length > 0 ? "block" : "none" }}
          >
            <ImagePicker
              className="imgPicker"
              files={filesList}
              onChange={(file) => {
                changFilesList(file);
                //选择文件并上传
                let formData = new FormData();
                for (let i = 0; i < file.length; i++) {
                  formData.append("photos", file[i].file);
                }
                changeimgMes(formData);
              }}
              selectable={true}
              multiple={true}
            />
          </div>
        </div>
        <div className="other-content">
          <i className="iconfont icon-yuyin"></i>
          <SearchBar
            className="input"
            placeholder="写个评论吧"
            cancelText="发送"
            value={context}
            onChange={(e) => {
              changeContext(e);
            }}
            onCancel={async () => {
              if (!context) {
                Toast.fail("最右：还没有输入评论", 1);
              } else {
                changeContext("");
                let user_id = localStorage.getItem("user_id");
                let publicTime = getDate();

                if (filesList.length <= 0) {
                //评论内容存到数据库comment集合
                  let payload = {
                    user_id, //评论用户的id
                    invitateId: "5f82ea04e080261518504511", //评论帖子的id
                    content: {
                      context,
                      imgMes,
                    }, //评论的内容
                    publicTime,
                    audit: "false",
                    favor: 0,
                  };

                  invitateToEnder(payload, "/comment");

                }else{
                  uploadImg(
                    imgMes,
                    (progressEvent) => {
                      // 上传进度
                      let percent = progressEvent.loaded / progressEvent.total;
                      dispatch({ type: "percent", value: percent * 100 });
                    },
                    async (res) => {
                      let publicTime = getDate();
                      let user_id = localStorage.getItem("user_id");
                      changFilesList([]);
                      console.log(res.data.data.uploadUrl);
                      //评论内容存到数据库comment集合
                      let payload = {
                        user_id, //评论用户的id
                        invitateId: "5f82ea04e080261518504511", //评论帖子的id
                        content: {
                          context,
                          imgMes: res.data.data.uploadUrl,
                        }, //评论的内容
                        publicTime,
                        audit: "false",
                        favor: 0,
                      };
  
                      invitateToEnder(payload, "/comment");
                    }
                  );
                }
                 //获取帖子用户的commentId数组
                 const commentIdRes = await invitateFromEnder({
                  invitateId: "5f82ea04e080261518504511",
                });
                var commentIdArr = commentIdRes.data.data[0].commentId;
                commentIdArr.unshift(user_id);
                //修改帖子用户的帖子信息
                put({
                  commentId: commentIdArr,
                  _id: "5f82ea04e080261518504511",
                });
              }
            }}
          />
          <i
            className="iconfont icon-tupian"
            onClick={() => {
              let imgpicker = document.querySelector(".am-image-picker input");
              imgpicker.click();
            }}
          ></i>

          <i className="iconfont icon-zhuanfa"></i>
        </div>
      <div className="progress" style={{display:state.percent===0||state.percent===100?"none":"block"}}>
           <Progress percent={state.percent}  position="normal" />
           <span>内容正在发布中...</span>
      </div>
      </div>
    </>
  );
}
