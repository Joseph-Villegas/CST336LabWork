$(document).ready(function() {
    //Global Variables
    var score = 0;
    
    //Event Listeners...
    
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
             value="${q4ChoicesArray[i]}"> <label for="${q4ChoicesArray[i]}"> ${q4ChoicesArray[i]}</label>`);
       }
    }
    
    function isFormValid() {
       let isValid = true;
       if ($("#q1").val() == "") {
           isValid = false;
           $("#validationFdbk").html("Question 1 was not answered");
       }
       return isValid;
    }
    
    function rightAnswer(index) {
       $(`#q${index}Feedback`).html("Correct!");
       $(`#q${index}Feedback`).attr("class", "bg-success text-white");
       $(`#markImg${index}`).html("<img src='img/checkmark.png' alt='checkmark'>");
       score += 20;
    }
    
    function wrongAnswer(index) {
       $(`#q${index}Feedback`).html("Incorrect!");
       $(`#q${index}Feedback`).attr("class", "bg-warning text-white");
       $(`#markImg${index}`).html("<img src='img/xmark.png' alt='xmark'>");
    }
    
    function gradeQuiz() {
       $("#validationFdbk").html(""); //Resets the validation feedback
       
       if (!isFormValid()) {
           return;
       }
       
       //Variables...
       let q1Response = $("#q1").val().toLowerCase();
       let q2Response = $("#q2").val();
       let q4Response = $("input[name=q4]:checked").val();
       
       //Question 1...
       q1Response == "sacramento" ? rightAnswer(1) : wrongAnswer(1);
       
       //Question 2...
       q2Response == "mo" ? rightAnswer(2) : wrongAnswer(2);
       
       //Question 3...
       if ($("#Jefferson").is(":checked") && $("#Roosevelt").is(":checked")
           && !$("#Jackson").is(":checked") && !$("#Franklin").is(":checked")) {
               rightAnswer(3);
       } else {
           wrongAnswer(3);
       }
       
       //Question 4...
       q4Response == "Rhode Island" ? rightAnswer(4) : wrongAnswer(4);
       
       
       //Question 5...
       $("#seal2").css("background-color") == "rgb(255, 255, 0)" ? rightAnswer(5) : wrongAnswer(5);
         
       //Output total score...    
       $("#totalScore").html(`Total Score: ${score}`);
   }
});