$(document).ready(function() {
	var App = Backbone.Router.extend ({
		routes: {
			"": "home",
			"home": "home",
			"search/:query": "search"
		},

		home: function() {
			// console.log("home");
			$(".page").hide();
			$("#home").show();
			$("#display-results").html("");
		},

		search: function(query) {
			// console.log("search", query);
			$(".page").hide();
			$("#search").show();
		}
	});

	var myRouter = new App();
	Backbone.history.start();

	$("#search-form").on("submit", function(e) {
		var movieObj = {};
		e.preventDefault();

		var query = $("#query").val();
		// console.log(query);
		myRouter.navigate("search/"+query, {trigger: true});
		$.get(
			"http://www.omdbapi.com/",
			{
				s: $("#query").val(),
				type: "movie"
			},
			getMovies,
			"json"
			);
	});


	$("#go-back").on("click", function(e) {
		myRouter.navigate("home", {trigger: true});
		console.log("home");
		// $("#display-results").html("");



	});

	// var movieArray = [];

	function getMovies(movies) {
		var movieArray = [];
		console.log(movies);
		$("#display-results").html("");

		for (var i = 0; i<movies.Search.length; i++) {
			// console.log(JSON.stringify(movies.Search[i]));
			movieArray.push(movies.Search[i].imdbID);	

		}
		console.log(movieArray);
		for (var i = 0; i<movieArray.length; i++) {
			$.get("http://www.omdbapi.com/",
				{
					i: movieArray[i]
				},
				moviePosters,
				"json"
				);

		}

	}

// var returnString = [];

	function moviePosters(movies) {
		// var returnString = [];
		// console.log(returnString);
		// console.log(movies.Poster);
		// "<img src="+movies.Poster+">";
		return $("#display-results").append("<img src="+movies.Poster+">");

	}


});




