$(document).ready(function () {

    // VARIABLES
    // =====================================================================================================================


    // initial movies to be displayed as buttons
    var topics = ["The Shawshank Redemption", "The Godfather", "The Godfather: Part II", "The Dark Knight", "12 Angry Men",
        "Schindler's List", "The Lord of the Rings: The Return of the King", "Pulp Fiction", "The Good, the Bad, and the Ugly",
        "Fight Club"];


    // FUNCTIONS
    // =====================================================================================================================


    // create buttons dynamically
    function createButtons() {

        $(".button-list").empty(); // prevent repeat buttons on each submission

        for (var i = 0; i < topics.length; i++) { // creating a button for each item in topics array

            var topicButton = $("<button>");
            topicButton.addClass("btn btn-dark topic-btn");
            topicButton.attr("topic-data", topics[i]);
            topicButton.text(topics[i]);
            $(".button-list").append(topicButton);

        }

    }

    // display gifs of clicked buttons
    function displayGifs() {

        var selection = $(this).attr("topic-data");
        var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + selection + "&api_key=TxtD69JyrzOXwm3BZ7B0RU36mk5OTuuZ&limit=10";

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {

            console.log(response);
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                gifDiv.addClass("gif-data");

                var gifRating = $("<p>").text("Rating: " + results[i].rating);

                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_still.url);
                gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                gifImage.attr("data-animate", results[i].images.fixed_height.url);
                gifImage.attr("data-state", "still");
                gifImage.addClass("gif");

                gifDiv.append(gifImage);
                gifDiv.append(gifRating);
                $("#gif-display").prepend(gifDiv);

            }

        });

    }

    // toggle gifs between still and animated
    function toggleAnimation() {

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }

    }


    // FUNCTION EXECUTION
    // =====================================================================================================================


    // create initial set of buttons
    createButtons();

    // add buttons from search bar
    $("#topic-search").on("click", function () {

        event.preventDefault(); // prevent page reload on button click

        var searchTerm = $("#topic-text").val().trim(); // store search term in variable
        topics.push(searchTerm); // searchTerm added to topics array

        createButtons();

    })

    // click button to display gifs
    $(document).on("click", ".topic-btn", displayGifs);

    // click gif to toggle animation on or off
    $(document).on("click", ".gif", toggleAnimation);

    // must use $(document).on() for click events on elements that don't exist on page load (ex. .gif class) 
    // same for elements that are taken away and reappended (ex. .topic-btn class)
});