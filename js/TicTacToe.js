const grid = [document.querySelector('.top_left'),
                    document.querySelector('.top_center'),
                    document.querySelector('.top_right'),
                    document.querySelector('.center_left'),
                    document.querySelector('.center_center'),
                    document.querySelector('.center_right'),
                    document.querySelector('.bottom_left'),
                    document.querySelector('.bottom_center'),
                    document.querySelector('.bottom_right')];

let avaliable_grid = [document.querySelector('.top_left'),
                    document.querySelector('.top_center'),
                    document.querySelector('.top_right'),
                    document.querySelector('.center_left'),
                    document.querySelector('.center_center'),
                    document.querySelector('.center_right'),
                    document.querySelector('.bottom_left'),
                    document.querySelector('.bottom_center'),
                    document.querySelector('.bottom_right')];

function updateScore(){
    document.querySelector('.score')
        .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function setHover(box_index){
    if(! grid[box_index].classList.contains('selected'))
    grid[box_index].classList.add('hover');
}
function unsetHover(box_index){
    if(grid[box_index].classList.contains('hover'))
        grid[box_index].classList.remove('hover'); 
}
function remove(array1, target){
    let array2 = [];
    let i = 0;
    array1.forEach(element => {
        if(!(element === target)){
            array2[i] = element;
            i++;
        }
    });
    return array2;
}

let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties:0
};


updateScore();

function checkWin(player){
    if(player === grid[0].innerHTML && grid[0].innerHTML === grid[1].innerHTML && grid[1].innerHTML === grid[2].innerHTML){
        grid[0].classList.add('win');
        grid[1].classList.add('win');
        grid[2].classList.add('win');
        return true;  
    } 
    else if(player === grid[3].innerHTML && grid[3].innerHTML === grid[4].innerHTML && grid[4].innerHTML === grid[5].innerHTML){
        grid[3].classList.add('win');
        grid[4].classList.add('win');
        grid[5].classList.add('win');
        return true; 
    }
    else if(player === grid[6].innerHTML && grid[6].innerHTML === grid[7].innerHTML && grid[7].innerHTML === grid[8].innerHTML){
        grid[6].classList.add('win');
        grid[7].classList.add('win');
        grid[8].classList.add('win');
        return true;
    }
    else if(player === grid[0].innerHTML && grid[0].innerHTML === grid[3].innerHTML && grid[3].innerHTML === grid[6].innerHTML){   
        grid[0].classList.add('win');
        grid[3].classList.add('win');
        grid[6].classList.add('win'); 
        return true;
    }
    else if(player === grid[1].innerHTML && grid[1].innerHTML === grid[4].innerHTML && grid[4].innerHTML === grid[7].innerHTML){   
        grid[1].classList.add('win');
        grid[4].classList.add('win');
        grid[7].classList.add('win'); 
        return true;
    }
    else if(player === grid[2].innerHTML && grid[2].innerHTML === grid[5].innerHTML && grid[5].innerHTML === grid[8].innerHTML)
    {   grid[2].classList.add('win');
        grid[5].classList.add('win');
        grid[8].classList.add('win'); 
        return true;}
    else if(player === grid[0].innerHTML && grid[0].innerHTML === grid[4].innerHTML && grid[4].innerHTML === grid[8].innerHTML){   
        grid[0].classList.add('win');
        grid[4].classList.add('win');
        grid[8].classList.add('win'); 
        return true;
    }
    else if(player === grid[2].innerHTML && grid[2].innerHTML === grid[4].innerHTML && grid[4].innerHTML === grid[6].innerHTML){   
        grid[2].classList.add('win');
        grid[4].classList.add('win');
        grid[6].classList.add('win');
        return true;
    }
    else
        return false;
}


function play(box_index){
    if(grid[box_index].classList.contains('selected')) return;

    grid[box_index].classList.add('selected');
    grid[box_index].innerHTML = 'X';
    unsetHover(box_index);
    avaliable_grid = remove(avaliable_grid, grid[box_index])
    if(checkWin('X')){
        document.querySelector('.result').innerHTML = 'You Win!';
        score.wins++;
        updateScore();
        localStorage.setItem('score', JSON.stringify(score));
        return;
    }

    let random_index = Math.trunc(Math.random()*avaliable_grid.length);
    if(avaliable_grid.length){
        avaliable_grid[random_index].classList.add('selected');
        avaliable_grid[random_index].innerHTML = 'O';
        avaliable_grid = remove(avaliable_grid, avaliable_grid[random_index])
        if(checkWin('O')){
            document.querySelector('.result').innerHTML = 'You Lose...';
            score.losses++;
            updateScore();
            localStorage.setItem('score', JSON.stringify(score));
        }
    }
    else{
        document.querySelector('.result').innerHTML = 'Its a tie';
        score.ties++;
        updateScore();
        localStorage.setItem('score', JSON.stringify(score));
    }

}

function playAgain(){
    avaliable_grid = [document.querySelector('.top_left'),
                    document.querySelector('.top_center'),
                    document.querySelector('.top_right'),
                    document.querySelector('.center_left'),
                    document.querySelector('.center_center'),
                    document.querySelector('.center_right'),
                    document.querySelector('.bottom_left'),
                    document.querySelector('.bottom_center'),
                    document.querySelector('.bottom_right')];
    document.querySelector('.result').innerHTML = '';
    for(let i=0; i<9; i++){
        grid[i].classList.remove('selected');
        grid[i].classList.remove('win');
        grid[i].innerHTML='.';
    }
}
function resetScore(){
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScore();
}