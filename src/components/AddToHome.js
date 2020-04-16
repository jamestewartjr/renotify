import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';

const AddToHome = () => {
  // const [prompt, setPrompt] = useState(false);
  // let deferredEvent = 'e';
  // // useEffect(() => {
  // //   // // this will catch the beforeinstallprompt and prevents the native prompt from appearing
  // window.addEventListener('beforeinstallprompt', e => {
  //   e.preventDefault();
  //   console.log('service worker prompt', e)
  //   return deferredEvent = e;
  // });
  // }, []);

  const acceptChoice = ()=> {
    let deferredEvent = 'e';
    // useEffect(() => {
    //   // // this will catch the beforeinstallprompt and prevents the native prompt from appearing
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      console.log('service worker prompt', e)
      return deferredEvent = e;
    });
    deferredEvent.prompt();
    // Wait for the user to respond to the prompt
    deferredEvent.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredEvent = null;
      });
  }

  if (!prompt) {
    return '';
  }

  return (
    <Button
      className="AddToHome"
      onClick={() =>  acceptChoice()} /* fire the prompt on button click */
      variant="contained"
      color="primary"
    >
      {/* <svg viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"
        />
      </svg> */}
      Subscribe 
    </Button>
  );
};

export default AddToHome;
