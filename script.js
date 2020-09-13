$(document).ready(function () {
    console.log("ready!");

    var APIKey = "&appid=106619c9ba24756d95c395d6b5ac5e90";
    var goButton = $("#go-button");
    

    getCurrentDay();
    getCurrentTime();
    getCurrentDate();

    // clock
    function getCurrentDay() {
        $("#currentDay").text(moment().format("dddd"));
    }
    function getCurrentDate() {
        $("#currentDate").text(moment().format("MMM Do, YYYY"));
    }
    function getCurrentTime() {
        $("#currentTime").text(moment().format("h:mma") + " PST");
        militaryTime = (moment().format("HH"));
    }

    // save button event listener
    $(".go-button").on("click", function () {
        var input = $(".city-input").val()
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + input + APIKey;
        console.log(input, "")

        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(data) {
            console.log(data);

            var cityName = data.name
            $("#city-input").text("Here's the current weather in " + cityName + ":");
            console.log(data.name)

            // var tempResult = data.main.temp
            var fTemp = (data.main.temp * (9 / 5) - 459.67).toFixed(0);
            var cTemp = (data.main.temp -273).toFixed(0);
            $("#temp").html("The current temperature is " + fTemp + "&#8457; "  + "(" + cTemp + " &#8451;).");
            console.log(data.main.temp)
                       
            var humidityResult = data.main.humidity
            $("#humidity").text("The humidity index is " + humidityResult+ "%.");
            console.log(data.main.humidity)

            var windSpeedResult = data.wind.speed
            $("#wind").text("The wind is blowing at " + windSpeedResult + " miles per hour."); 
            console.log(data.wind.speed)

            // var uvResult = $("#uvi");
            // $("#uvi").text(uvResult+ " %") 
            // console.log(data.coord.lat + data.coord.lon)
    })
    })
    
})

// $("#temp");