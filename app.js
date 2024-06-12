const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const prev = document.querySelector("#controls #prev");
const play = document.querySelector("#controls #play");
const next = document.querySelector("#controls #next");
const duration = document.querySelector("#duration");
const current = document.querySelector("#current-time");
const progressBar = document.querySelector("#progress-bar");
const volume = document.querySelector("#volume");
const valumBar = document.querySelector("#volume-bar");
const ul = document.querySelector("ul");   

const player = new MusicPlayer(musicList);

window.addEventListener("load", () => {
    let music = player.getMusic();
    displayMusic(music);
    displayMusicList(player.musicList);
    isPlayNow();
});


function displayMusic(music) {
    title.innerText = music.getName();
    singer.innerText = music.singer;
    image.src = "img/" + music.img  ;
    audio.src = "mp3/" + music.file;
}

play.addEventListener("click", () => {
    const isMusicPlay = container.classList.contains("play");
    isMusicPlay ? pauseMusic() : playMusic();
});


function pauseMusic() {
container.classList.remove("play");
audio.pause();
play.querySelector("i").classList = "fa-solid fa-play";
}

function playMusic() {
container.classList.add("play");
audio.play();
play.querySelector("i").classList = "fa-solid fa-pause";
}


next.addEventListener("click", () => {
nextMusic();
});

prev.addEventListener("click", () => {
prevMusic();
});


function nextMusic() {
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayNow();
}


function prevMusic() {
    player.prev();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayNow();
}


const calculaterTime = (toplamsaniye) => {
    let dakika = Math.floor(toplamsaniye / 60);
    let saniye = Math.floor(toplamsaniye % 60);
    const gucelsaniye = saniye < 10 ? `0${saniye}`: `${saniye}`;
    const sonuc = `${dakika}:${gucelsaniye}`;
    return sonuc; 
}


audio.addEventListener("loadedmetadata", () => {
   duration.textContent = calculaterTime(audio.duration);
   progressBar.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    current.textContent = calculaterTime(audio.currentTime);
    progressBar.value = Math.floor(audio.currentTime);
});


progressBar.addEventListener("input", () => {
    currentTime = calculaterTime(progressBar.value);
    audio.currentTime = progressBar.value;
});



let sesdurumu = "sesli";

valumBar.addEventListener("input", (e) => {
    const ses = e.target.value;
    audio.volume = ses / 100;
    
    if(ses == 0) {
        audio.muted =  true;
        sesdurumu = "sessiz";
        volume.classList = "fa-solid fa-volume-mute";

    }
    else {
        audio.muted = false;
        sesdurumu = "sesli";
        volume.classList = "fa-solid fa-volume-up";
        }
});

volume.addEventListener("click", () => {
    if(sesdurumu === "sesli") {
        audio.muted =  true;
        sesdurumu = "sessiz";
        volume.classList = "fa-solid fa-volume-mute";
        valumBar.value = 0;
    }else {
        audio.muted = false;
        sesdurumu = "sesli";
        volume.classList = "fa-solid fa-volume-up";
        valumBar.value = 100;
    }
});


const displayMusicList = (list) => {
    for(let i = 0; i < list.length; i++) {
        let liTag = `
           <li li-index='${i}' onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center">
                <span>${list[i].getName()}</span>
                <span id="music-${i}" class="badge bg-primary rounded-pill">00</span>
                <audio class="music-${i}" src="mp3/${list[i].file}"></audio>
            </li>
        `;
        ul.insertAdjacentHTML("beforeend", liTag);

        let liAudioDuration = document.querySelector(`#music-${i}`);
        let liAudioTag = document.querySelector(`.music-${i}`);
        
        liAudioTag.addEventListener("loadedmetadata", () => {
            liAudioDuration.textContent = calculaterTime(liAudioTag.duration);
        });
    }
};


const selectedMusic = (li) => {
    player.index = li.getAttribute("li-index");
     displayMusic(player.getMusic());
     playMusic();
     isPlayNow();
}

const isPlayNow  = () => {
    for(let li of ul.querySelectorAll("li")) {
        if(li.classList.contains("playing")){
            li.classList.remove("playing");
        }

        if(li.getAttribute("li-index") == player.index) {
            li.classList.add("playing");
        }
    }
};

audio.addEventListener("ended", () => {
    nextMusic();
});
