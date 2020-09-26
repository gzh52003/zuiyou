let manageType = localStorage.getItem("manageType");
let manageName = localStorage.getItem("manageName");
let authorization = localStorage.getItem("authorization");
let code = localStorage.getItem("code");
const initState = {
  code: "",
  manageType,
  authorization,
  manageName,
  code,
};
export default function reducer(state = initState, action) {
  switch (action.type) {
    case "manage":
      return {
        ...state,
        ...action.manage,
      };
    default:
      return state;
  }
}
