let currentSong = new Audio();
let songs;
let currFolder;

function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs(folder) {
    currFolder = folder;
    let a = await fetch(`/${folder}/`)
    let response = await a.text()
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")

    songs = []

    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mpeg") || element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1])
        }
    }
    // Show All Songs in playlist
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    songUL.innerHTML = ""
    for (const song of songs) {
        let decodedSong = decodeURIComponent(song).split("/").pop(); // Get the filename from the URL

        songUL.innerHTML += `<li>
                                <img class="invert" src="svg/music.svg" alt="">
                                <div class="info">
                                        <div>${decodedSong}</div>
                                        <div>Artist Name</div>
                                    </div>   
                                    <div class="playNow">
                                           <span>Play Now</span>
                                        <img class="invert" src="svg/playsong.svg" alt="">
                                    </div>
                            </li>`;
    }

    // Attach an Event llistner to each Song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })

    })
    return songs
}

const playMusic = (track, pause = false) => {
    // let audio = new Audio("/songs/" + track)

    currentSong.src = `/${currFolder}/` + track
    if (!pause) {
        currentSong.play()
        play.src = "svg/pause.svg"
    }

    document.querySelector(".songInfo").innerHTML = decodeURI(track).split("/").pop();
    document.querySelector(".songTime").innerHTML = "00:00 / 00:00"
}

async function DisplayAlbum() {
    
    let a = await fetch(`/songs/`)
    let response = await a.text()
    let div = document.createElement("div")
    let cardContainer = document.querySelector(".cardContainer")
    div.innerHTML = response;
    let ancors = div.getElementsByTagName("a");

    let array = Array.from(ancors);
    for (let index = 0; index < array.length; index++) {
        const e = array[index];   
        if (e.href.includes("/songs") && !e.href.includes(".htaccess")) {
            // console.log(e.href.split("/").slice(-2)[0]);
            let folder = e.href.split("/").slice(-2)[0];
            let a = await fetch(`/songs/${folder}/info.json`)
            let response = await a.json();
            cardContainer.innerHTML += `<div data-folder="${folder}"class="card">
                                            <div class="playIcon">
                                                <img src="svg/play.svg" alt="">
                                            </div>
                                            <img class="SongImg" src="/songs/${folder}/cover.jpg" alt="">
                                            <h2>${response.title}</h2>
                                            <p>${response.discription}</p>
                                        </div>`
        }
    }

     //Load the playlist Whenever Card is clicked
     Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)
            playMusic(songs[0]);
        })
    })
}


async function main() {

    songs = await getSongs("songs/NewSongs")
    playMusic(songs[0], true)

    //Display all the albums
    DisplayAlbum()

    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "svg/pause.svg"
        }
        else {
            currentSong.pause()
            play.src = "svg/playsong.svg"
        }
    })
    // Upadting the time of song 
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songTime").innerHTML = `${formatTime(currentSong.currentTime)}/${formatTime(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%"
    })

    // Updating the Seekbar in playbar
    document.querySelector(".seekbar").addEventListener("click", (e) => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100;
    })
    

    document.querySelector(".range1").getElementsByTagName("input")[0].addEventListener("change", (e) => {  
        let percent = ((currentSong.currentTime/currentSong.duration)*100);
        console.log(parseInt(percent));
        currentSong.currentTime = parseInt(percent)
        currentSong.currentTime = ((currentSong.duration) * percent) / 100;
    })

    // document.querySelector(".range1 input").addEventListener("input", (e) => {
    //     const percent = e.target.value;
    //     currentSong.currentTime = (currentSong.duration * percent) / 100;
    // });


    // Adding event listner for hamburger icon
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0px"
    })
    // Adding a Event listner to close button
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-130%"
    })

    // Adding a Event Listner to the Previous Button
    previous.addEventListener("click", () => {
        console.log('Previous Clicked');
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1])
        }
    })

    // Adding a Event Listner to the next Button
    next.addEventListener("click", () => {
        console.log('Next Clicked');
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1])
        }
    })

    // Add an event listner to Volume range
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        console.log("Setting Volume To", e.target.value, "/100");
        currentSong.volume = parseInt(e.target.value) / 100
    })
    
    // Add an Event Listner to mute the Volume
    document.querySelector(".volume > img").addEventListener("click",e=>{

        if(e.target.src.includes("svg/volume.svg")){
            e.target.src= e.target.src.replace("svg/volume.svg","svg/mute.svg")
            currentSong.volume = 0;
            document.querySelector(".range").getElementsByTagName("input")[0].value= 0;
        }
        else{
            e.target.src= e.target.src.replace("svg/mute.svg","svg/volume.svg")
            currentSong.volume = 0.10;
            document.querySelector(".range").getElementsByTagName("input")[0].value= 10;
        }
   })
}
main()
