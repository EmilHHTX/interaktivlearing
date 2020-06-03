// Definere variabler der bliver brugt til at se om ens svar er rigtigt senere i programmet
let currentCorrect = false;
let isTrue = false;
var ts = Date.now();

// En funktion der tjekker om svaret er rigtigt, funktionen bliver kørt af en knap
// derfor når der stå "this" så referer den til knappen og ikke et objekt fra en klasse vi selv har lavet
function isCorrectAnswer() {
    // definere en variable der se om svarret er rigtigt
    var guessed;
    // tjekker om knappens værdi er det samme som objetet "quiz" rigtige svar, som bliverr defineret i "genereateQuestions" funktionen
    if (this.value == quiz.currentCorrectAnswer) {
        this.style.background = '#000000';
        // sætter variabler til true, hvis den er rigtig som bliver brugt til at vise tekst senere i programmet
        guessed = true;
        isTrue = true;
    } else {
        console.log("You got it wrong");
        // giver knappen HTML klassen "wrong" der bliver brugt til at style knappen
        this.addClass = "wrong"
        guessed = false;
        isTrue = false;
    }
    // gemmer tiden i en variable da det bliver brugt til at udregne hvor lang tid noget tekst skal være på skærmen
    ts = Date.now();
    currentCorrect = true;
    // Gør klar til at generere det næste spørgsmål
    quiz.nextQuestion(guessed);
    
}
// Klassen "Quiz" det indeholder alt der skal til for at programmet kan køre
class Quiz {
    // Constructor derr bliver kørt når man skaber et objekt af denne klasse
    constructor() {
        // Statistik variabler
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        this.guesses = 0;
        // variabler der indeholder det nuværende spørgsmål og svaret
        this.currentCorrectAnswer; // Type: int
        this.currentQuestion; // Type: String
        this.options; // Type: array
        this.btns; // Type: array

    }
    // Laver knapperne man kan trykke på, og indsætter dem på skærmen
    // Funktionen tager to parametre
    createButtons(index, answer) {
        // Indsætter variablen "answer" i listen "options" der er en attribute af Quiz-objektet
        this.options[index] = answer
        // Kalder en P5 funktion der laver en knap, den tager en parametre i form af en String
        this.btns[index] = createButton(answer.toString());
        // Sætter knappens værdi til "answer" parameteret, det gør jeg sådan jeg kan sammenligne det med det rigtige svar senere
        this.btns[index].value = answer.toString();
        // Sætter hvilken funkion der skal køres når man trykker på knappen
        this.btns[index].mousePressed(isCorrectAnswer);
        // Giver knappen HTML klassen "hello", hvor den får noget styling
        this.btns[index].addClass("hello");
        // Indsæter knappen et bestemt sted på hjemmsiden
        this.btns[index].parent('buttons-container');
    }

