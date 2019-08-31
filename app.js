const choices = document.querySelectorAll('.choice');
const player_score = document.getElementById('player-score');
const cpu_score = document.getElementById('cpu-score');
const restart = document.getElementById('restart');
const modal = document.querySelector('.modal-box');
const modal_content = document.querySelector('.modal-content');
const attempts = document.getElementById('attempts');

let max_attempts =10;
let attempt =0;
const score ={
    player:0,
    cpu:0
};

function play(e){
    if(attempt <max_attempts){
    restart.style.display = 'block';
    const player_choice = e.target.id;
    const cpu_choice = getCPUchoice();
    const winner = getWinner(player_choice,cpu_choice);
    showWinner(winner,cpu_choice);
    attempt++;
    attempts.innerHTML=`
    <p>Maximum no. of attempts left : <strong>${max_attempts-attempt}</strong></p>
    `;
    }
}
function resetGame(){
    restart.style.display='none';
    attempt=0;
    score.player =0;
    score.cpu =0;
    player_score.textContent = `Your score: ${score.player}`;
    cpu_score.textContent = `CPU score: ${score.cpu}`;
    attempts.innerHTML=`
    <p>Maximum no. of attempts left : <strong>${max_attempts}</strong></p>
    `;
}
function getCPUchoice(){
    let random = Math.random();
    if(random <0.34){
        return 'rock';
    }else if(random <= 0.67){
        return 'paper'
    }else{
        return 'scissors'
    }
};
function getWinner(p,c){
    if(p===c){
        return 'draw'
    }else if(p ==='rock'){
        if(c === 'paper'){
            return 'cpu'
        }else{
            return 'player'
        }
    }else if(p ==='paper'){
        if(c === 'scissors'){
            return 'cpu'
        }else{
            return 'player'
        }
    }else if(p ==='scissors'){
        if(c === 'rock'){
            return 'cpu'
        }else{
            return 'player'
        }
    }
}
function showWinner(winner,cpu_choice){
    if(winner ==='player'){
        score.player++;
        modal_content.innerHTML=`
        <h4 class="text-win">you won</h4>
        <i class="fas fa-hand-${cpu_choice} fa-4x"></i>
        <p>CPU choice is <strong>${cpu_choice}</strong></p>
        `
    }else if(winner ==='cpu'){
        score.cpu++;
        modal_content.innerHTML=`
        <h4 class="text-loose">you lost</h4>
        <i class="fas fa-hand-${cpu_choice} fa-4x"></i>
        <p>CPU choice is <strong>${cpu_choice}</strong></p>
        `
    }else{
        modal_content.innerHTML=`
        <h4>it's a draw</h4>
        <i class="fas fa-hand-${cpu_choice} fa-4x"></i>
        <p>CPU choice is <strong>${cpu_choice}</strong></p>
        ` 
    }
    player_score.textContent = `Your score: ${score.player}`;
    cpu_score.textContent = `CPU score: ${score.cpu}`;
    modal.style.display ='block';
}

function clearModal(e){
    if(attempt === max_attempts){
        modal.style.display ='block';
        if(score.player >score.cpu){
            modal_content.innerHTML=`
            <h1>You won the set by ${score.player -score.cpu} Points</h1>
           `
        }else if(score.cpu > score.player){
            modal_content.innerHTML=`
            <h1>CPU won the set by ${score.cpu -score.player} points</h1>
           `
        }else{
            modal_content.innerHTML=`
            <h1>No winner for the set</h1>
           `  
        }
        resetGame();
    }
    if(e.target.id =='modal-box'){
        modal.style.display ='none';
    }
}
choices.forEach(function(choice){
    choice.addEventListener('click',play);
});
restart.addEventListener('click',resetGame);
window.addEventListener('click',clearModal);