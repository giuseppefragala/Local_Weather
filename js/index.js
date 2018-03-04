$(document).ready(function()
{
    tempUnit = "C";
    temp = 0;
    setValues();
}); //$( document ).ready(function()


//Set values
function setValues(){
//1° $.getJSON()
  $.getJSON("https://ipinfo.io/geo", function(json) {

    coord = json.loc.split(",");
    lat=coord[0];
    lon=coord[1];    

    //2° $.getJSON()
    $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat=" + lat +"&lon=" + lon, function(json) {
      city = json.name;
      country = json.sys.country;
      description = json.weather[0].description;
      icon = json.weather[0].icon;
      wind_speed = json.wind.speed;
      wind_direction = json.wind.deg;
      temp = json.main.temp;


      //I haven't found string value for wind direction in JSON object, so I get them from this: 
      wind_dir ="";
      if(wind_direction >=337.5 || wind_direction <22.5){win_dir = "N";}
      else if(wind_direction >=22.5 || wind_direction <67.5){win_dir = "NE";}
      else if(wind_direction >=67.5 || wind_direction <112.5){win_dir = "E";}
      else if(wind_direction >=112.5 || wind_direction <157.5){win_dir = "SE";}
      else if(wind_direction >=157.5 || wind_direction <202.5){win_dir = "S";}
      else if(wind_direction >=202.5 || wind_direction <247.5){win_dir = "SW";}
      else if(wind_direction >=247.5 || wind_direction <292.5){win_dir = "W";}
      else if(wind_direction >=292.5 || wind_direction <337.5){win_dir = "NW";}

      $("p#pj1").text(city + ", " + country);
      $("p#pj2").text(description);
      $("p#pj3").text(win_dir + " " + wind_speed + " knots");
      $("p#temp").text(parseFloat(temp).toFixed(1) + " " + tempUnit);

      //Set backgroung picture
      setBackgroundPicture();

    }); //2° $.getJSON()
        
  });//1° $.getJSON()  
}

//Converting temperature
function convertTemp(){
  if(tempUnit == "C"){
    tempUnit = "F";
    temp = (temp * (9/5)) + 32;
    temp = parseFloat(temp).toFixed(1);
  }else{
    tempUnit = "C";
    temp = (temp - 32) * (5/9);
    temp = parseFloat(temp).toFixed(1);
  }
}


//Set background picture
function setBackgroundPicture(){
  
  //Picture url array
  picUrl = [];
  picUrl.push("https://freecodecampgiuseppe.herokuapp.com/winter.jpg");
  picUrl.push("https://freecodecampgiuseppe.herokuapp.com/fall.jpg"); 
  picUrl.push("https://freecodecampgiuseppe.herokuapp.com/spring.jpg"); 
  picUrl.push("https://freecodecampgiuseppe.herokuapp.com/summer.jpg");
  
  //Set bakground picture depending on temperature
  if(temp < 6){$("#background").css("background-image", 'url(' + picUrl[0] + ')');}
  else if(temp >=6 && temp < 15){$("#background").css("background-image", 'url(' + picUrl[1] + ')');}
  else if(temp >=15 && temp < 21){$("#background").css("background-image", 'url(' + picUrl[2] + ')');}
  else if(temp >=21){$("#background").css("background-image", 'url(' + picUrl[3] + ')');}
}

$("#temp").click(function() {
  convertTemp();    
  $("#temp").text(temp + " " + tempUnit);
});