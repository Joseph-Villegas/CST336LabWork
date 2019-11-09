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
    
    displayQ3Choices();
    
    //Functions
    function displayQ3Choices() {
       let q3ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
       q3ChoicesArray = _.shuffle(q3ChoicesArray);
       
       for (let i = 0; i < q3ChoicesArray.length; i++) {
           $("#q3Choices").append(`<input type="radio" name="q3" id="${q3ChoicesArray[i]}"
             value="${q3ChoicesArray[i]}"> <label for="${q3ChoicesArray[i]}"> ${q3ChoicesArray[i]} </label>`);
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

        $.ajax({
            url: "./grade",
            type: "get",
            data: {
                Q1: q1Response,
                Q2: q2Response,
                Q3: q3Response,
                Q4: q4Response,
                Q5: q5Response
            },
            success: function(response) {
                process_grading(response);
            },
            error: function(xhr) {
                console.log("AJAX Request couldn't be fulfilled!", xhr);
            }
        });
   }

   function process_grading(data) {
        data = JSON.parse(data);

        console.log(data);

        data["R1"] ? rightAnswer(1) : wrongAnswer(1);

        data["R2"] ? rightAnswer(2) : wrongAnswer(2);

        data["R3"] ? rightAnswer(3) : wrongAnswer(3);

        data["R4"] ? rightAnswer(4) : wrongAnswer(4);

        data["R5"] ? rightAnswer(5) : wrongAnswer(5);

       //Output total score...
       $("#totalScore").html(`The total score is: ${data["Points"]}`);
       $("#totalScore").show();
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

});