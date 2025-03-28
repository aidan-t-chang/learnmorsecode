// The length of a "dot" is used as the unit of time. And a dash lasts for three dots. So, if a dot is 1 second, then a dash is 3 seconds.

// Between every letter, there is to be three "dots" worth of empty space. So, that's the answer you're looking for: 
// When you have three dots worth of space, that's how you know a letter is finished.

// And in order to show that a new word is coming, there has to be a space of seven dots between words. 
// This seems a bit less necessary than separating letters, but I'm sure it helps avoid some confusion anyway.

// - a reddit user

let count = 0;
let first = null;
let count2 = 0;
let dot_length = 200;
let dash_length = dot_length * 7 - 1;
let space_length = dot_length * 7;
let finished_letter = dot_length * 3;
morse_dict = {
    ".-":'a',
    "-...": 'b',
    "-.-.": 'c',
    "-..": 'd',
    ".": 'e',
    "..-.": 'f',
    "--.": 'g',
    "....": 'h',
    "..": 'i',
    ".---": 'j',
    "-.-": 'k',
    ".-..": 'l', 
    "--": 'm',
    "-.": 'n',
    "---": 'o',
    ".--.": 'p',
    "--.-": 'q',
    ".-.": 'r',
    "...": 's',
    "-": 't',
    "..-": 'u',
    "...-": 'v',
    ".--": 'w',
    "-..-": 'x',
    "-.--": 'y',
    "--..": 'z',
    ".----": '1',
    "..---": '2',
    "...--": '3',
    "....-": '4',
    ".....": '5',
    "-....": '6',
    "--...": '7',
    "---..": '8',
    "----.": '9',
    "-----": '0'
}

function addWord(word_in_morse) {
    const morseword = document.createTextNode(morse_dict[word_in_morse]);
    document.getElementById('words').appendChild(morseword);
}

function forceAdd() {
    enqueue = document.getElementById('to_add');
    if (morse_dict[enqueue.textContent] !== undefined) {
        addWord(enqueue.textContent);
    }
    enqueue.innerHTML = '';
}

document.getElementById('end').addEventListener('click', forceAdd);

// track the duration and the distance
const button = document.getElementById('press');
let startTime;
button.addEventListener('mousedown', (event) => {
    startTime = new Date().getTime();
    if (first != null) { // the button has been pressed beforehand
        const timeElapsed = Date.now() - first; // first is the last button lift - the current time = time elapsed between presses
        if (count2 > 0) {
            document.getElementById('distanceText').append(document.createTextNode(', '));
        }
        const newdist = document.createTextNode(timeElapsed);
        document.getElementById('distanceText').appendChild(newdist);
        first = Date.now();
        count2++;
        
        // dictate the space and finished letter
        if (finished_letter < timeElapsed && timeElapsed < space_length) {
            var eq = document.getElementById('to_add');
            console.log(eq.textContent)
            if (morse_dict[eq.textContent] !== undefined) {
                console.log(morse_dict[eq.textContent]);
                addWord(eq.textContent);
            }
            eq.innerHTML = '';    
        }
        else if (timeElapsed >= space_length) {
            document.getElementById('words').appendChild(document.createTextNode(' '));
        }
    }
    
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
    first = Date.now(); // now that the button is no longer pressed, the time starts
    // dictate the dot vs dash
    if (duration <= dot_length) {
        document.getElementById('to_add').appendChild(document.createTextNode('.'));
    }
    else if (duration > dot_length) {
        document.getElementById('to_add').appendChild(document.createTextNode('-'));
    }
    });

// for mobile users (touchstart, touchend)
button.addEventListener('touchstart', (event) => {
    startTime = new Date().getTime();
    if (first != null) { // the button has been pressed beforehand
        const timeElapsed = Date.now() - first; // first is the last button lift - the current time = time elapsed between presses
        if (count2 > 0) {
            document.getElementById('distanceText').append(document.createTextNode(', '));
        }
        const newdist = document.createTextNode(timeElapsed);
        document.getElementById('distanceText').appendChild(newdist);
        first = Date.now();
        count2++;
    }
    // if it is the first time the button is being pressed, it doesn't matter
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

    first = Date.now();
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

    document.getElementById('words').innerHTML = '';
    to_add = document.createElement('div');
    to_add.setAttribute('id', 'to_add');
    document.getElementById('words').appendChild(to_add)

    count = 0;
    count2 = 0;
    first = null;
}

let count3 = 0;
function makeVisible() {
    if (count3 % 2 != 0) {
        document.getElementById('toggle').style.display = 'none';
    }
    else {
        document.getElementById('toggle').style.display = 'block';
    }
    count3++;
}

document.getElementById('checkbox').addEventListener('click', makeVisible);
document.getElementById('reset').addEventListener('click', reset);

function fetchWord(wordCount) {
    const api = "https://random-word-api.vercel.app/api?words=";
    const new_api = api + wordCount;
    document.getElementById('word').innerHTML = '';
    fetch(new_api)
    .then(response => response.json())
    .then(data => {
        for (let i=0; i < data.length;i++) {
            if (i > 0) {
                document.getElementById('word').innerHTML += " ";
            }
            document.getElementById('word').innerHTML += data[i];
        }
    })
    .catch(error => console.error('Error fetching random word:', error));
}

let wordCount = 3
function fetchWordFromInput() {
    wordCount = document.getElementById('wordCountInput').value; // Get input value
    if (!isNaN(wordCount) && wordCount > 0) { // Ensure valid input
        fetchWord(wordCount);
        // console.log(wordCount);
    } else {
        console.error('Please enter a valid positive number');
    }
}

function changeWordCount(form) {
    word_numbers = form.wordcount;
    console.log(word_numbers);
}

fetchWord(3);

const open = document.getElementById("openModal");
const close = document.getElementById('closeModal');
const modal = document.getElementById("modal");

open.addEventListener('click', () => {
    modal.classList.add("open");
})

close.addEventListener("click", () => {
    modal.classList.remove("open");
})

function updateSettings() {
    
}

// display the morse code/english 

// time of short should be < 200
// 201 - 1000 should be long
// spaces should be indicated by button press?

// TODO:
// - add togglable morse code table ✅
// - make it so that you are actually able to input morse code ✅
// - api generate words to practice morse code ✅
// - figure out the logistics between spaces between long presses vs reg space between long presses ✅
// - settings menu to customize the time for dot, dash, and space
// - checker to make sure the morse code being inputted is actually right 🥴
// - change the number of words that can be displayed ✅