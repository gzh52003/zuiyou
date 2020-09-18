const initState = {
  username: "",
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        username: action.username,
      };

    default:
      return state;
  }
}
