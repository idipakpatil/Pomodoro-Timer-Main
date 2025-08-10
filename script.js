document.addEventListener("DOMContentLoaded", () => {
    let timeLeft = 1500; // Default 25 mins
    let timerInterval;
    const timeDisplay = document.querySelector(".timer-count time");
    const startStopBtn = document.querySelector(".start-stop");
    const options = document.querySelectorAll(".option");
    const timerVideo = document.getElementById("timerVideo"); 

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }

    function startTimer() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
            startStopBtn.textContent = "Start";
            timerVideo.pause(); // Pause video when stopping
        } else {
            startStopBtn.textContent = "Pause";
            timerVideo.play(); // Play video when starting timer
            timerInterval = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    timeDisplay.textContent = formatTime(timeLeft);
                } else {
                    clearInterval(timerInterval);
                    timerInterval = null;
                    startStopBtn.textContent = "Start";
                    timerVideo.pause(); // Pause video when time ends
                }
            }, 1000);
        }
    }

    function changeTimer(event) {
        clearInterval(timerInterval);
        timerInterval = null;
        startStopBtn.textContent = "Start";
        timeLeft = parseInt(event.target.closest(".option").dataset.time, 10);
        timeDisplay.textContent = formatTime(timeLeft);
        timerVideo.pause(); // Reset video when changing timer mode
    }

    startStopBtn.addEventListener("click", startTimer);
    options.forEach(option => option.addEventListener("click", changeTimer));

    timeDisplay.textContent = formatTime(timeLeft);
});
