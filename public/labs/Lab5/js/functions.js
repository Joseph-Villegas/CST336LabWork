$(document).ready(function (){

    function getImages(searchText, orientation, apiKey) {
        let url_pix = 'https://pixabay.com/api/';
        $.ajax({
            url: url_pix,
            type: "get",
            data: {
                key: apiKey,
                orientation: orientation,
                q: searchText
            },
            success: function(response) {
                process_image_results(response);
            },
            error: function(xhr) {
                console.log("AJAX Request couldn't be fulfilled!", xhr)
            }
        });
    }

    function process_image_results(response) {
        console.log("response", response);
    }
});