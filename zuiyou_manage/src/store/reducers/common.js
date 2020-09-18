const initState = {
  showMenu: true,
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case "show":
      return {
        ...state,
        showMenu: action.show,
      };
    default:
      return state;
  }
}
