const startButton = document.querySelector('.startButton');
const hiddenElements = document.querySelectorAll('.hiddenFirst');
const restartButton = document.querySelector('#restart');

startButton.addEventListener('click', () =>{
    hiddenElements.forEach((element) => element.style.visibility = "visible");
    startButton.style.visibility = "hidden";
    startGame();
})

restartButton.addEventListener('click', () => {
    let screenCase = document.querySelectorAll(".case");
    screenCase.forEach((elements) => { elements.textContent = "";
    let textEnd = document.querySelector('.textEnd');
    if(textEnd){
        textEnd.remove();
    }
});
    startGame();
});

let allCaseList = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3' ];
let caseGameList = [];
const displayPawnTurn = document.querySelector('#pawnTurn');
let roundCount;
let maxRound = 9;
const gameBoard = {
    case : "ABC",
    jeu : null
}

function Player(name, pawn){
    this.name = name;
    this.pawn = pawn;
}

function startGame(){
    let isPlayer1Turn = true;
    roundCount = 0;
    let nameToGreet1 = prompt("Player 1 name : ");
    let nameToGreet2 = prompt("Player 2 name : ");
    const h3 = document.querySelector('#playerNames');
    caseGameList = [];

    const player1 = new Player(nameToGreet1, "X");
    const player2 = new Player(nameToGreet2, "O");
    h3.textContent = player1.name + " VS " + player2.name;
    displayPawnTurn.textContent = player1.pawn;


    for (let i = 0; i < 9; i++){ 
        caseGameList[i] = Object.create(gameBoard);
        caseGameList[i].case = allCaseList[i];
    }

    let caseClicked;
    let screenCase = document.querySelectorAll(".case");
    screenCase.forEach((elements) => { elements.addEventListener('click', function(){
        caseClicked = elements.getAttribute('id');
        if(isPlayer1Turn){
            addPawnToScreen(elements, player1);
           turn(player1, caseClicked); 
           screenCase.textContent = "x";
           displayPawnTurn.textContent = player2.pawn;
           isPlayer1Turn = false;
        }
        else{
            addPawnToScreen(elements, player2);
            turn(player2, caseClicked);
            displayPawnTurn.textContent = player1.pawn;
            isPlayer1Turn = true;
        }
        });
    });   
}

function turn(player, caseClicked){
    if(checkCase(player, caseClicked)){
        roundCount++; 
        if(checkForWinner(player)){
            endOfTheGame(player);
        } else if (!checkForWinner(player)) {
            console.log(roundCount, maxRound);
            if (roundCount == maxRound){
                endOfTheGame();
            }
        }
    };
}

function addPawnToScreen(elementCase, player){
    let divText = document.createElement("h2");
    divText.classList.add(".pawn")
    divText.textContent = player.pawn;
    elementCase.appendChild(divText);
    elementCase.replaceWith((elementCase.cloneNode(true)));

}

function checkCase(player, playerMove){
    for (let i = 0; i < caseGameList.length; i++){
        if(caseGameList[i].case == playerMove){
            if(caseGameList[i].jeu == null){
                caseGameList[i].jeu = player.pawn;
                return true;
            } else {
                return false;
            }
        }
    }
}

function checkForWinner(player){
    let winner = false;
    const caseX = caseGameList.filter((caseGameList) => caseGameList.jeu == player.pawn);
    let combinaisonTotal = "";
    for(const items of caseX){
        combinaisonTotal = combinaisonTotal + items.case;
    }
    let gridRef = ['A', 'B', 'C', '1', '2', '3'];
    let diagonal1 = ['A1', 'B2', 'C3'];
    let diagonal2 = ['A3', 'B2', 'C1'];
    for (const elements of gridRef){
        let found = combinaisonTotal.split(elements).length - 1;
        const isInArray = (currentValue) => combinaisonTotal.includes(currentValue);
        if (found == 3 || diagonal1.every(isInArray) || diagonal2.every(isInArray)){
            return winner = true;
        } 
    } 
    return winner;
}

function endOfTheGame(winner){
    let declareWinner = document.createElement("div");
    declareWinner.classList.add("textEnd");
    if (!winner){
        declareWinner.textContent = "Egality.";
        document.body.appendChild(declareWinner);
        console.log("Egality.")
    } else{ 
        declareWinner.textContent = "The winner is " + winner.name;
        document.body.appendChild(declareWinner);
        console.log("The winner is " + winner.name);
    }
    let screenCase = document.querySelectorAll(".case");
        screenCase.forEach((elements) => { elements.replaceWith(elements.cloneNode(true));
    });
}


//le message égalité apparait pas quand on remplie tout les cases (c'est parce que 
// j'ai supprimé l'le endofthegame qui s'active quand on a atteint le nombre max de round (il n'y a plus 
// de totalRound et roundConter))
