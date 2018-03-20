function listenToAudioBook(audiobookId, NVMButtons, callback) {
  //state
  let authBookTicket;
  //more state
  let playError;
  let initializedAndAuthorized = function() {
    if (playError) {
      //have to unhook all the event handlers
      callback(null, playError);
    } else if (authBookTicket && audioPlayer.initialized) {
      callback(null, authBookTicket);
    }
  };
  NVMButtons.forEach(nvmbtn => {
    nvmbtn.addEventListener('click', () => (playError = 'cancelled'));
  });
  if (!audioPlayer.initialized) {
    //concurrent
    audioPlayer.init(err => {
      playError = err;
      //check to see if the other is done
      initializedAndAuthorized();
    });
  }
  //concurrent
  authorizeUser(function(err, tix) {
    playError = err;
    authBookTicket = tix;
    //check to see if the other is done
    initializedAndAuthorized();
  });
}
