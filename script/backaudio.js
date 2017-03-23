myAudio = new Audio('resources/bSound.mp3');
myNewAudio = new Audio('resources/bSoundGood.mp3');


myAudio.loop = true;
myAudio.volume = 0.1;
myAudio.play();
var flag=1;

function pause_music(){
    if(flag==1){
        myAudio.pause();

    }
    else
    myNewAudio.pause();
}

function play_music(){
    if(flag==1){
        myAudio.play();

    }
    else
        myNewAudio.play();
}

function reset_music(){
    myAudio.loop = true;
    myAudio.volume = 0.1;
    myAudio.play();
    var flag=1;
}

function newyear_music() {
    flag=2;
    myAudio.pause();
    myAudio.currentTime = 0;
    myNewAudio.loop = true;
    myNewAudio.volume = 0.8;
    myNewAudio.play();
}

