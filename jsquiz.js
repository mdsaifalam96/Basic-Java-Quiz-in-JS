
var questions = [{
    question: "Q 1 - What of the following is the default value of an instance variable?",
    choices: ["null", "0", "Depends upon the type of variable", "Not assigned"],
    correctAnswer: 2
}, {
    question: "Q 2 - What is the size of double variable?",
    choices: ["8 bit", "16 bit", "32 bit", "64 bit"],
    correctAnswer: 3
}, {
    question: "Q 3 - What is correct syntax for main method of a java class?",
    choices: ["public static int main(String[] args)", "public int main(String[] args)", "public static void main(String[] args)","None of the above."],
    correctAnswer: 2
}, {
    question: "Q 4 - Which of the following is not a keyword in java?",
    choices: ["static", "Boolean", "void", "private"],
    correctAnswer: 1
}, {
    question: "Q 5 - What is a class in java?",
    choices: [" A class is a blue print from which individual objects are created. A class can contain fields and methods to describe the behavior of an object.", "class is a special data type.", "class is used to allocate memory to a data type.", "none of the above."],
    correctAnswer: 0
}, {
    question: "Q 6 - Primitive variables are stored on Stack.",
    choices: ["True", "False"],
    correctAnswer: 0	
	
}, {
    question: "Q 7 - Objects are stored on Stack.",
    choices: ["True", "False"],
    correctAnswer: 1	
}, {
    question: "Q 8 - Static functions can be accessed using null reference.",
    choices: ["True", "False"],
    correctAnswer: 1
}, {
    question: "Q 9 - What of the following is the default value of an instance variable?",
    choices: ["null", "0", "Depends upon the type of variable", "Not assigned"],
    correctAnswer: 2

}, {
    question: "Q 10 - Is an empty .java file a valid source file?",
    choices: ["True", "False"],
    correctAnswer: 0

}, {
    question: "Q 11 - Can we have multiple classes in same java file?",
    choices: ["True", "False"],
    correctAnswer: 0

	}, {
    question: "Q 12 - Can we have two public classes in one java file?",
    choices: ["True", "False"],
    correctAnswer: 1
     }, {
        question: "Q 13 - What is the default value of byte variable?",
        choices: ["0", "0.0","null","undefined"],
        correctAnswer: 0
    
    }, {
        question: "Q 14 - What is the default value of short variable?",
        choices: ["0", "0.0","null","undefined"],
        correctAnswer: 1
    
       }, {
        question: "Q 15 - What is the default value of int variable?",
        choices: ["0", "0.0","null","undefined"],
        correctAnswer: 0
    
}];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function () {

    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();

    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function () {
        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } else {
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                $(document).find(".quizMessage").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }

                currentQuestion++; // Since we have already displayed the first question on DOM ready
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    //                    $(document).find(".nextButton").toggle();
                    //                    $(document).find(".playAgainButton").toggle();
                    // Change the text in the next button to ask if user wants to play again
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                }
            }
        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

});

// This displays the current question AND the choices
function displayCurrentQuestion() {

    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}