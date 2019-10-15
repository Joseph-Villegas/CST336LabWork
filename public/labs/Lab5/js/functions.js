$(document).ready(function (){
    
    $("#search").on('click', submitSearch);

    function submitSearch() {
        let query = $("#query").val();
        let orientation = $("#orientation").val();
        console.log(query, orientation);

        if (query === "") {
            // no input entered
            console.log("NO QUERY TEXT");
            return;
        }

        if (orientation === "") {
            // no orientation entered
            console.log("NO ORIENTATION SELECTED");
            return;
        }

        getImages(query, orientation, "13832434-d1a24747950bb1a91b3a9f59c");
    }

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
                console.log("AJAX Request couldn't be fulfilled!", xhr);
            }
        });
    }

    function process_image_results(response) {
        let hits = response["hits"];
        let img_count = 4;

        for (let i = 0; i < img_count; i++) {
            let img_data = hits[i];
            console.log(img_data);
            $(`#img${i+1}Likes`).html("Likes: " + img_data.likes);
            $(`#img${i+1}`).attr("src", img_data["webformatURL"]);
        }
        
        $("#orientation").prop('selectedIndex', 0);
    }
});