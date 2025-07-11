document.getElementById('redPill').addEventListener('click', () => {
  document.getElementById('morpheus-scene').style.display = 'none';
  document.getElementById('mainSite').style.display = 'block';

  const music = document.getElementById('bgMusic');
  music.play().catch(err => console.log("Autoplay blocked:", err));
});

document.getElementById('bluePill').addEventListener('click', () => {
  document.getElementById('morpheus-scene').style.display = 'none';
  document.getElementById('blueExit').style.display = 'block';
});
