let currentCorrect = false;
var ts = Date.now();


function isCorrectAnswer() {
    console.log(this.value);
    console.log(game.question.answer);
    ts = Date.now();
    if (this.value == game.question.answer) {
        console.log("Correct")
        isTrue = true;
        game.correctAnswers++;
    } else {
        isTrue = false;
        game.wrongAnswers++;
    }

    currentCorrect = true;
    game.questionsAsked++;
    game.question = new Question();
    game.reset();
    game.generateBtns();

}

function test() {
    paused = false;
    setupGame = false;
}
class Game {
    constructor() {
        this.question;
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        this.questionsAsked = 1;
    }

    displayText() {

        if (currentCorrect == true && Date.now() - ts < 2000) {
            if (isTrue) {
                text(`Du svarede rigtigt`, 150, 300);
            } else {
                text(`Prøv igen`, 150, 300);
            }
        } else {
            currentCorrect == false
            clear();
        }

        textSize(32)
        text(this.question.questionText, 100, 100)
        textSize(20);
        text(`Antal korrekte svar: ${this.correctAnswers}`, 150, 150)
        text(`Antal forkerte svar: ${this.wrongAnswers}`, 150, 200)
        text(`Antal svar: ${this.questionsAsked}`, 150, 250)
    }

    gameSetup() {
        this.question = new Question();
        this.generateBtns();
    }

    createButtons(valwe) {
        var btn = createButton(valwe.toString());
        btn.value = valwe
        btn.mousePressed(isCorrectAnswer);
        btn.addClass("hello");
        //btn.parent('buttons-container');
    }

    reset() {
        var elements = document.getElementsByClassName("hello");
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
        clear();
    }



    generateBtns() {
        this.reset();
        var dup = false;
        var trued = false;
        do {
            if (x != 0 ) {
                this.reset();
            }
            for (var x = 0; x < 3; x++) {
                var tempWrongAnswer = this.question.answer - Math.floor(Math.random() * 50);
                var rand = Math.floor(Math.random() * 3);
                if (rand == 0 && dup != true) {
                    this.createButtons(this.question.answer)
                    trued = true;
                    dup = true;
                } else {

                    this.createButtons(tempWrongAnswer)
                }
            }
            x++;
        } while (trued != true && dup != true);

    }

    runm() {
        this.displayText()
    }
}

class Question {
    constructor() {
        this.answer;
        this.questionText;
        this.generateQuestion();
    }

    generateQuestion() {
        var number;
        var n1 = Math.floor(Math.random() * 100);
        var n2 = Math.floor(Math.random() * 100);

        this.answer = n1 + n2;
        this.questionText = `Hvad giver: ${n1} + ${n2}?`
    }
}


var paused = true;
var setupGame = true;
let game = new Game();


function setup() {
    createCanvas(500, 500);

  }
  
  function draw() {
    background(220);
    if (setupGame != true && paused != true) {
        game.gameSetup();
        setupGame = true;
    }
    if (paused != true) {
        game.runm()
    }
  }