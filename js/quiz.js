class Quiz {
    constructor() {
        this.correctAnswers;
        this.wrongAnswers;
        this.guesses;
        this.currentCorrectAnswer;
        this.currentQuestion;
        this.options = [".", ".", "."];
        this.generateQuestions();
        this.btns = [];
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
                this.btns.push(createButton(this.currentCorrectAnswer))
                // add attributes to btns
                // https://p5js.org/reference/#/p5/createButton
            }
            else if (this.options[rand] == ".") {
                this.options[rand] = this.currentCorrectAnswer - Math.floor(Math.random() * 50);
                this.btns.push(createButton(this.options.rand))
                // add attributes to btns
                // https://p5js.org/reference/#/p5/createButton
            }
            x++;
        } while (this.options[0] === "." || this.options[1] === "." || this.options[2] === ".");
        

        

        console.log(this.options);
        console.log(this.currentCorrectAnswer);
        console.log(tal_1, tal_2);
        console.log(this.currentQuestion)

    }

}