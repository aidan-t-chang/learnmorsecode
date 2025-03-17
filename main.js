// track both time between presses and length of press?
let count = 0;
// track the duration
const button = document.getElementById('press');
let startTime;
button.addEventListener('mousedown', (event) => {
    startTime = new Date().getTime();
    });

button.addEventListener('mouseup', (event) => {
    const endTime = new Date().getTime();
    const duration = endTime - startTime;
    if (count > 0) {
        document.getElementById('durationText').append(document.createTextNode(', '));
    }
    const newnode = document.createTextNode(duration);
    document.getElementById('durationText').appendChild(newnode);
    count++;
    });

// for mobile users (touchstart, touchend)
button.addEventListener('touchstart', (event) => {
    startTime = new Date().getTime();
    });

button.addEventListener('touchend', (event) => {
    const endTime = new Date().getTime();
    const duration = endTime - startTime;
    if (count > 0) {
        document.getElementById('durationText').append(document.createTextNode(', '));
    }
    const newnode = document.createTextNode(duration);
    document.getElementById('durationText').appendChild(newnode);
    count++;
    });

// track the distancne between each press, potentially for tracking spaces
let first = null;
let count2 = 0;

button.addEventListener('click', () => {
    const currentTime = Date.now();
  
    if (first === null) {
        first = currentTime;
    } 
    else {
        const timeElapsed = currentTime - first;
        if (count2 > 0) {
            document.getElementById('distanceText').append(document.createTextNode(', '));
        }
        const newdist = document.createTextNode(timeElapsed);
        document.getElementById('distanceText').appendChild(newdist);
        first = currentTime;
        count2++;
    }
  });

function reset() {
    document.getElementById('durationcontainer').innerHTML = '';
    const newduration = document.createElement('p');
    newduration.textContent = "Duration of Presses: ";
    newduration.setAttribute('id', 'durationText');
    document.getElementById('durationcontainer').appendChild(newduration);

    document.getElementById('distancecontainer').innerHTML = '';
    const newdistance = document.createElement('p');
    newdistance.textContent = "Distance Between Presses: ";
    newdistance.setAttribute('id', 'distanceText');
    document.getElementById('distancecontainer').appendChild(newdistance);

    count = 0;
    count2 = 0;
    first = null;
}

document.getElementById('reset').addEventListener('click', reset);

// TODO:
// - add togglable morse code table
// - make it so that you are actually able to input morse code
// - api generate quotes to practice morse code
// - figure out the logistics between spaces between long presses vs reg space between long presses