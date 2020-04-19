export const playAudio = audioUrl => {
  if (audioUrl) {
    const audioElement = new Audio(audioUrl);
    audioElement.play();
  }
};
