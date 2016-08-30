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
var frequency = 0;


 $('#submitButton').on('click', function(event) {
  	event.preventDefault();

  	trainName = $('#inputTrainName').val().trim();
  	destination = $('#inputDestination').val().trim();
  	trainTime = $('#inputTrainTime').val().trim();
  	frequency = $('#inputFrequency').val().trim();

		// First Time (pushed back 1 year to make sure it comes before current time)
		var firstTimeConverted = moment(trainTime,"hh:mm").subtract(1, "years");
		console.log(firstTimeConverted);

		// Current Time
		var currentTime = moment();
		console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

		// Difference between the times
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		console.log("DIFFERENCE IN TIME: " + diffTime);

		// Time apart (remainder)
		var tRemainder = diffTime % frequency;
		console.log(tRemainder);

		// Minute Until Train
		var tMinutesTillTrain = frequency - tRemainder;
		console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
		var comingTrain = tMinutesTillTrain;

		// Next Train
		var nextTrainTime = moment().add(tMinutesTillTrain, "minutes")
		console.log("ARRIVAL TIME: " + moment(nextTrainTime).format("hh:mm"))
		var nextTrain = moment(nextTrainTime).format("hh:mm");

  	database.ref().push({
  		name: trainName,
  		dest: destination,
  		next: nextTrain,
  		freq: frequency,
  		until: comingTrain
  	})

  	$('#inputTrainName').val("");
  	$('#inputDestination').val("");
  	$('#inputTrainTime').val("");
  	$('#inputFrequency').val("");
  });

  database.ref().on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	var newTrainName = childSnapshot.val().name;
	var newDestination = childSnapshot.val().dest;
	var nextOfficialTime = childSnapshot.val().next;
	var newFrequency = childSnapshot.val().freq;
	var untilNextTrain = childSnapshot.val().until;

	$('#head').append("<tr><td>" + newTrainName + "</td><td>" + newDestination + "</td><td>" + newFrequency + "</td><td>" + nextOfficialTime + "</td><td>" + untilNextTrain + "</td></tr>");
  });

