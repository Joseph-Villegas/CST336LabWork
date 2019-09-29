$(document).ready(function() {

    //Global Variables
    var score = 0;
    
    //Event Listeners...

    $(".q5-img").on('click', question5_toggle);

    //Submit quiz button
    $("#button").on("click", gradeQuiz);
    
    //Question 5 Images
    $(".q5Choice").on("click", function() {
       $(".q5Choice").css("background", "");
       $(this).css("background", "rgb(255, 255, 0)");
    });
    
    displayQ4Choices();
    
    //Functions
    function displayQ4Choices() {
       let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
       q4ChoicesArray = _.shuffle(q4ChoicesArray);
       
       for (let i = 0; i < q4ChoicesArray.length; i++) {
           $("#q4Choices").append(`<input type="radio" name="q4" id="${q4ChoicesArray[i]}"
             value="${q4ChoicesArray[i]}"> <label for="${q4ChoicesArray[i]}"> ${q4ChoicesArray[i]} </label>`);
       }
    }
    
    function isFormValid() {
       if ($("#q1").val() == "") {
           $("#validationFdbk").html("Question 1 was not answered").show();
           return false;
       }
       if ($('#q2').text().toLowerCase() === "select one") {
           $("#validationFdbk").html("Question 2 was not answered").show();
           return false;
       }
       if ($("input[type=radio]:checked").length === 0) {
           $("#validationFdbk").html("Question 3 was not answered").show();
           return false;
       }
       if ($("input[type=checkbox]:checked").length === 0) {
           $("#validationFdbk").html("Question 4 was not answered").show();
           return false;
       }
       if ($(".q5-selected").length === 0) {
           $("#validationFdbk").html("Question 5 was not answered").show();
           return false;
       }
       return true;
    }
    
    function rightAnswer(index) {
       $(`#q${index}Feedback`).html("Correct!");
       $(`#q${index}Feedback`).attr("class", "alert alert-success mt-3");
       $(`#markImg${index}`).attr("src", "img/checkmark.png");
       score += 20;
    }
    
    function wrongAnswer(index) {
       $(`#q${index}Feedback`).html("Incorrect!");
       $(`#q${index}Feedback`).attr("class", "alert alert-danger mt-3");
       $(`#markImg${index}`).attr("src", "img/xmark.png");
    }
    
    function gradeQuiz(e) {
        e.preventDefault();

        score = 0;

       $("#validationFdbk").html("").hide(); //Resets the validation feedback
       
       if (!isFormValid()) {
           return;
       }
       
       //Variables...
       let q1Response = $("#q1").val().toLowerCase();

       let q2Response = $("#q2").text().toLowerCase();

       let q3Response = $("input[type=radio]:checked")[0].id;

        let q4Response = "";
        $("input[type=checkbox]:checked").each(function() {
            q4Response += $(this).val();
        });

       let q5Response = $(".q5-selected")[0].id;

       //Question 1...
       q1Response == "sacramento" ? rightAnswer(1) : wrongAnswer(1);

       //Question 2...
       q2Response == "missouri" ? rightAnswer(2) : wrongAnswer(2);
       
        //Question 4...
        q3Response == "Rhode Island" ? rightAnswer(3) : wrongAnswer(3);
       
        //Question 4...
        q4Response == "cd" ? rightAnswer(4) : wrongAnswer(4);
       
       //Question 5...
       q5Response == "s2" ? rightAnswer(5) : wrongAnswer(5);
         
       //Output total score...    
       $("#totalScore").html(`The total score is: ${score}`);
       $("#totalScore").show();

       getHistory();

   }

   function question5_toggle(e) {

        if (!e.target.id) {
            return;
        }

        let source = $("#" + e.target.id).last();

        if (source.hasClass("q5-selected"))
            return;

        $(".q5-selected").removeClass("q5-selected");

        source.addClass("q5-selected");
   }

   function getHistory() {
        if (localStorage) {
            if (localStorage.getItem("attemptsText")) {
                let aggString = localStorage.getItem("attemptsText");
                aggString += ", " + score;

                let aggNumber = parseInt(localStorage.getItem("attemptsNumber")) + 1;

                localStorage.setItem("attemptsText", aggString);
                localStorage.setItem("attemptsNumber", aggNumber);
            } else {
                localStorage.setItem("attemptsText", score);
                localStorage.setItem("attemptsNumber", 1);
            }

            $("#totalTaken").html(`Quiz Taken: ${localStorage.getItem("attemptsNumber")} time(s)`);
            $("#totalTaken").show();

            $("#totalSummary").html(`Score History: ${localStorage.getItem("attemptsText")}`);
            $("#totalSummary").show();
        }
   }

});