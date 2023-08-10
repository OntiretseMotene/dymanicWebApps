
// Actions
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const RESET = 'RESET';

// Takes the current state action  as arguments and determines how to update the state with actions and uses "action payload" to make icrease/decrease
function reducer(state = 0, action) {
  switch (action.type) {
    case INCREMENT:
      return state + action.payload; 
    case DECREMENT:
      return state - action.payload;
    case RESET:
      return 0;
    default:
      return state;
  }
}

// Store holds state and manages state changes
function createStore(reducer) {
  let state = reducer(undefined, {}); // Initialize state with reducer's default value
  const subscribers = []; // Array holds the subscriptions
    console.log('State:', state); // Logs the state to the console

  // Dispatch function
  function dispatch(action) {
    state = reducer(state, action); // Update the state by calling the reducer with the current state and action
    subscribers.forEach((subscriber) => subscriber(state)); // Notify subscribers with the updated state
  }
  // Subscribe to state changes and log the changes to the console
  function subscribe(subscriber) {
    subscribers.push(subscriber); // Adds the subscriber to the array
  }
  const newStore = {    //New store object that represents the store interface and is returned as result of creatStore
    dispatch,
    subscribe,
  };
  return newStore
}

// Initialise the store to create the store instance
const STEP_AMOUNT = 1; 
const store = createStore(reducer);

// Subscribe to state changes and log them to the console
store.subscribe((state) => {
  console.log('State:', state);
});

// Dispatch actions and trigger the state changes in the console
store.dispatch({ type: INCREMENT, payload: STEP_AMOUNT });
store.dispatch({ type: INCREMENT, payload: STEP_AMOUNT });
store.dispatch({ type: DECREMENT, payload: STEP_AMOUNT });
store.dispatch({ type: RESET });