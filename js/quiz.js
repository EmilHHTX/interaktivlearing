let currentCorrect = false;
let isTrue = false;
var ts = Date.now();

function sleep(miliseconds) {
    var currentTime = new Date().getTime();
 
    while (currentTime + miliseconds >= new Date().getTime()) {
    }
 }


function isCorrectAnswer() {
    var guessed;
    if (this.value == quiz.currentCorrectAnswer) {
        console.log("correct!")
        this.style.background = '#000000';
        console.log(this.value)
        guessed = true;
        isTrue = true;
        ts = Date.now();
    } else {
        console.log("You got it wrong");
        this.addClass = "wrong"
        guessed = false;
        isTrue = false;
        ts = Date.now();
    }
    currentCorrect = true;
    quiz.nextQuestion(guessed);
    
}
class Quiz {
    constructor() {
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        this.guesses = 0;
        this.currentCorrectAnswer;
        this.currentQuestion;
        this.options;
        this.btns;

    }

    createButtons(index, answer) {
        this.options[index] = answer
        this.btns[index] = createButton(answer.toString());
        this.btns[index].value = answer.toString();
        this.btns[index].mousePressed(isCorrectAnswer);
        this.btns[index].addClass("hello");
        this.btns[index].parent('buttons-container');

    }


    displayText() {
        console.log(Date.now() - ts)
        if (currentCorrect == true && Date.now() - ts < 2000) {
            if (isTrue) {
                text(`Du svarede rigtigt`, 180, 300);
            } else {
                text(`Prøv igen`, 180, 300);
            }
            
            
        } else {
            currentCorrect == false
            clear();
        }
        textSize(32);
        text(this.currentQuestion, 120, 100);
        textSize(20);
        text(`Spørgsmål stillet: ${this.guesses}`, 165, 150)
        text(`Rigtige svar: ${this.correctAnswers}`, 185, 200)
        text(`Forkerte svar: ${this.wrongAnswers}`, 180, 250)
        
        

        // indsæt hvor mange rigtige man har osv
    }

    reset() {
        var elements = document.getElementsByClassName("hello");
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
        clear();
        
        this.btns = ["", "", ""];
        this.options = [".", ".", "."];
    }
    generateQuestions() {
        this.reset();
        var dup = false;
        var trued = false;
        var tal_1 = Math.floor(Math.random() * 100);
        var tal_2 = Math.floor(Math.random() * 100);

        this.currentCorrectAnswer = tal_1 + tal_2;
        this.currentQuestion = `Hvad giver: ${tal_1} + ${tal_2}?`
        var x = 0;
        do {
            if (x != 0 ) {
                this.reset();
            }
            for (var x = 0; x < 3; x++) {
                var tempWrongAnswer = this.currentCorrectAnswer - Math.floor(Math.random() * 50);
                var rand = Math.floor(Math.random() * 3);
                if (rand == 0 && dup != true) {
                    this.createButtons(rand, this.currentCorrectAnswer)
                    trued = true;
                    dup = true;
                } else {
                    var rand2 = Math.floor(Math.random() * 2);
                    if (rand2 == 0) {
                        this.createButtons(1, tempWrongAnswer)
                    } else {
                        this.createButtons(2, tempWrongAnswer)
                    }
                }
            }
            x++;
        } while (trued != true && dup != true);
        
    }
    nextQuestion(correct) {
        if (correct != false) {
            this.correctAnswers++;
        } else {
            this.wrongAnswers++;
        }
        this.guesses++;
        this.generateQuestions();
    }

    gameSetup() {
        console.log("All set up!")
        this.generateQuestions();
    }

    gameRunner() {
        this.displayText();
    }

}


