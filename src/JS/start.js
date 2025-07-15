const urlParams = new URLSearchParams(window.location.search);
const shouldMute = urlParams.get('mute') === 'true';
const bgMusic = document.getElementById('bgMusic');

if (shouldMute && bgMusic) {
  bgMusic.muted = true;
}