const initialState = "";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_FILTER":
      return action.payload;
    default:
      return state;
  }
};

export const updateFilter = (filter) => {
  return {
    type: "UPDATE_FILTER",
    payload: filter,
  };
};

export default reducer;
