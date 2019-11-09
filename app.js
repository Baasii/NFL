let down = 1;
let gainedYd = 0;
let fieldYd = 1;
var yd;
var omaKenttaPuoli = true;
let kotiScore = 0;
let vierasScore = 0;
let kotiHyokkaa = false;
let downYd = 0;

fieldYd = kickOff();

document.getElementById('yd').innerHTML = 'Last play gained ' + gainedYd;
document.getElementById('down').innerHTML = down + '. Down & ' + (10 - downYd);

if (omaKenttaPuoli) {
  document.getElementById('field').innerHTML = 'Own ' + fieldYd;
} else {
  document.getElementById('field').innerHTML = 'Opp ' + fieldYd;
}

function pass() {
  yd = getYd(-2, 20);
  gainedYd = gainedYd + yd;
  downYd = downYd + yd;
  fieldYd = fieldPos(fieldYd, yd);

  downReset();

  if (yd > 0)
    document.getElementById('yd').innerHTML = 'Last play gained ' + gainedYd;
  else document.getElementById('yd').innerHTML = 'Last play lost ' + gainedYd;
  document.getElementById('down').innerHTML =
    down + '. Down & ' + (10 - downYd);
  if (omaKenttaPuoli) {
    document.getElementById('field').innerHTML = 'Own ' + fieldYd;
  } else {
    document.getElementById('field').innerHTML = 'Opp ' + fieldYd;
  }
  touchdown();
  gainedYd = 0;
}
function run() {
  yd = getYd(-2, 2);
  gainedYd = gainedYd + yd;
  downYd = downYd + yd;
  fieldYd = fieldPos(fieldYd, yd);

  downReset();

  if (yd > 0)
    document.getElementById('yd').innerHTML = 'Last play gained ' + gainedYd;
  else document.getElementById('yd').innerHTML = 'Last play lost ' + gainedYd;
  document.getElementById('down').innerHTML =
    down + '. Down & ' + (10 - downYd);
  if (omaKenttaPuoli) {
    document.getElementById('field').innerHTML = 'Own ' + fieldYd;
  } else {
    document.getElementById('field').innerHTML = 'Opp ' + fieldYd;
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
    //down = 1;
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
    document.getElementById('td').innerHTML = 'TOUCHDOWN';
    down = 1;
    downYd = 0;
    if (kotiHyokkaa) {
      kotiScore = kotiScore + 6;
    } else {
      vierasScore = vierasScore + 6;
    }
    document.getElementById('pass').style.display = 'none';
    document.getElementById('run').style.display = 'none';
    document.getElementById('kick').style.display = 'block';
  }

  document.getElementById('score').innerHTML = kotiScore + ' - ' + vierasScore;
}

function kickOff() {
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
    document.getElementById('control').innerHTML = 'Vieras Hyökkää';
  } else {
    kotiHyokkaa = true;
    document.getElementById('control').innerHTML = 'Koti Hyökkää';
  }

  console.log(fieldYd);
  console.log(laskeKickOff);

  document.getElementById('pass').style.display = 'block';
  document.getElementById('run').style.display = 'block';
  document.getElementById('kick').style.display = 'none';

  document.getElementById('field').innerHTML = 'Own ' + fieldYd;
  document.getElementById('down').innerHTML =
    down + '. Down & ' + (10 - downYd);

  touchdown();
  return fieldYd;
}

function turnover() {
  down = 1;
  downYd = 0;
  document.getElementById('td').innerHTML = 'TURNOVER';
  if (kotiHyokkaa) {
    kotiHyokkaa = false;
    document.getElementById('control').innerHTML = 'Vieras Hyökkää';
    if (omaKenttaPuoli) omaKenttaPuoli = false;
    else omaKenttaPuoli = true;
  } else {
    kotiHyokkaa = true;
    document.getElementById('control').innerHTML = 'Koti Hyökkää';
  }
}
