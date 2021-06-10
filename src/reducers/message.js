const messageReducerDefaultState = {};

export default function (state = messageReducerDefaultState, action) {
    const {type, payload} = action;

    switch (type) {
        case "SET_MESSAGE":
          return { message: payload };
    
        case "CLEAR_MESSAGE":
          return { message: "" };
    
        default:
          return state;
      }

}