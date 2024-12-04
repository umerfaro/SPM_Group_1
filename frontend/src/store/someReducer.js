const initialState = {
    value: 0,
  };
  
  const someReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'increment':
        return { ...state, value: state.value + 1 };
      case 'decrement':
        return { ...state, value: state.value - 1 };
      default:
        return state;
    }
  };
  
  export default someReducer;
  