    // Funktion der indsætter alt den tekst der vises på skærmen
    displayText() {

        // Tjekker om man har svaret det sidste spørgsmål korrekt og om der er gået mere end 2 sekunder
        
        if (currentCorrect == true && Date.now() - ts < 2000) {
            // Hvis den ovenstående statement er true så tjekker den så indsætter den tekst alt efter om man svarede rigtigt
            // på det pågældende spørgsmål
            if (isTrue) {
                text(`Du svarede rigtigt`, 180, 300);
            } else {
                text(`Prøv igen`, 180, 300);
            }
        // Hvis der er gået mere end 2 sekunder så bliver skærmen resetetet og man kan ikke længere se om man har svaret rigtigt
        // på det sidste spørgsmål man svarede på    
        } else {
            isTrue = false;
            currentCorrect == false
            // "clear" er en indbygget funktion der kommer med P5 frameworket 
            clear();
        }
        // indsætter et billede som baggrund på skærmen
        image(img, 0, 0, screenwidth, screenheight);
        // indsætter alt tekst på skærmen og giver det rigtige font-størrelser
        textSize(32);
        text(this.currentQuestion, 120, 100);
        textSize(20);
        text(`Spørgsmål stillet: ${this.guesses}`, 165, 150);
        text(`Rigtige svar: ${this.correctAnswers}`, 185, 200);
        text(`Forkerte svar: ${this.wrongAnswers}`, 180, 250);
        
    }
    // er en funktion der fjerner knapperne fra skærmen når man har besvaret et spørgsmål
    reset() {
        // får alle knapperne der har klassen "hello" (som var svarmulighederne blev givet ovenfor) og gemmer dem som et array i variablen "elements"
        var elements = document.getElementsByClassName("hello");
        // kører et while-loop som kører så længe der er elementer(knapper) i "elements" og fjerner dem fra siden
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
        // rydder skærmen med inbygget "clear" funktion
        clear();
        
        // reseter de 2 arrays der er på objektet
        this.btns = ["", "", ""];
        this.options = [".", ".", "."];
    }
    // generer det spørrgsmål brugeren skal svare på
    generateQuestions() {
        // kører reset funktionen der sørger for at der skærmen er tom 
        this.reset();
        // opretter lokale variabler der er med til at tjekke om der bliver lavet duplikationer af svarmulighederne
        var dup = false;
        var trued = false;

        // variabel der gemmer om regnestykket skal være plus eller minus
        var operator;

        // gemmer to tilfældige tal mellem 0 og 100
        var tal_1 = Math.floor(Math.random() * 101);
        var tal_2 = Math.floor(Math.random() * 101);

        // generere tal mellem 0 og 1 der bliver brugt til at bestemme om spørgsmålet skal være plus eller minus
        var randOperator = Math.floor(Math.random() * 2);

        // hvis ovenstående er 1 så bliver regnestykkett plus ellers bliver det minus
        if (randOperator == 1) {
            this.currentCorrectAnswer = tal_1 + tal_2;
            operator = "+";
        } else {
            this.currentCorrectAnswer = tal_1 - tal_2;
            operator = "-";
        } 
        // gemmer spørsmålet som string så det kan blive vist il brugeren
        this.currentQuestion = `Hvad giver: ${tal_1} ${operator} ${tal_2}?`
        var x = 0;
        // kører et do-while loop
        do {
            // tjekker om det er blevet kørt før, hvis det ikke er forsætter programmet, hvis det er så resetter programmet skærmen
            if (x != 0 ) {
                this.reset();
            }
            // kører et for-loop der kører 3 gange
            for (var x = 0; x < 3; x++) {
                // laver en variabel der bruges til at gemme et forkert svar som kan indsættes på siden som forkert svarmulighed
                var tempWrongAnswer;
                // generer tal mellem 0 og 2 der bestemmer om det forkerte svar skal plusses eller minusses med det rigtige
                // for at producere et svæere spørgsmål
                var randOperator = Math.floor(Math.random() * 2);
                // hvis ovenstående variabel er 1 så bliverr det forkeret svar lig et ttilfældigt tal mellem 0 og 50 trukket fra det rigtige svar
                if (randOperator == 1) {
                    tempWrongAnswer = this.currentCorrectAnswer - Math.floor(Math.random() * 51);
                // ellers bliver det lagt til det rigtige svar, med et tal mellem 0 og 50
                } else {
                    tempWrongAnswer = this.currentCorrectAnswer + Math.floor(Math.random() * 51);
                } 

                // generere et ttilfældigt tal mellem 0 og 3
                var rand = Math.floor(Math.random() * 3);
                // tjekker om tallet er 0 og at denne del ikke allerede er kørt, så det rigtige spørrgsmål ikke altid er det samme sted på siden
                if (rand == 0 && dup != true) {
                    // laver knap med det rigtige svar
                    this.createButtons(rand, this.currentCorrectAnswer)
                    trued = true;
                    dup = true;
                } else {
                    // ser hvilken posistion i "options" arrayet knappen skal være i
                    var rand2 = Math.floor(Math.random() * 2);
                    if (rand2 == 0) {
                        this.createButtons(1, tempWrongAnswer);
                    } else {
                        this.createButtons(2, tempWrongAnswer);
                    }
                }
            }
            // plusser x med 1 så jeg kan tjekke om programmet er blevet kørt først
            x++;
        // denne statement sørger for at det rigtige svar bliver indsat på siden
        } while (trued != true && dup != true);
        
    }
    // Denne funktion tjekker om man har svaret rigtigt, og opdatere ens statistikker
    nextQuestion(correct) {
        // hvis en svar er rigigt får man et point som er markerett som rigtigt og bliver vist på skærmen
        if (correct != false) {
            this.correctAnswers++;
        // ellers får man et point som bliver vist som forkert på skærmen
        } else {
            this.wrongAnswers++;
        }
        // opdaterer hvor mange spørgsmål man harr svaret på
        this.guesses++;
        // laver et nyt spørgsmål
        this.generateQuestions();
    }
    // funktion der kun bliver kørt en gang, og der er for at lavet et setup 
    gameSetup() {
        console.log("All set up!")
        // generere dett første spørgsmål
        this.generateQuestions();
    }
    // bliver kørt hele tiden
    gameRunner() {
        // viser teksten på skærmen
        this.displayText();
    }

}
// laver "quiz" objektet fra klassen "Quiz"
var quiz = new Quiz();
// sætter højden og bredden på skærmen
var screenwidth = 500;
var screenheight =  500;
// variabel som gemmer baggrundsbilledet
let img;
// bliver kørt før "setup" og "draw" funktionen, det er en indbygget funktion i P5
function preload() {
    // loader baggrundsbilledet
    img = loadImage('../js/spog.png');
  }

// laver setup af spillet. er en indbygget  funktion i  P5 
function setup() {
    let can = createCanvas(screenwidth, screenheight);
    can.parent('canvas-container');
    quiz.gameSetup();

}

// kører 60 gange i sekundet. er en indbygget  funktion i  P5 
function draw() {
    // kalder "gameRunner" på objektet "quiz" denne  funktion kører 60 gange i sekundet.
    quiz.gameRunner();
}


