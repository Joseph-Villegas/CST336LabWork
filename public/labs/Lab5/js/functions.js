$(document).ready(function (){
    
    // $("#search").on("click", function() {
    //     $.ajax({
    //           method: "GET",
    //              url: "https://pixabay.com/api/",
    //         dataType: "json",
    //             data: { 
    //                 "key": "13859719-acf946e9bc6f552b8006fcd5f",
    //                 "orientation": $("#orientation").val(),
    //                 "q": $("#keyword").val()
                        
    //             },
    //          success: function(result,status) {
    //              console.log("result", result);
                 
                 
    //                 //  for(let i = 0; i < 4; i++) {
    //                 //      //$(`#img${i+1}`).attr("src", result[i].webformatURL);
    //                 //      console.log("result 1: ", result[i]);
    //                 //  }
    //             } 
    //         });
    // });
    
    var API_KEY = '13859719-acf946e9bc6f552b8006fcd5f';
    var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent('red roses');
    $.getJSON(URL, function(data){
    if (parseInt(data.totalHits) > 0)
        $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
    else
        console.log('No hits');
    });
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
//13859719-acf946e9bc6f552b8006fcd5f
    // function getImages(searchText, orientation, apiKey) {
    //     let url_pix = "https://pixabay.com/api/";
    //     $.ajax({
    //         url: url_pix,
    //         type: "get",
    //         data: {
    //             key: apiKey,
    //             orientation: orientation,
    //             q: searchText
    //         },
    //         success: function(response) {
    //             process_image_results(response);
    //         },
    //         error: function(xhr) {
    //             console.log("AJAX Request couldn't be fulfilled!", xhr);
    //         }
    //     });
    // }

    // function process_image_results(response) {
    //     console.log("response", response);
    // }
});