$(document).ready(function () {
  /*
$(".testclass").bind("webkitAnimationEnd mozAnimationEnd animationEnd", function(){
    $(this).removeClass("animated")  
})    

$(".testclass").hover(function(){
    $(this).addClass("animated");        
})
*/

  /*  ///////////// Ideoita ////////////////////////


Move cursor to beginning at random  *DONE*
const inputs = [
  document.querySelector("#username"),
  document.querySelector("#password"),
  document.querySelector("#capcha")
];

function moveToStart(e) {
  loc = Math.floor(Math.random() * e.target.value.length);

  e.target.selectionStart = loc;
  e.target.selectionEnd = loc;
}
function writeClear(e) {
  document.querySelector("#clear").value = e.target.value;
}

document
  .querySelector("#username")
  .addEventListener("input", moveToStart);
document
  .querySelector("#password")
  .addEventListener("input", moveToStart);
document.querySelector("#password").addEventListener("input", writeClear);
document
  .querySelector("#capcha")
  .addEventListener("input", moveToStart);




move/animate object away *DONE*
$('.touchMeNot').on('mouseenter',function(e){
    var maxX = $(window).width() - $(this).width();
    var maxY = $(window).height() - $(this).height();    
    $(this).css({
        'left':getRandomInt(0, maxX),
        'top':getRandomInt(0, maxY)
    });
});
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



popups *DONE*

wrong colored buttons green/red  *DONE*


overflowing sending form bar https://codepen.io/Psykek/pen/XWbZeEq *DONE*


*/
  // Puhelinnro

  $(".insert").click(function () {
    let text = $("#dropdown :selected").text();
    let phonevalue = $("#phone").val();
    phonevalue += text;
    $("#phone").val(phonevalue);
  });
  $(".clear").click(function () {
    $("#phone").val("");

    //$('.popup').hide();
  });
  $(".noclear").click(function () {
    $(".popup").hide();
  });


  const inputs = document.querySelector("#address");
  let x = 0;
  function moveToStart(e) {
    //loc = Math.floor(Math.random() * e.target.value.length);
    //e.target.selectionStart = 0;
    //Math.floor(Math.random() * 4);
    console.log(x);
    if (x == 6) {
      e.target.selectionEnd = 0;
      x = 0;
    } else if (x > 5) {
      x--;
    } else {
      x += Math.floor(Math.random() * 3) + 1;
    }
  }
  function writeClear(e) {
    document.querySelector("#clear").value = e.target.value;
  }

  document.querySelector("#address").addEventListener("input", moveToStart);


  // Popup video
  setTimeout(raidShadow, 7000);
  function raidShadow() {
    ///////////////////////////////////////////$('.popup_2').show();
  }

  

  $(".trigger_popup_fricc").click(function () {
    $(".popup").show();
  });

  $(".popupCloseButton").click(function () {
    $(".popup").hide();
    $(".popup_2").hide();
    $(".popup_3").hide();
  });
  // Touchmenot
  let y = 0;
  $(".touchMeNot").on("mouseenter", function (e) {
    if (y != 3) {
      var maxX = $(window).width() - $(this).width();
      var maxY = $(window).height() - $(this).height();
      $(this).css({
        left: getRandomInt(0, 500),
        top: getRandomInt(0, 500),
      });
      y++;
    }
  });
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Postinumerot

  let dropdown = $("#postcode-dropdown");

  dropdown.empty();

  dropdown.append('<option selected="true" disabled>Postinumero</option>');
  dropdown.prop("selectedIndex", 0);

  const url = "postcodes.json";

  $.getJSON(url, function (obj) {
    $.each(obj, function (key, value) {
      $("#postcode-dropdown").append(`<option>${value.postcode}</option>`);
    });
  });

  $("#postcode-dropdown").html(
    $("#postcode-dropdown option").sort(function (x, y) {
      return $(x).text() < $(y).text();
    })
  );

  // Loading bar

  function loading() {
    var elem = document.getElementById("myBar");
    console.log(elem);
    var width = 1;
    var id = setInterval(frame, 50);
    var full;
    function frame() {
      if (full) {
        width--;
        elem.style.width = width + "%";
        if(width == 100){
          $(".popup_3").hide();
        }
      } else {
        width++;
        elem.style.width = width + "%";
        if(width >= 300){
          console.log("Bar coming back");
          full = true;
        }
        
      }
    }
  }

  $("#send").click(function () {
    send();
  });

  function send() {
    $(".popup_3").show();
    setTimeout(loading, 1000);
  }
});
