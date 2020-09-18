$(document).ready(function () {
    // console.log("ready!");

    var APIKey = "&appid=106619c9ba24756d95c395d6b5ac5e90";
    var cityArray = []
    var city = $("#city-search").val();

    if (localStorage.getItem("data") === null) {
        var cities = [];
        var doneCities = [];
        localStorage.setItem("data", JSON.stringify(cities, doneCities));

    } else {
        var doneCities = JSON.parse(localStorage.getItem("data"));
        doneCities.forEach(city => {
            var newButton = $(`<button type="button" class="btn btn-light searchedCities"></button>`);
            newButton.text(city);
            newButton.appendTo("#searchedCities");
        })
    }

    function saveCityToLS(cityToSave) {
        cityArray.push(cityToSave)
        localStorage.setItem("data", JSON.stringify(cityArray));
        console.log("")

        var storedCities = []
        storedCities = JSON.parse(localStorage.getItem("data"));

        for (var i = 0; i < storedCities.length; i++) {
            $("city-search").append(storedCities[i]);
        }
    }

    getCurrentDay();
    getCurrentTime();
    getCurrentDate();

    // clock ---------------------------------
    function getCurrentDay() {
        $("#currentDay").text(moment().format("dddd"));
    }
    function getCurrentDate() {
        $("#currentDate").text(moment().format("MMM Do, YYYY"));
    }
    function getCurrentTime() {
        $("#currentTime").text(moment().format("h:mma") + " pst");
        militaryTime = (moment().format("HH"));
    }

    // enables a user to just hit enter to submit city search
    $(".city-input").keypress(function (event) {
        if (event.keyCode === 13) {
            $(".go-button").click();
        }
    });

    // go button event listener -----------------
    $(".go-button").on("click", function () {
        var input = $(".city-input").val()
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + input + APIKey;
        console.log(input, "")
        var cityToSave = document.getElementById("city-search").value;

        saveCityToLS(cityToSave);

        // call to get current weather --------------------
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (data) {

            var cityName = data.name
            $("#city-input").text("Current weather for " + cityName + ":");

            var fTemp = (data.main.temp * (9 / 5) - 459.67).toFixed(0);
            var cTemp = (data.main.temp - 273).toFixed(0);
            $("#temp").html("The current temperature is " + fTemp + "\xB0" + "F " + "(" + cTemp + "\xB0" + "C" + ")" + ".");

            var humidityResult = data.main.humidity
            $("#humidity").text("The humidity index is " + humidityResult + "%.");

            var windSpeedResult = (data.wind.speed).toFixed(1)
            $("#wind").text("The wind is blowing at " + windSpeedResult + " mph.");

            var lat = (data.coord.lat);
            var lon = (data.coord.lon);
            var uvURL = "https://api.openweathermap.org/data/2.5/uvi?&lat=" + lat + "&lon=" + lon + APIKey;
            // console.log(input, "")

            // call to get UV index ----------------------------
            $.ajax({
                url: uvURL,
                method: "GET"
            }).then(function (data) {

                var UV = data.value.toFixed(1)
                $("#uvi").text("The UV index is " + UV + ".");
            })

            // call to get five day forecast --------------------
            var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + input + APIKey;

            $.ajax({
                url: fiveDayURL,
                method: "GET"
            }).then(function (data) {

                // adds info to the daily cards -----------------
                $(".card-title1").html(moment().add(1, 'days').format("l"));
                $(".card-title2").html(moment().add(2, 'days').format("l"));
                $(".card-title3").html(moment().add(3, 'days').format("l"));
                $(".card-title4").html(moment().add(4, 'days').format("l"));
                $(".card-title5").html(moment().add(5, 'days').format("l"));

                var dayOneTemp = ((data.list[1].main.temp - 273.15) * 1.8 + 32).toFixed(0)
                $("#temp1").html("temp: " + dayOneTemp + "\xB0" + "F ");

                var dayOneHumidity = (data.list[1].main.humidity);
                $("#humidity1").html("humidity: " + dayOneHumidity + "%");

                var dayOneWind = (data.list[1].wind.speed).toFixed(0);
                $("#wind1").html("wind speed: " + dayOneWind + " mph");

                var dayTwoTemp = ((data.list[2].main.temp - 273.15) * 1.8 + 32).toFixed(0)
                $("#temp2").html("temp: " + dayTwoTemp + "\xB0" + "F ");

                var dayTwoHumidity = (data.list[2].main.humidity);
                $("#humidity2").html("humidity: " + dayTwoHumidity + "%");

                var dayTwoWind = (data.list[2].wind.speed).toFixed(0);
                $("#wind2").html("wind speed: " + dayTwoWind + " mph");

                var dayThreeTemp = ((data.list[3].main.temp - 273.15) * 1.8 + 32).toFixed(0)
                $("#temp3").html("temp: " + dayThreeTemp + "\xB0" + "F ");

                var dayThreeHumidity = (data.list[3].main.humidity);
                $("#humidity3").html("humidity: " + dayThreeHumidity + "%");

                var dayThreeWind = (data.list[3].wind.speed).toFixed(0);
                $("#wind3").html("wind speed: " + dayThreeWind + " mph");

                var dayFourTemp = ((data.list[4].main.temp - 273.15) * 1.8 + 32).toFixed(0)
                $("#temp4").html("temp: " + dayFourTemp + "\xB0" + "F ");

                var dayFourHumidity = (data.list[4].main.humidity);
                $("#humidity4").html("humidity: " + dayFourHumidity + "%");

                var dayFourWind = (data.list[4].wind.speed).toFixed(0);
                $("#wind4").html("wind speed: " + dayFourWind + " mph");

                var dayFiveTemp = ((data.list[5].main.temp - 273.15) * 1.8 + 32).toFixed(0)
                $("#temp5").html("temp: " + dayFiveTemp + "\xB0" + "F ");

                var dayFiveHumidity = (data.list[5].main.humidity);
                $("#humidity5").html("humidity: " + dayFiveHumidity + "%");

                var dayFiveWind = (data.list[5].wind.speed).toFixed(0);
                $("#wind5").html("wind speed: " + dayFiveWind + " mph");
            })
        })
    })

    $(".searchedCities").on("click", function () {
        var input = $(".searchedCities").text()
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + input + APIKey;
        console.log(input, "")
        var cityToSave = document.getElementById("city-search").value;

        saveCityToLS(cityToSave);

        // call to get current weather --------------------
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (data) {

            var cityName = data.name
            $("#city-input").text("Current weather for " + cityName + ":");

            var fTemp = (data.main.temp * (9 / 5) - 459.67).toFixed(0);
            var cTemp = (data.main.temp - 273).toFixed(0);
            $("#temp").html("The current temperature is " + fTemp + "\xB0" + "F " + "(" + cTemp + "\xB0" + "C" + ")" + ".");

            var humidityResult = data.main.humidity
            $("#humidity").text("The humidity index is " + humidityResult + "%.");

            var windSpeedResult = (data.wind.speed).toFixed(1)
            $("#wind").text("The wind is blowing at " + windSpeedResult + " mph.");

            var lat = (data.coord.lat);
            var lon = (data.coord.lon);
            var uvURL = "https://api.openweathermap.org/data/2.5/uvi?&lat=" + lat + "&lon=" + lon + APIKey;
            // console.log(input, "")

            // call to get UV index ----------------------------
            $.ajax({
                url: uvURL,
                method: "GET"
            }).then(function (data) {

                var UV = data.value.toFixed(1)
                $("#uvi").text("The UV index is " + UV + ".");
            })

            // call to get five day forecast --------------------
            var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + input + APIKey;

            $.ajax({
                url: fiveDayURL,
                method: "GET"
            }).then(function (data) {

                // adds info to the daily cards -----------------
                $(".card-title1").html(moment().add(1, 'days').format("l"));
                $(".card-title2").html(moment().add(2, 'days').format("l"));
                $(".card-title3").html(moment().add(3, 'days').format("l"));
                $(".card-title4").html(moment().add(4, 'days').format("l"));
                $(".card-title5").html(moment().add(5, 'days').format("l"));

                var dayOneTemp = ((data.list[1].main.temp - 273.15) * 1.8 + 32).toFixed(0)
                $("#temp1").html("temp: " + dayOneTemp + "\xB0" + "F ");

                var dayOneHumidity = (data.list[1].main.humidity);
                $("#humidity1").html("humidity: " + dayOneHumidity + "%");

                var dayOneWind = (data.list[1].wind.speed).toFixed(0);
                $("#wind1").html("wind speed: " + dayOneWind + " mph");

                var dayTwoTemp = ((data.list[2].main.temp - 273.15) * 1.8 + 32).toFixed(0)
                $("#temp2").html("temp: " + dayTwoTemp + "\xB0" + "F ");

                var dayTwoHumidity = (data.list[2].main.humidity);
                $("#humidity2").html("humidity: " + dayTwoHumidity + "%");

                var dayTwoWind = (data.list[2].wind.speed).toFixed(0);
                $("#wind2").html("wind speed: " + dayTwoWind + " mph");

                var dayThreeTemp = ((data.list[3].main.temp - 273.15) * 1.8 + 32).toFixed(0)
                $("#temp3").html("temp: " + dayThreeTemp + "\xB0" + "F ");

                var dayThreeHumidity = (data.list[3].main.humidity);
                $("#humidity3").html("humidity: " + dayThreeHumidity + "%");

                var dayThreeWind = (data.list[3].wind.speed).toFixed(0);
                $("#wind3").html("wind speed: " + dayThreeWind + " mph");

                var dayFourTemp = ((data.list[4].main.temp - 273.15) * 1.8 + 32).toFixed(0)
                $("#temp4").html("temp: " + dayFourTemp + "\xB0" + "F ");

                var dayFourHumidity = (data.list[4].main.humidity);
                $("#humidity4").html("humidity: " + dayFourHumidity + "%");

                var dayFourWind = (data.list[4].wind.speed).toFixed(0);
                $("#wind4").html("wind speed: " + dayFourWind + " mph");

                var dayFiveTemp = ((data.list[5].main.temp - 273.15) * 1.8 + 32).toFixed(0)
                $("#temp5").html("temp: " + dayFiveTemp + "\xB0" + "F ");

                var dayFiveHumidity = (data.list[5].main.humidity);
                $("#humidity5").html("humidity: " + dayFiveHumidity + "%");

                var dayFiveWind = (data.list[5].wind.speed).toFixed(0);
                $("#wind5").html("wind speed: " + dayFiveWind + " mph");
            })
        })
    })
})

// <!-- weather api key: e91289314fb618ed5bdb0502d166c5ca -->

