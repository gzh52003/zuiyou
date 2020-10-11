import React, { useContext , useState , useRef } from "react";
import { Icon, SearchBar, ImagePicker } from "antd-mobile";
import { GlobalContext } from "../../store";
import "../../scss/comment.scss";
export default function Comment() {
  const {state,dispatch} = useContext(GlobalContext)
  const [filesList, changFilesList] = useState([]);
  return (
    <>
      <div className="comment">
        <div className="showner-box">
          <Icon type="cross" size="md" className="cancel" onClick={() => {}} />
          <h3>最右</h3>
          <Icon type="ellipsis" size="md" className="more" onClick={() => {}} />
        </div>
        <div className="content">
        <ImagePicker
                className="imgPicker"
                files={filesList}
                onChange={(file) => {
                  changFilesList(file);
                  // //选择文件并上传
                  let formData = new FormData();
                  for (let i = 0; i < file.length; i++) {
                    formData.append("photos", file[i].file);
                  }
                }}
                selectable={true}
                multiple={true}
              />
        </div>
        <div className="other-content">
          <i className="iconfont icon-yuyin"></i>
          <SearchBar className="input" placeholder="写个评论吧" cancelText="发送" />
          <i className="iconfont icon-tupian" onClick={()=>{

            let imgpicker=document.querySelector(".am-image-picker input")
            imgpicker.click()
            console.log(imgpicker)

          }}>
          </i>

          <i className="iconfont icon-zhuanfa"></i>
        </div>
      </div>
    </>
  );
}
