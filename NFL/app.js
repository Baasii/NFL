let down = 1;
let gainedYd = 0;
let fieldYd = 1;
var yd;
var omaKenttaPuoli = true;
let kotiScore = 0;
let vierasScore = 0;
let kotiHyokkaa = false;
let downYd = 0;

let eventTxt = document.getElementById('event');
let controlTxt = document.getElementById('event');
let ydTxt = document.getElementById('yd');
let downTxt = document.getElementById('down')
let fieldTxt = document.getElementById('field');
let scoreTxt = document.getElementById('score');

let passBtn = document.getElementById('pass');
let runBtn = document.getElementById('run');
let kickBtn = document.getElementById('kick');

fieldYd = kickOff();

ydTxt.innerHTML = 'Last play gained ' + gainedYd;
downTxt.innerHTML = down + '. Down & ' + (10 - downYd);

if (omaKenttaPuoli) {
  fieldTxt.innerHTML = 'Own ' + fieldYd;
} else {
  fieldTxt.innerHTML = 'Opp ' + fieldYd;
}

function pass() {
  eventTxt.style.display = 'none';
  yd = getYd(-2, 20);
  gainedYd = gainedYd + yd;
  downYd = downYd + yd;
  fieldYd = fieldPos(fieldYd, yd);

  downReset();

  if (yd > 0)
    ydTxt.innerHTML = 'Last play gained ' + gainedYd;
  else ydTxt.innerHTML = 'Last play lost ' + gainedYd;
  downTxt.innerHTML =
    down + '. Down & ' + (10 - downYd);
  if (omaKenttaPuoli) {
    fieldTxt.innerHTML = 'Own ' + fieldYd;
  } else {
    fieldTxt.innerHTML = 'Opp ' + fieldYd;
  }
  touchdown();
  gainedYd = 0;
}
function run() {
  eventTxt.style.display = 'none';
  yd = getYd(-2, 8);
  gainedYd = gainedYd + yd;
  downYd = downYd + yd;
  fieldYd = fieldPos(fieldYd, yd);

  downReset();

  if (yd > 0)
    ydTxt.innerHTML = 'Last play gained ' + gainedYd;
  else ydTxt.innerHTML = 'Last play lost ' + gainedYd;
  downTxt.innerHTML =
    down + '. Down & ' + (10 - downYd);
  if (omaKenttaPuoli) {
    fieldTxt.innerHTML = 'Own ' + fieldYd;
  } else {
    fieldTxt.innerHTML = 'Opp ' + fieldYd;
  }
  touchdown();
  gainedYd = 0;
}

function getYd(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function downReset() {
  console.log(downYd);
  down++;
  if (downYd >= 10) {
    down = 1;
    downYd = 0;
  } else if (down > 4) {
    turnover();
  }
}
function fieldPos(fieldYd, yd) {
  let retyd;
  let testyd;
  let retyd2 = 50;
  console.log('GAINED ==' + yd);

  if (omaKenttaPuoli) {
    retyd = fieldYd + yd;
    testyd = fieldYd + yd;

    if (testyd > 50) {
      retyd2 = retyd2 - (retyd - 50);
      retyd = retyd2;
      omaKenttaPuoli = false;
    }
  } else {
    retyd = fieldYd - yd;
  }

  return retyd;
}

function touchdown() {
  if (fieldYd < 0) {
    // setInterval(tdteksti, 1000)
    eventTxt.style.display = 'block';
    eventTxt.innerHTML = 'TOUCHDOWN';
    down = 1;
    downYd = 0;
    if (kotiHyokkaa) {
      kotiScore = kotiScore + 6;
    } else {
      vierasScore = vierasScore + 6;
    }
    passBtn.style.display = 'none';
    runBtn.style.display = 'none';
    kickBtn.style.display = 'block';
  }

  scoreTxt.innerHTML = kotiScore + ' - ' + vierasScore;
}

function kickOff() {
  eventTxt.style.display = 'none';
  laskeKickOff = getYd(1, 1000);
  if (laskeKickOff < 800) {
    fieldYd = 25;
    omaKenttaPuoli = true;
  } else if (laskeKickOff > 801 && laskeKickOff < 850) {
    fieldYd = getYd(26, 35);
    omaKenttaPuoli = true;
  } else if (laskeKickOff > 851 && laskeKickOff < 900) {
    fieldYd = getYd(35, 40);
    omaKenttaPuoli = true;
  } else if (laskeKickOff > 901 && laskeKickOff < 950) {
    fieldYd = getYd(15, 25);
    omaKenttaPuoli = true;
  } else fieldYd = -1;

  if (kotiHyokkaa) {
    kotiHyokkaa = false;
    controlTxt.innerHTML = 'Vieras Hyökkää';
  } else {
    kotiHyokkaa = true;
    controlTxt.innerHTML = 'Koti Hyökkää';
  }

  console.log(fieldYd);
  console.log(laskeKickOff);

  passBtn.style.display = 'block';
  runBtn.style.display = 'block';
  kickBtn.style.display = 'none';

  fieldTxt.innerHTML = 'Own ' + fieldYd;
  downTxt.innerHTML =
    down + '. Down & ' + (10 - downYd);

  touchdown();
  return fieldYd;
}

function turnover() {
  down = 1;
  downYd = 0;
  eventTxt.style.display = 'block';
  eventTxt.innerHTML = 'TURNOVER';
  if (kotiHyokkaa) {
    kotiHyokkaa = false;
    controlTxt.innerHTML = 'Vieras Hyökkää';
    if (omaKenttaPuoli) omaKenttaPuoli = false;
    else omaKenttaPuoli = true;
  } else {
    kotiHyokkaa = true;
    controlTxt.innerHTML = 'Koti Hyökkää';
  }
}

function tdteksti() {
  eventTxt.style.display = 'none' ? '' : 'none';



}
function vaihdavari() {
  eventTxt.style.color = 'red' ? 'blue' : 'red';
}


// setInterval(function() {
//   f.style.display = (f.style.display == 'none' ? '' : 'none');
// }, 1000);