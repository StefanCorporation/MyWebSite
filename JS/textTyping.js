function typeText(text, elementId, cursorId, speed = 50, mute = false, onDone = null) {
  const element = document.getElementById(elementId);
  const cursor = document.getElementById(cursorId);
  if (!element || !cursor) {
    console.error(`Element (${elementId}) or cursor (${cursorId}) not found`);
    return;
  }
  cursor.style.display = "inline";

  let typingSound = null;
  if (!mute) {
    typingSound = new Audio('./audio/typingsound.mp3');
    typingSound.volume = 1.0;
    typingSound.onerror = () => {
      console.error('Failed to load typing sound');
    };
    typingSound.play();
  }

  const parts = text.split(/(\|\|PAUSE:\d+\|\|)/);
  let partIndex = 0;
  let charIndex = 0;

  function typePart() {
    if (partIndex >= parts.length) {
      cursor.style.display = "none";
      if (!mute && typingSound) {
        typingSound.pause();
        typingSound.currentTime = 0;
      }
      if (onDone) onDone();
      return;
    }

    const part = parts[partIndex];

    const pauseMatch = part.match(/\|\|PAUSE:(\d+)\|\|/);
    if (pauseMatch) {
      const pauseTime = parseInt(pauseMatch[1]);
      if (!mute && typingSound) {
        typingSound.pause();
      }
      partIndex++;
      setTimeout(() => {
        if (!mute && partIndex < parts.length && typingSound) {
          typingSound.currentTime = 0;
          typingSound.play();
        }
        typePart();
      }, pauseTime);
    } else {
      if (charIndex < part.length) {
        element.textContent += part.charAt(charIndex);
        if (!mute && typingSound && typingSound.paused) {
          typingSound.currentTime = 0;
          typingSound.play();
        }
        charIndex++;
        setTimeout(typePart, speed);
      } else {
        partIndex++;
        charIndex = 0;
        typePart();
      }
    }
  }

  typePart();
}

window.onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const mute = urlParams.get('mute') === 'true';

  const timerElement = document.getElementById('timer');
  const timerMinutes = document.getElementById('timer-minutes');
  const timerSeconds = document.getElementById('timer-seconds');
  if (!timerElement || !timerMinutes || !timerSeconds) {
    console.error('Timer element, minute, or second not found');
    return;
  }

  let timeSpent = 0;
  let timerRunning = false; // Start timer stopped

  function startTimer() {
    timerRunning = document.visibilityState === 'visible';
    timerElement.classList.add('show'); // Custom transition
    // For Animate.css, use: timerElement.classList.add('animate__animated', 'animate__fadeIn');
    setInterval(() => {
      if (timerRunning) {
        timeSpent++;
        const minutes = Math.floor(timeSpent / 60);
        const seconds = timeSpent % 60;

        // Flicker effect
        const matrixChars = '</[]$%#@∑∆π{}>';
        timerMinutes.textContent = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        timerSeconds.textContent = matrixChars[Math.floor(Math.random() * matrixChars.length)];

        setTimeout(() => {
          timerMinutes.textContent = minutes;
          timerSeconds.textContent = seconds < 10 ? `0${seconds}` : seconds;
        }, 200);
      }
    }, 1000);
  }

  document.addEventListener('visibilitychange', () => {
    timerRunning = document.visibilityState === 'visible';
  });

  typeText(
    "I am Stefan, a web developer...",
    "typing1",
    "cursor1",
    50,
    mute,
    () => {
      typeText(
        "Smile for the camera... ||PAUSE:1500|| I'm going to take your picture now... ||PAUSE:2000|| Just kidding ;)",
        "typing2",
        "cursor2",
        50,
        mute,
        startTimer // Start timer with fade-in after typing2
      );
    }
  );
};