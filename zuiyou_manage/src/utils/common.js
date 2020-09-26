import { get } from "./request";

export default async function checklocation(props) {
  let { push } = props;
  let authorization = window.localStorage.getItem("authorization");
  let manageType = window.localStorage.getItem("manageType");
  let manageName = window.localStorage.getItem("manageName");
  if (authorization && manageType && manageName) {
    const result = await get("/managelogin/angincheck", {
      manageName,
      manageType,
      authorization,
    }).then((res) => res);
    // console.log(result);
    console.log(result);
    if (result.code == 2000) {
      //   console.log(this.props);
      // if(manageType == )
      console.log("你他妈的进来了码");
      return result.code;
    } else {
      push("/login");
      window.localStorage.clear();
    }
  } else {
    push("/login");
    // console.log(this);
    window.localStorage.clear();
  }
}
