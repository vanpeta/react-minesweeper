export default function (state = false, action) {
	switch (action.type) {
		case "START":
			return !action.payload;
		default:
	}
	return state
}