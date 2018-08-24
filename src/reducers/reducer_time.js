export default function(state = "", action) {
  switch (action.type) {
		case "SHARE_TIME":
      return action.payload;
    default:
  }
  return state;
}
