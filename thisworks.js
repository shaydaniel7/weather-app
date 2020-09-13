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
        }).then(function (data) {
            console.log(data);

            var cityName = data.name
            $("#city-input").text("Current weather for " + cityName + ":");
            console.log(data.name)

            var fTemp = (data.main.temp * (9 / 5) - 459.67).toFixed(0);
            var cTemp = (data.main.temp - 273).toFixed(0);
            $("#temp").html("The current temperature is " + fTemp + "&#8457; " + "(" + cTemp + " &#8451;).");
            console.log(data.main.temp)

            var humidityResult = data.main.humidity
            $("#humidity").text("The humidity index is " + humidityResult + "%.");
            console.log(data.main.humidity)

            var windSpeedResult = (data.wind.speed).toFixed(1)
            $("#wind").text("The wind is blowing at " + windSpeedResult + " mph.");
            console.log(data.wind.speed)

            var fiveDayURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + input + APIKey;
            console.log(input, "")

            $.ajax({
                url: fiveDayURL,
                method: "GET"
            }).then(function (data) {
                console.log(data);

                $(".card-title1").html(moment().add(1, 'days').format("l"));
                $(".card-title2").html(moment().add(2, 'days').format("l"));
                $(".card-title3").html(moment().add(3, 'days').format("l"));
                $(".card-title4").html(moment().add(4, 'days').format("l"));
                $(".card-title5").html(moment().add(5, 'days').format("l"));

                var dayOneTemp = ((data.list[1].main.temp - 273.15) * 1.8 + 32).toFixed(1)
                $("#temp1").html("temp: " + dayOneTemp + "&#8457;");
                console.log()

                var dayOneHumidity = (data.list[1].main.humidity);
                $("#humidity1").html("humidity: " + dayOneHumidity + "%");
                console.log()

                var dayOneWind = (data.list[1].wind.speed).toFixed(1);
                $("#wind1").html("wind speed: " + dayOneWind + "mph");
                console.log()

                var dayTwoTemp = ((data.list[2].main.temp - 273.15) * 1.8 + 32).toFixed(1)
                $("#temp2").html("temp: " + dayTwoTemp + "&#8457;");
                console.log()

                var dayTwoHumidity = (data.list[2].main.humidity);
                $("#humidity2").html("humidity: " + dayTwoHumidity + "%");
                console.log()

                var dayTwoWind = (data.list[2].wind.speed).toFixed(1);
                $("#wind2").html("wind speed: " + dayTwoWind + "mph");
                console.log()

                var dayThreeTemp = ((data.list[3].main.temp - 273.15) * 1.8 + 32).toFixed(1)
                $("#temp3").html("temp: " + dayThreeTemp + "&#8457;");
                console.log()

                var dayThreeHumidity = (data.list[3].main.humidity);
                $("#humidity3").html("humidity: " + dayThreeHumidity + "%");
                console.log()

                var dayThreeWind = (data.list[3].wind.speed).toFixed(1);
                $("#wind3").html("wind speed: " + dayThreeWind + "mph");
                console.log()

                var dayFourTemp = ((data.list[4].main.temp - 273.15) * 1.8 + 32).toFixed(1)
                $("#temp4").html("temp: " + dayFourTemp + "&#8457;");
                console.log()

                var dayFourHumidity = (data.list[4].main.humidity);
                $("#humidity4").html("humidity: " + dayFourHumidity + "%");
                console.log()

                var dayFourWind = (data.list[4].wind.speed).toFixed(1);
                $("#wind4").html("wind speed: " + dayFourWind + "mph");
                console.log()

                var dayFiveTemp = ((data.list[5].main.temp - 273.15) * 1.8 + 32).toFixed(1)
                $("#temp5").html("temp: " + dayFiveTemp + "&#8457;");
                console.log()

                var dayFiveHumidity = (data.list[5].main.humidity);
                $("#humidity5").html("humidity: " + dayFiveHumidity + "%");
                console.log()

                var dayFiveWind = (data.list[5].wind.speed).toFixed(1);
                $("#wind5").html("wind speed: " + dayFiveWind + "mph");
                console.log()

            })

            
        })

    })
})


