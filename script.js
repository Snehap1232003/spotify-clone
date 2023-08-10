
//initialize veriable
let songIndex=0;
let audioElement = new Audio('songs/1.mpeg');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let masterSongName = document.getElementById('masterSongName');

let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    {songName:"Manjha", filePath:"songs/1.mpeg",coverPath:"covers/ma.jpeg"},
    {songName:"Pasoori", filePath:"songs/2.mpeg",coverPath:"covers/pasoori.png"},
    {songName:"Chale Aana", filePath:"songs/3.mpeg",coverPath:"covers/chale.jpeg"},
    {songName:"Dil Meri Na Sune", filePath:"songs/4.mpeg",coverPath:"covers/dil.jpeg"},
    {songName:"Feelings", filePath:"songs/5.mpeg",coverPath:"covers/feelings.jpeg"},
    {songName:"High Rated", filePath:"songs/6.mpeg",coverPath:"covers/high.jpeg"},
    {songName:"Pal", filePath:"songs/7.mpeg",coverPath:"covers/pal.jpeg"}
]

songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;


})





//handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');

    }
})

//Listen to event
audioElement.addEventListener('timeupdate',()=>{
    //update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value= progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })

}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src =`songs/${songIndex+1}.mpeg`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime =0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');

    })
})

document.getElementById('next').addEventListener('click',()=>{
    
    if(songIndex>7){
        songIndex = 0;
    }
    else{
        songIndex+=1;
    }
    
    audioElement.src =`songs/${songIndex+1}.mpeg`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime =0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click',()=>{
    
    if(songIndex<=0){
        songIndex = 0;
    }
    else{
        songIndex-=1;
    }
    
    audioElement.src =`songs/${songIndex+1}.mpeg`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime =0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})