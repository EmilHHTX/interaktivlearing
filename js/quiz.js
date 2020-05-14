



class Quiz {
    constructor() {
        this.correctAnswers;
        this.wrongAnswers;
        this.guesses;
        this.currentCorrectAnswer;
        this.currentQuestion;
        this.options;
        this.btns = [];

    }



    displayText() {
        textSize(32);
        text(this.currentQuestion, 100, 100);

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
        var tal_1 = Math.floor(Math.random() * 100);
        var tal_2 = Math.floor(Math.random() * 100);

        this.currentCorrectAnswer = tal_1 + tal_2;
        this.currentQuestion = `Hvad giver: ${tal_1} + ${tal_2}?`

        var x = 0;
        var btxX = 100;
        do {
            var rand = Math.floor(Math.random() * 3);
            if (this.options[rand] == "." && x == 0) {
                
                this.options[rand] = this.currentCorrectAnswer;
                this.btns[rand] = createButton(this.currentCorrectAnswer.toString());
                this.btns[rand].value = this.currentCorrectAnswer.toString();
                this.btns[rand].mousePressed(isCorrectAnswer);
                this.btns[rand].addClass("hello");
                this.btns[rand].parent('buttons-container');
                btxX += 132;
            
            } else if (this.options[rand] == ".") {
                
                var tempWrongAnswer = this.currentCorrectAnswer - Math.floor(Math.random() * 50);
                this.options[rand] = tempWrongAnswer;
                this.btns[rand] = createButton(this.options[rand].toString(), );
                this.btns[rand].value = tempWrongAnswer.toString();
                this.btns[rand].mousePressed(isCorrectAnswer);
                this.btns[rand].addClass("hello");
                this.btns[rand].parent('buttons-container');
                btxX += 132;
            
            }
            
            x++;
        
        } while (this.options[0] === "." || this.options[1] === "." || this.options[2] === ".");
    }

    nextQuestion(correct) {
        if (correct) {
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

function isCorrectAnswer() {
    var guessed;
    if (this.value == quiz.currentCorrectAnswer) {
        guessed = true;
    } else {
        console.log("You got it wrong");
        guessed = false;
    }
    quiz.nextQuestion(guessed);
    
}