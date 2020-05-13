var guessed = null;

function isCorrectAnswer() {
    console.log(this.value)
    if (this.value == quiz.currentCorrectAnswer.toString()) {
        console.log("You guessed it");
        guessed = true;
    } else {
        console.log("You got it wrong");
        guessed = false;
    }
}

class Quiz {
    constructor() {
        this.correctAnswers;
        this.wrongAnswers;
        this.guesses;
        this.currentCorrectAnswer;
        this.currentQuestion;
        this.options = [".", ".", "."];
        this.btns = ["", "", ""];
        this.generateQuestions();
    }

    displayText() {
        textSize(32);
        text(this.currentQuestion, 50, 100);
    }



    generateQuestions() {
        var tal_1 = Math.floor(Math.random() * 100);
        var tal_2 = Math.floor(Math.random() * 100);

        this.currentCorrectAnswer = tal_1 + tal_2;
        this.currentQuestion = `Hvad giver: ${tal_1} + ${tal_2}?`

        var x = 0;
        do {
            var rand = Math.floor(Math.random() * 3);
            console.log("rand: ", rand);
            if (this.options[rand] == "." && x == 0) {
                this.options[rand] = this.currentCorrectAnswer;
                this.btns[rand] = createButton(this.currentCorrectAnswer.toString());
                this.btns[rand].value = this.currentCorrectAnswer.toString();
                this.btns[rand].mousePressed(isCorrectAnswer);
            }
            else if (this.options[rand] == ".") {
                var tempWrongAnswer = this.currentCorrectAnswer - Math.floor(Math.random() * 50);
                this.options[rand] = tempWrongAnswer;
                this.btns[rand] = createButton(this.options[rand].toString(), );
                this.btns[rand].value = tempWrongAnswer.toString();

                this.btns[rand].mousePressed(isCorrectAnswer);
            }
            x++;
        } while (this.options[0] === "." || this.options[1] === "." || this.options[2] === ".");
        

        for (let i = 0 ; i < 3 ; i++) {
            console.log(this.btns.value);
        }
        
        /*
        console.log(this.options);
        console.log(this.currentCorrectAnswer);
        console.log(tal_1, tal_2);
        console.log(this.currentQuestion)
        */

    }

}