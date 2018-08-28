const initialState = () => {
	if (localStorage.getItem("bestTimes")) {
		return (
			JSON.parse(localStorage.getItem("bestTimes"))
		);
	}
	return {small: [], medium: [], large: []};
}


export default function (state = initialState(), action) {
  switch (action.type) {
		case "UPDATE_BEST_TIMES":
			let bestTimes = initialState();
			let size = Object.keys(action.payload)[0]; 
			console.log("size", size);
			bestTimes[size] = action.payload[size];
			localStorage.setItem("bestTimes", JSON.stringify(bestTimes));
			return state;
    default:
  }
  return state;
}
