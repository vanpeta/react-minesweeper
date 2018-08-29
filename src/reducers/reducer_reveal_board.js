export default function(state = false, action) {
  switch (action.type) {
    case "REVEAL_BOARD":
      return action.payload;
    default:
  }
  return state;
}
