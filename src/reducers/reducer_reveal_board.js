export default function(state = false, action) {
  switch (action.type) {
    case "REVEAL_BOARD":
      console.log("reducer revealing", action.payload);
      return action.payload;
    default:
  }
  return state;
}
