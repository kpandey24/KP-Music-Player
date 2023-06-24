console.log("Welcome to KP Music Player");
//Initialise the variable
let songIndex = 0;
let audioElement = new Audio('./songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('ProgressBar');
let gif = document.getElementById('gif');
let masterSongName=document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [{ songname: "Warriyo - Mortals [NCS Release]", filepath: "songs/1.mp3", coverpath: "covers/1.jpg" },
{ songname: "Cielo - Huma-Huma", filepath: "songs/2.mp3", coverpath: "covers/2.jpg" },
{ songname: "DEAF KEV - Invincible [NCS Release]-320k", filepath: "songs/3.mp3", coverpath: "covers/3.jpg" },
{ songname: "Different Heaven & EH!DE - My Heart [NCS Release]", filepath: "songs/4.mp3", coverpath: "covers/4.jpg" },
{ songname: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filepath: "songs/5.mp3", coverpath: "covers/5.jpg" },
{ songname: "Rabba - Salam-e-Ishq", filepath: "songs/2.mp3", coverpath: "covers/6.jpg" },
{ songname: "Sakhiyaan - Salam-e-Ishq", filepath: "songs/3.mp3", coverpath: "covers/7.jpg" }];
//audioElement.play();
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songname;
    //element.getElementsByClassName("timestamp")[0].innerText=songs[i].duration;
})
//Handling play/pause
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }

})
//Listen for events
audioElement.addEventListener('timeupdate', () => {
    progress = parseFloat((audioElement.currentTime / audioElement.duration) * 100);
    progressBar.value = progress;
})
progressBar.addEventListener('change', () => {
    audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
})
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemplay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}
Array.from(document.getElementsByClassName('songItemplay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        masterSongName.innerText=songs[songIndex].songname;
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;

    })
})
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >=6) {
        songIndex = 0
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText=songs[songIndex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 6
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText=songs[songIndex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})