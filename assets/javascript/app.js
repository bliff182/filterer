$(document).ready(function () {

    // initial movies to be displayed as buttons
    var topics = ["The Shawshank Redemption", "The Godfather", "The Godfather: Part II", "The Dark Knight", "12 Angry Men",
        "Schindler's List", "The Lord of the Rings: The Return of the King", "Pulp Fiction"/*, "The Good, the Bad, and the Ugly", 
    "Fight Club", "The Lord of the Rings: The Fellowship of the Ring", "Forrest Gump", "Joker", "Inception", "The Empire Strikes Back", 
    "The Lord of the Rings: The Two Towers", "The Matrix", "One Flew Over the Cuckoo's Nest", "Goodfellas", "Seven Samurai" */];

    // create buttons dynamically
    function createButtons() {
        $(".button-list").empty(); // prevent repeat buttons on each submission
        for (var i = 0; i < topics.length; i++) {
            var topicButton = $("<button>");
            topicButton.addClass("btn btn-info topic-btn");
            topicButton.attr("topic-data", topics[i]);
            topicButton.text(topics[i]);
            $(".button-list").append(topicButton);
        }
    }

    // display gifs of clicked buttons
    function displayGifs() {

        var selection = $(this).attr("topic-data");
        var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + selection + "&api_key=TxtD69JyrzOXwm3BZ7B0RU36mk5OTuuZ&limit=10";

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function(response) {

            console.log(response);

            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                // console.log(results[i].rating);
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_still.url);

                gifDiv.append(gifRating);
                gifDiv.append(gifImage);

                $("#gif-display").prepend(gifDiv);
            }

        });
    }

    // add buttons from search bar
    $("#movie-search").click(function () {
        event.preventDefault();
        var searchTerm = $("#movie-text").val().trim(); // store search term in movie variable
        topics.push(searchTerm);
        createButtons();
    })

    createButtons();
    $(".topic-btn").on("click", displayGifs);

});