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
		console.log("home")
	});

	var movieArray = [];

	function getMovies(movies) {
		console.log(movies);
		var returnString = "<ul>"
		for (var i = 0; i<movies.Search.length; i++) {
			console.log(movies.Search[i]);
			console.log(movies.Search[i].Title);
			returnString += "<li>"+movies.Search[i].Title+"</li>"
			// $("#search").html(movies.Search[i].Title);
			// movieArray.push(movies.Search[i]);
		}
		returnString += "</ul>"
		console.log(returnString);
		return $("#search").html(returnString);

	}

	function displayMovies(movies) {
		
	}



});






