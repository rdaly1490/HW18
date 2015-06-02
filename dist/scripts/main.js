$(document).ready(function() {
	var App = Backbone.Router.extend ({
		routes: {
			"": "home",
			"home": "home",
			"search/:query": "search"
		},

		home: function() {
			console.log("home");
			$(".page").hide();
			$("#home").show();
		},

		search: function(query) {
			console.log("search", query);
			$(".page").hide();
			$("#search").show();
		}
	});

	var myRouter = new App();
	Backbone.history.start();

	$("#search-form").on("submit", function(e) {
		e.preventDefault();
		var query = $("#query").val();
		console.log(query);
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
		console.log("home")
	});


	function getMovies(movies) {
		console.log(movies);

		for (var i = 0; i<movies.Search.length; i++) {
			console.log(movies.Search[i].Title);
		}

	}



});






