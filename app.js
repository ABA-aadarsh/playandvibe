const playpause=document.querySelector(".playpause")
const next=document.querySelector(".next")
const previous=document.querySelector(".previous")
const i=document.querySelector(".playpause i")
const gif=document.querySelector("#gif")
const musicCover=document.querySelector("#musicCover")
const songName=document.querySelector(".name")
const progressbar=document.querySelector("#progressbar")
const sidebar=document.querySelector(".sidebar")
const list=document.querySelector(".list")


const playlisttoggle=document.querySelector("#toggle")
const exit=document.querySelector(".exit")
progressbar.value=0

const music= new Audio ("./Songs/Believer.webm")
const songs=[
    { name:"Heat Waves", path:"./Songs/Heat Waves.webm", cover:"./song cover/Heat Waves.png" },
    { name:"Kalo Keshma Reli mai", path:"./Songs/Kalo Keshma Reli mai.webm", cover:"./song cover/Kalo Keshma Reli mai.png" },
    { name:"The Search", path:"./Songs/The Search.webm", cover:"./song cover/The Search.png" },
    { name:"Shape of You", path:"./Songs/Shape of You.webm", cover:"./song cover/Shape of You.jpg" },
    { name:"Levitating", path:"./Songs/Levitating.webm", cover:"./song cover/Levitating.png" },
    { name:"Sunflower", path:"./Songs/Sunflower.webm", cover:"./song cover/Sunflower.png" },
    { name:"Bones", path:"./Songs/Bones.webm", cover:"./song cover/Bones.jpg" },
    { name:"Aarambh", path:"./Songs/Aarambh.webm", cover:"./song cover/Aarambh.jpg" }
]
// adding items in playlist 
songs.forEach((element,index)=>{
    let item=document.createElement("div")
    item.id=`${index}`
    item.classList.add("items")
    item.innerHTML=`
                        <img src="${element.cover}" id="0" class="sbimg">
                        <span class="sbname" >${element.name}<br></span>
                    `
    list.appendChild(item)
})
const sidebarSongList=[...list.children]
sidebarSongList[0].classList.add("active")
let songIndex=0
const songUpdate=(i,c="play")=>{
    // initial steps
    pauseMode()
    music.currentTime=0

    musicCover.src=songs[i].cover
    songName.textContent=songs[i].name
    music.src=songs[i].path

    progressbar.value=0
    if(c!="pause"){
        // a timeout so that it don't look just instant
        setTimeout(()=>{
            playMode()
        },500)
    }
}
window.addEventListener("DOMContentLoaded",()=>{
    musicCover.src=songs[songIndex].cover
    songName.textContent=songs[songIndex].name
    music.src=songs[songIndex].path
})
const playMode=()=>{
    //initially it is paused so now we have to play
    playpause.classList.remove("pause")
    playpause.classList.add("play")
    i.classList.remove("fa-play-circle")
    i.classList.add("fa-pause-circle")

    gif.classList.remove("pause")
    gif.classList.add("play")

    musicCover.classList.remove("pause")
    musicCover.classList.add("play")

    music.play()
}
const pauseMode=()=>{
    // initially it is playing now we have to pause
    music.pause()

    playpause.classList.remove("play")
    playpause.classList.add("pause")
    i.classList.remove("fa-pause-circle")
    i.classList.add("fa-play-circle")

    gif.classList.remove("play")
    gif.classList.add("pause")

    musicCover.classList.remove("play")
    musicCover.classList.add("pause")

}
playpause.addEventListener("click",()=>{
    if(playpause.classList.contains("pause")){
        playMode()
    }
    else if(playpause.classList.contains("play")){
        pauseMode()
    }
})
music.addEventListener("timeupdate",()=>{
    let progress=parseInt((music.currentTime/music.duration)*500);
    progressbar.value=progress
    // console.log(progressbar.value)
    // console.log(progress)
    if(progressbar.value>=500){
        pauseMode()
        songIndex+=1
        songIndex%=songs.length
        songUpdate(songIndex)
    }
})
progressbar.addEventListener("change",()=>{
    music.currentTime=(progressbar.value*music.duration)/500
    if(gif.classList.contains("play")){
        // gif transition effect
        gif.classList.remove("play")
        gif.classList.add("pause")
        setTimeout(()=>{
            gif.classList.add("play")
            gif.classList.remove("pause")
        },400)
    }
})

//next button
next.addEventListener("click",()=>{
    songIndex+=1
    songIndex=songIndex%songs.length
    if(playpause.classList.contains("pause")){
        songUpdate(songIndex,"pause")
    }else{
        songUpdate(songIndex)
    }
})
//previous button
previous.addEventListener("click",()=>{
    if(songIndex!=0){
        songIndex-=1
        songIndex=songIndex%songs.length
    }else{
        songIndex=songs.length-1
    }
    if(playpause.classList.contains("pause")){
        songUpdate(songIndex,"pause")
    }else{
        songUpdate(songIndex)
    }
})
// sidebar handling
sidebarSongList.forEach((item)=>{
    item.addEventListener("click",()=>{
        document.querySelector(".active").classList.remove("active")
        item.classList.add("active")
        songIndex=parseInt(item.id)
        songUpdate(songIndex)
    })
})

exit.addEventListener("click",()=>{
    sidebar.classList.add("hidden")
})
playlisttoggle.addEventListener("click",()=>{
    console.log("hello")
    if(sidebar.classList.contains("hidden")){
        sidebar.classList.remove("hidden")
        document.querySelector("#toggle i").classList.remove("fa-folder")
        document.querySelector("#toggle i").classList.add("fa-folder-open")
    }
    else{
        sidebar.classList.add("hidden")
        document.querySelector("#toggle i").classList.remove("fa-folder-open")
        document.querySelector("#toggle i").classList.add("fa-folder")
    }
})
window.addEventListener("keypress",(event)=>{
    if(event.key==" "){
        if(playpause.classList.contains("pause")){
            playMode();
        }
        else{
            pauseMode();
        }
    }
})
