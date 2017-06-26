// turns the time into a human readable format
function formatTime (raw) {
  let seconds = Math.floor(raw / 1000);
  let fractionalSeconds = (raw % 1000) / 1000;
  let minutes = Math.floor(seconds / 60);
  seconds = seconds - (60 * minutes) + fractionalSeconds;

  return `${zeroPad(minutes)}:${zeroPad(seconds.toFixed(2))}`;
}

// adds a leading zero because humans like them
function zeroPad (value) {
  let pad = value < 10 ? '0' : '';
  return `${pad}${value}`;
}

// Stop watch controls.
const startButton   = document.querySelector("button.start");
const stopButton    = document.querySelector("button.stop");
const lapButton     = document.querySelector("button.lap");
const resetButton   = document.querySelector("button.reset");

// Stop watch info.
const lapList       = document.querySelector("#lapList");
const stopwatchTime = document.querySelector("#stopwatchTime");

const updateInterval = 10;

let stopwatchIntervalId = NaN;
let stopwatchRawTime    = 0;
let laps                = [];

document.addEventListener("DOMContentLoaded", function () {
  startButton.addEventListener("click", stopwatchStart);
  stopButton .addEventListener("click", stopwatchStop);
  lapButton  .addEventListener("click", stopwatchLap);
  resetButton.addEventListener("click", stopwatchReset);

  stopButton.disabled = true;
  lapButton.disabled  = true;
})

// start the stop watch by creating a new interval
function stopwatchStart (event) {
  event.preventDefault();

  stopwatchIntervalId = setInterval(stopwatchUpdate, updateInterval);
  console.log(`start: id=${stopwatchIntervalId}`);

  startButton.disabled = true;
  stopButton.disabled  = false;
  lapButton.disabled   = false;
}

// stop - but do not clear - the stopwatch
function stopwatchStop (event) {
  event.preventDefault();

  clearInterval(stopwatchIntervalId);
  console.log(`stop: id=${stopwatchIntervalId}`);
  stopwatchIntervalId = NaN;

  startButton.disabled = false;
  stopButton.disabled  = true;
  lapButton.disabled   = true;
}

// add the interval to the stop watch time
// update the DOM with the new time
function stopwatchUpdate () {
  stopwatchRawTime += updateInterval;

  stopwatchTime.innerHTML = formatTime(stopwatchRawTime);
}

// add a lap to our list at the current stopwatch time
// update the DOM lapList
function stopwatchLap (event) {
  event.preventDefault();

  if (!isNaN(stopwatchIntervalId)) {
    let tempTime = stopwatchRawTime;

    laps.push(tempTime);

    let lapItem = document.createElement("li");
    let lapText = document.createTextNode(formatTime(tempTime));

    lapItem.appendChild(lapText);
    lapList.appendChild(lapItem);
  }
}

// stop the stopwatch and reset to 0
// clear lap list
function stopwatchReset (event) {
  event.preventDefault();

  clearInterval(stopwatchIntervalId);
  stopwatchIntervalId = NaN;

  stopwatchRawTime = 0;
  laps             = [];

  stopwatchTime.innerHTML = "0";
  lapList.innerHTML       = "";

  startButton.disabled = false;
  stopButton.disabled  = true;
  lapButton.disabled   = true;
}
