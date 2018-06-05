import displayMessage from './displayMessage';

export default function(prevState, nextState, autoDisplayMessage=true) {
  if(!prevState.result && nextState.result) {
    if(autoDisplayMessage) {
      displayMessage(nextState);
    }
    return true;
  }
  return false;
};
