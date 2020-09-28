import React, {useState } from "react";
import { ImagePicker, Card } from "antd-mobile";
import Index from "./index";
import "antd-mobile/dist/antd-mobile.css";
import "../../scss/addPicture.scss";
import "../../iconfont/iconfont.css";

function AddPicture() {
  const [filesList, changFilesList] = useState([]);
  return (
    <Index>
      <div className="addPicture">
        <Card>
          <textarea placeholder="我的快乐源泉"/>
          <Card.Body style={{ width: "90%" }}>
            <ImagePicker
              files={filesList}
              onChange={(file) => {
                //    console.log(file)
                changFilesList(file);
              }}
              selectable={true}
              multiple={true}
            />

          </Card.Body>
        </Card>
      </div>
    </Index>
  );
}

export default AddPicture;
