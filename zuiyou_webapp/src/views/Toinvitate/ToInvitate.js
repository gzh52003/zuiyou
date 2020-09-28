import React, { useContext, useState, useRef } from "react";
import { withRouter } from "react-router-dom";
import { Icon, Button, Card, ImagePicker, Toast, Modal } from "antd-mobile";
import uploadMedia, { uploadImg } from "../../utils/axios";
import "antd-mobile/dist/antd-mobile.css";
import "../../scss/ToInvitateIndex.scss";
import "../../iconfont/iconfont.css";
import { GlobalContext } from "../../store";

function ToInvitate() {
  const alert = Modal.alert;
  //   console.log(GlobalContext);
  const { state, dispatch } = useContext(GlobalContext);
  const [filesList, changFilesList] = useState([]);
  const [videoInput, changeVideo] = useState("");
  const [objectUrl, changeObjectUrl] = useState("");
  const [showVideo, changeshowVideo] = useState("none");
  const [showInputVideo, changeshowInputVideo] = useState("block");
  let [mediaMes, changemediaMes] = useState(""); //视频内容
  let [imgMes, changeimgMes] = useState(""); //图片内容
  let [context, changeContext] = useState(""); //文字内容
  const player = useRef();
  const addMeia = useRef();
  function progress(progressEvent) {
    // 上传进度
    let percent = progressEvent.loaded / progressEvent.total;

    dispatch({ type: "percent", value: percent * 100 });
  }
  function uploadMediafinish(code) {
    if (code === 0) Toast.success("发布成功", 1);
    else if (code === 1) Toast.fail("发布失败", 1);
    dispatch({ type: "noshowInvitate" });
  }
  function getContext(e) {
    changeContext(e.target.value);
  }
  return (
    <div
      className="ToInvitate"
      style={{
        height: "100%",
        width: "100%",
        top: state.showInvitate ? "0%" : "100%",
      }}
    >
      <div className="showner-box">
        <Icon
          type="cross"
          size="md"
          className="cancel"
          onClick={() => {
            alert("Delete", "是否保留本次编辑", [
              {
                text: "不保留",
                onPress: () => {
                  changemediaMes("");
                  changeshowVideo("none");
                  changeshowInputVideo("block");
                  changeimgMes("");
                  changFilesList([]);
                  changeContext("");
                  dispatch({ type: "noshowInvitate" });
                },
              },
              {
                text: "保留",
                onPress: () => dispatch({ type: "noshowInvitate" }),
              },
            ]);
          }}
        />
        <Button
          className="publish"
          size="sm"
          type="primary"
          onClick={() => {
            console.log(mediaMes);
            if(!mediaMes&&!imgMes&&!context)
            {
              Toast.fail("请输入帖子内容", 1);
            }else{
              if (mediaMes) {
                uploadMedia(mediaMes, progress, uploadMediafinish);
                changemediaMes("");
                changeshowVideo("none");
                changeshowInputVideo("block");
              }
              if (imgMes) {
                uploadImg(imgMes, progress, uploadMediafinish);
                changeimgMes("");
                changFilesList([]);
              }
               if (context) {
                 console.log(context);
                }
                dispatch({ type: "noshowInvitate" });
            }
          }}
        >
          发布
        </Button>
      </div>
      <div className="chose-category">
        <span style={{ float: "left" }}>
          <i className="iconfont icon-jinghao"></i>选择话题
        </span>
        <span style={{ float: "right" }}>选择合适的话题会有更多赞哦~ &gt;</span>
      </div>
      <div className="content">
        <textarea
          placeholder="我的快乐源泉"
          value={context}
          onChange={getContext}
        />
      </div>
      {state.showAddPic ? (
        <div className="addPicture">
          <Card>
            <Card.Body style={{ width: "90%" }}>
              {/* <Progress percent={percent} position="normal" /> */}
              <ImagePicker
                files={filesList}
                onChange={(file) => {
                  console.log(file);
                  changFilesList(file);
                  // //选择文件并上传
                  let formData = new FormData();
                  for (let i = 0; i < file.length; i++) {
                    formData.append("photos", file[i].file);
                  }
                  changeimgMes(formData);
                }}
                // ref={(el) => {
                //   changeVideo(el);
                // }}
                selectable={true}
                multiple={true}
              />
            </Card.Body>
          </Card>
        </div>
      ) : (
        ""
      )}
      {state.showAddMedia ? (
        <div className="addVideo">
          <Card>
            <Card.Body style={{ width: "90%" }}>
              {/* <Progress percent={percent} position="normal" /> */}
              <video
                width="80%"
                height="80%"
                controls
                ref={player}
                style={{ display: showVideo, margin: "10px auto" }}
              >
                <source src={objectUrl} type="video/mp4" />
              </video>
              <div
                className="am-image-picker"
                ref={addMeia}
                style={{ display: showInputVideo }}
              >
                <div className="am-image-picker-list" role="group">
                  <div className="am-flexbox am-flexbox-align-center">
                    <div className="am-flexbox-item">
                      <div
                        className="am-image-picker-item am-image-picker-upload-btn"
                        role="button"
                        aria-label="Choose and add image"
                      >
                        <input
                          accept="video/*"
                          type="file"
                          name="videoInput"
                          onChange={() => {
                            changeshowVideo("block");
                            changeshowInputVideo("none");
                            //选择文件并上传
                            let file = videoInput.files[0];
                            let formData = new FormData();
                            formData.append("media", file);
                            changemediaMes(formData);

                            //文件视频预览
                            if (window.createObjectURL != undefined) {
                              // basic
                              player.current.srcObject = changeObjectUrl(
                                window.createObjectURL(file)
                              );
                            } else if (window.URL != undefined) {
                              // mozilla(firefox)
                              player.current.srcObject = changeObjectUrl(
                                window.URL.createObjectURL(file)
                              );
                            } else if (window.webkitURL != undefined) {
                              // webkit or chrome
                              player.current.srcObject = changeObjectUrl(
                                window.webkitURL.createObjectURL(file)
                              );
                            }
                            player.current.onloadedmetadata = function () {
                              // player.current.play();
                            };
                          }}
                          ref={(el) => {
                            changeVideo(el);
                          }}
                        />
                      </div>
                    </div>
                    <div className="am-flexbox-item"></div>
                    <div className="am-flexbox-item"></div>
                    <div className="am-flexbox-item"></div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      ) : (
        ""
      )}
      <div className="other-content">
        <div style={{ float: "left" }}>
          <i
            className="iconfont icon-tupian"
            onClick={() => {
              dispatch({ type: "showAddPic" });
              dispatch({ type: "noshowAddMedia" });
            }}
          ></i>
          <i
            className="iconfont icon-bofang"
            onClick={() => {
              dispatch({ type: "showAddMedia" });
              dispatch({ type: "noshowAddPic" });
            }}
          ></i>
          <i className="iconfont icon-yuyin"></i>
          <i className="iconfont icon-icon-"></i>
          <i className="iconfont icon-toupiao"></i>
        </div>
        <i className="iconfont icon-at" style={{ float: "right" }}></i>
      </div>
    </div>
  );
}
ToInvitate = withRouter(ToInvitate);
export default ToInvitate;
