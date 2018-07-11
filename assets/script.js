$(document).ready(function () {
    var config = {
        apiKey: "AIzaSyAivy2iUXCPccd8mdob8M8SFEzvsCZpJFE",
        authDomain: "trainschedule-cf2b6.firebaseapp.com",
        databaseURL: "https://trainschedule-cf2b6.firebaseio.com",
        projectId: "trainschedule-cf2b6",
        storageBucket: "trainschedule-cf2b6.appspot.com",
        messagingSenderId: "612744433894"
    };
    firebase.initializeApp(config);

    var database = firebase.database();
    $('#firstTrainTimeInput').mask('00:00');


    $("#submitNewTrain").on("click", function (event) {

        var trainName = $("#trainNameInput").val().trim();
        var destination = $("#destinationInput").val().trim();
        var firstTrainTime = $("#firstTrainTimeInput").val().trim();
        var frequency = $("#frequencyInput").val().trim();

        var newTrain = {
            name: trainName,
            dest: destination,
            start: firstTrainTime,
            freq: frequency
        };

        database.ref().push(newTrain);

        console.log(newTrain.name);
        console.log(newTrain.dest);
        console.log(newTrain.start);
        console.log(newTrain.freq);

        alert("Train added successfully");

        // Clears all of the text-boxes
        $("#trainNameInput").val("");
        $("#destinationInput").val("");
        $("#firstTrainTimeInput").val("");
        $("#frequencyInput").val("");
    });

    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());

        // Store everything into a variable.
        var trainName = childSnapshot.val().name;
        var destination = childSnapshot.val().dest;
        var firstTrainTime = childSnapshot.val().start;
        var frequency = childSnapshot.val().freq;

        var nowTime = new Date();
        console.log(nowTime);

        var trainTime = firstTrainTime.split(':');
        var Thours = trainTime[0];
        var Tmins = trainTime[1];


        var curHours = moment().get('hour');
        var curMins = moment().get('minute');

        var modulus = (curMins - Tmins) % frequency;
        var minAway = frequency - modulus;

        var nextTrainTime = moment().add(minAway, 'm').format('LT');




        var newTableRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(destination),
            $("<td>").text(frequency),
            $("<td>").text(nextTrainTime),
            $("<td>").text(minAway)
        );

        $("#trainTable > tbody").append(newTableRow);
    });
});
