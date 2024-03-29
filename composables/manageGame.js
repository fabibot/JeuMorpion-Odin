
const manageGame = class {
    constructor() {
        this.nameToGreet1 = "Toto";
        this.nameToGreet2 = "Tata";
    }
    
    print1(){
        console.log(nameToGreet1) 
    }
    print2(){
        console.log(nameToGreet2) 
    }
}

function startGame0(){
    let isPlayer1Turn = true;
    roundCount = 0;
    // let nameToGreet1 = prompt("Player 1 name : ");
    // let nameToGreet2 = prompt("Player 2 name : ");
    let nameToGreet1 = "Toto";
    let nameToGreet2 = "Tata";
    const h3 = document.querySelector('#playerNames');
    caseGameList = [];

    const player1 = new Player(nameToGreet1, "X");
    const player2 = new Player(nameToGreet2, "O");
    // h3.textContent = player1.name + " VS " + player2.name;
    // displayPawnTurn.textContent = player1.pawn;


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

// export default { manageGame, test }
// export default class manageGame{}