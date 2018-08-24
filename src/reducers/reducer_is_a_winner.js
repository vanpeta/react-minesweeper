export default function(state = false, action) {
  switch (action.type) {
    case "IS_A_WINNER":
      return action.payload;
    default:
  }
  return state;
}