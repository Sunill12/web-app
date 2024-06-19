// script.js
document.getElementById('addCaptionButton').addEventListener('click', addCaption);
document.getElementById('videoURL').addEventListener('input', loadVideo);

let captions = [];

function loadVideo() {
    const videoURL = document.getElementById('videoURL').value;
    const videoPlayer = document.getElementById('videoPlayer');
    videoPlayer.src = videoURL;
}

function addCaption() {
    const captionText = document.getElementById('captionText').value;
    const captionTimestamp = document.getElementById('captionTimestamp').value;

    if (captionText && captionTimestamp) {
        captions.push({ text: captionText, timestamp: parseFloat(captionTimestamp) });
        updateCaptionList();
        document.getElementById('captionText').value = '';
        document.getElementById('captionTimestamp').value = '';
    }
}

function updateCaptionList() {
    const captionList = document.getElementById('captionList');
    captionList.innerHTML = '';
    captions.forEach((caption, index) => {
        const li = document.createElement('li');
        li.textContent = `(${caption.timestamp}s) ${caption.text}`;
        captionList.appendChild(li);
    });
}

const videoPlayer = document.getElementById('videoPlayer');
videoPlayer.addEventListener('timeupdate', displayCaption);

function displayCaption() {
    const currentTime = videoPlayer.currentTime;
    const captionOverlay = document.getElementById('captionOverlay');
    const currentCaption = captions.find(caption => Math.abs(caption.timestamp - currentTime) < 1);

    if (currentCaption) {
        captionOverlay.textContent = currentCaption.text;
        captionOverlay.style.display = 'block';
    } else {
        captionOverlay.style.display = 'none';
    }
}
