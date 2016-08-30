console.log("ready!");

var config = {
    apiKey: "AIzaSyBTzm7Q1eXPJlfTmStn8JShwGUQWMejQ7I",
    authDomain: "trainscheduler-80d58.firebaseapp.com",
    databaseURL: "https://trainscheduler-80d58.firebaseio.com",
    storageBucket: "trainscheduler-80d58.appspot.com",
  };

firebase.initializeApp(config);
  
var database = firebase.database();

var trainName = "";
var destination = "";
var trainTime = "";
var frequency = "";
var minutesAway = "";

 $('#submitButton').on('click', function(event) {
  	event.preventDefault();

  	trainName = $('#inputTrainName').val().trim();
  	destination = $('#inputDestination').val().trim();
  	trainTime = $('#inputTrainTime').val().trim();
  	frequency = $('#inputFrequency').val().trim();

  	var newTrainInfo = {
  		name: trainName,
  		dest: destination,
  		time: trainTime,
  		freq: frequency
  	}

  	database.ref().push(newTrainInfo);

  	$('#inputTrainName').val("");
  	$('#inputDestination').val("");
  	$('#inputTrainTime').val("");
  	$('#inputFrequency').val("");
  });

  database.ref().on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	var newTrainName = childSnapshot.val().name;
	var newDestination = childSnapshot.val().dest;
	var newTrainTime = childSnapshot.val().time;
	var newFrequency = childSnapshot.val().freq;

	$('#head').append("<tr><td>" + newTrainTime + "</td><td>" + newDestination + "</td><td>" + newTrainTime + "</td><td>" + newFrequency + "</td></tr>");
  });

