/*Text typing*/

function typeText(text, elementId, cursorId, speed = 50, onDone = null) {
  const element = document.getElementById(elementId);
  const cursor = document.getElementById(cursorId);
  cursor.style.display = "inline";


  const parts = text.split(/(\|\|PAUSE:\d+\|\|)/);
  let partIndex = 0;
  let charIndex = 0;

  function typePart() {
    if (partIndex >= parts.length) {
      cursor.style.display = "none";
      if (onDone) onDone();
      return;
    }

    const part = parts[partIndex];

    
    const pauseMatch = part.match(/\|\|PAUSE:(\d+)\|\|/);
    if (pauseMatch) {
      const pauseTime = parseInt(pauseMatch[1]);
      partIndex++;
      setTimeout(typePart, pauseTime);
    } else {
      
      if (charIndex < part.length) {
        element.textContent += part.charAt(charIndex);
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
  typeText(
    "I am Stefan, a web developer...",
    "typing1",
    "cursor1",
    50,
    () => {
      typeText(
        "Smile for the camera... ||PAUSE:1500|| I'm going to take your picture now... ||PAUSE:2000|| Just kidding ;)",
        "typing2",
        "cursor2",
        50
      );
    }
  );
};

