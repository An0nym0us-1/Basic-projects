let started = false;
let level = 0;
let btnsColor = ["green", "purple", "red", "yellow"];
let gameSeq = [];
let userSeq = [];
let highestScore = level;

let h2 = document.querySelector("h2");
let h5 = document.querySelector("h5");


document.addEventListener("keypress", function(){
    if(started == false){
        console.log("Game started");
        started = true;

        levelUp();
    }
});

//btn-flash / level++
function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 100);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 100);
}

function checkAns(idx){
    // // console.log(`current level ${level}`);
    // let idx = level - 1;

    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }
    else{
        if(highestScore < level){
            highestScore = level;
            h5.innerText = `Highest Score: ${highestScore}`;
        }
        h2.innerHTML = `Game over!! Your score was <b>${level}</b> <br>Press any key to start again`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function reset(){
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}

function btnPress(){
    let btn = this; 
    // console.log(btn);
    userFlash(btn);
    
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    // console.log(userColor);

    checkAns(userSeq.length - 1);
}


function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    //random btn
    let randIdx = Math.floor(Math.random()*3);
    let randColor = btnsColor[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    console.log(`gameSeq: ${gameSeq}`);
    btnFlash(randBtn);
}


let btns = document.querySelectorAll(".btn");
for(btn of btns){
    btn.addEventListener("click",btnPress);
}