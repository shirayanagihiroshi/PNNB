let itemID       = ["num1", "num2", "num3", "num4", "num5", "num6", "num7", "num8", "num9"];
let items        = [];
let tableNumbers = [];
let answers      = []; // 設問設定時にはcheckPrimeの戻り値を入れる。つまり
                       // 2 : 素数
                       // 4 : 素数じゃない
                       // その後、合成数をクリックしたら4を0に変える
let timerID      = 0;
let counter      = 0;
let counterID    = 0;
let waitingStart = false;
let bomID        = ["bom1", "bom2", "bom3", "bom4", "bom5", "bom6", "bom7", "bom8"];
let boms         = [];
let bomTimers    = [];
let bomX, bomY;
let afterbomNum;

window.onload = function (event) {
  let i;

  setNoVisible("gameReady");
  setNoVisible("gameOver");
  setNoVisible("gameClear");
  setNoVisible("mainTable");
  setNoVisible("counter");

  for (i = 0; i < bomID.length; i++) {
    boms[i] = document.getElementById(bomID[i]);
    boms[i].style.display  = 'none';
  }
}

function onButtonClick() {
  gameReady();
}

function gameReady() {
  let i, obj;

  if (waitingStart == true) {
    return;
  } else {
    waitingStart = true;
  }

  setNoVisible("gameReady");
  setNoVisible("gameOver");
  setNoVisible("gameClear");
  setNoVisible("mainTable");
  setNoVisible("counter");

  // 以下で問題の数を用意するが、実際のゲーム開始は2秒後
  tableNumbers = [];
  answers = [];

  // 重複しない9個の整数を設定する
  i = 0;
  LABEL: while (1) {
    let temp = makeNumber();

    for (j = 0; j < tableNumbers.length; j++) {
      if (temp == tableNumbers[j]) {
        continue LABEL;
      }
    }

    tableNumbers[i] = temp;
    i++;
    if (tableNumbers.length == 9) {
      break;
    }
  }

  for (i = 0; i < itemID.length; i++) {
    answers[i] = checkPrime(tableNumbers[i]);
    items[i] = document.getElementById(itemID[i]);
    items[i].innerHTML = tableNumbers[i];
  }

  setVisible("gameReady");

  timerID = setTimeout(gameStart, 1500);

  clearInterval(counterID);
  obj = document.getElementById("counter");
  counter = 0;
  obj.innerHTML = "count:" + String(counter);
}

function gameStart() {
  setNoVisible("gameReady");
  setVisible("mainTable");
  setVisible("counter");

  counter = 0;
  counterID = setInterval(countup, 1000);

  waitingStart = false;
}

function countup() {
  obj = document.getElementById("counter");

  counter = counter + 1;
  obj.innerHTML = "count:" + String(counter);
}

// 戻り値
// 2 : 素数
// 4 : 素数じゃない
function checkPrime(n) {
  let i;

  if (n <= 1) {
    return 4;
  } else if (n == 2) {
    return 2;
  } else {

    for (i = 2; i < n; i++) {
      if ( n % i == 0 ) {
        return 4;
      }
    }
    return 2;
  }
}

// 戻り値
// 2～31のランダムな整数
function makeNumber() {
  return Math.floor(Math.random() * 30 + 2);
}

function onClick (x, y, num) {
  // チェック済ならスルー
  if (answers[num] == 0) {
    return;

  // 素数ならゲームオーバー
  } else if (answers[num] == 2) {
    setVisible("gameOver");
    clearInterval(counterID);
  // 合成数なら
  } else {
    bomstart(x, y, num);
  }
}

function onClick1 (event) {
  onClick(event.clientX, event.clientY, 0);
}
function onClick2 (event) {
  onClick(event.clientX, event.clientY, 1);
}
function onClick3 () {
  onClick(event.clientX, event.clientY, 2);
}
function onClick4 () {
  onClick(event.clientX, event.clientY, 3);
}
function onClick5 () {
  onClick(event.clientX, event.clientY, 4);
}
function onClick6 () {
  onClick(event.clientX, event.clientY, 5);
}
function onClick7 () {
  onClick(event.clientX, event.clientY, 6);
}
function onClick8 () {
  onClick(event.clientX, event.clientY, 7);
}
function onClick9 () {
  onClick(event.clientX, event.clientY, 8);
}

function setVisible(IDstr) {
  let obj = document.getElementById(IDstr);
  obj.style.display  = 'block';
}

function setNoVisible(IDstr) {
  let obj = document.getElementById(IDstr);
  obj.style.display  = 'none';
}

function clearCheck(target) {
  if (target == 2 || target == 0) {
    return true
  }
}

function gameClearCheck() {
  let arr = answers.filter(clearCheck);

  if (arr.length == 9) {
    setVisible("gameClear");
    clearInterval(counterID);
  }
}

function bomstart(x, y, n) {
  bomX = x;
  bomY = y;
  afterbomNum = n;

  let obj = document.getElementById("bom1");
  obj.style.top  = bomY -30 + Math.floor(Math.random() * 60 + 1) ; // -20 + 1から40
  obj.style.left = bomX -30 + Math.floor(Math.random() * 60 + 1) ; // -20 + 1から40
  obj.style.width = Math.floor(Math.random() * 10 + 40); // 40から50
  obj.style.height = Math.floor(Math.random() * 10 + 40); // 40から50
  obj.style.backgroundColor  = makecolor();
  obj.style.display  = 'block';
  bomTimers[0] = setTimeout(bomclear1, 250);

  obj = document.getElementById("bom2");
  obj.style.top  = bomY -20 + Math.floor(Math.random() * 40 + 1) ; // -20 + 1から40
  obj.style.left = bomX -20 + Math.floor(Math.random() * 40 + 1) ; // -20 + 1から40
  obj.style.width = Math.floor(Math.random() * 10 + 40); // 40から50
  obj.style.height = Math.floor(Math.random() * 10 + 40); // 40から50
  obj.style.backgroundColor  = makecolor();
  obj.style.display  = 'block';
  bomTimers[1] = setTimeout(bomclear2, 250);

  setTimeout(nextbom, 20);
}

function nextbom() {
  let obj = document.getElementById("bom3");
  obj.style.top  = bomY -30 + Math.floor(Math.random() * 60 + 1) ; // -20 + 1から40
  obj.style.left = bomX -30 + Math.floor(Math.random() * 60 + 1) ; // -20 + 1から40
  obj.style.width = Math.floor(Math.random() * 10 + 20); // 20から30
  obj.style.height = Math.floor(Math.random() * 10 + 20); // 20から30
  obj.style.backgroundColor  = makecolor();
  obj.style.display  = 'block';
  bomTimers[2] = setTimeout(bomclear3, 250);

  obj = document.getElementById("bom4");
  obj.style.top  = bomY -10 + Math.floor(Math.random() * 20 + 1) ; // -20 + 1から40
  obj.style.left = bomX -10 + Math.floor(Math.random() * 20 + 1) ; // -20 + 1から40
  obj.style.width = Math.floor(Math.random() * 30 + 40); // 30から70
  obj.style.height = Math.floor(Math.random() * 10 + 20); // 20から30
  obj.style.backgroundColor  = makecolor();
  obj.style.display  = 'block';
  bomTimers[3] = setTimeout(bomclear4, 250);

  setTimeout(nextbom2, 20);
}

function nextbom2() {
  let obj = document.getElementById("bom5");
  obj.style.top  = bomY -20 + Math.floor(Math.random() * 40 + 1) ; // -20 + 1から40
  obj.style.left = bomX -20 + Math.floor(Math.random() * 40 + 1) ; // -20 + 1から40
  obj.style.width = Math.floor(Math.random() * 10 + 10); // 10から20
  obj.style.height = Math.floor(Math.random() * 10 + 10); // 10から20
  obj.style.backgroundColor  = makecolor();
  obj.style.display  = 'block';
  bomTimers[4] = setTimeout(bomclear5, 250);

  obj = document.getElementById("bom6");
  obj.style.top  = bomY -20 + Math.floor(Math.random() * 40 + 1) ; // -20 + 1から40
  obj.style.left = bomX -20 + Math.floor(Math.random() * 40 + 1) ; // -20 + 1から40
  obj.style.width = Math.floor(Math.random() * 10 + 10); // 10から20
  obj.style.height = Math.floor(Math.random() * 10 + 10); // 10から20
  obj.style.backgroundColor  = makecolor();
  obj.style.display  = 'block';
  bomTimers[5] = setTimeout(bomclear6, 250);

  setTimeout(nextbom3, 30);
}

function nextbom3() {
  let obj = document.getElementById("bom6");
  obj.style.top  = bomY -20 + Math.floor(Math.random() * 40 + 1) ; // -20 + 1から40
  obj.style.left = bomX -20 + Math.floor(Math.random() * 40 + 1) ; // -20 + 1から40
  obj.style.width = Math.floor(Math.random() * 10 + 10); // 10から20
  obj.style.height = Math.floor(Math.random() * 10 + 10); // 10から20
  obj.style.backgroundColor  = makecolor();
  obj.style.display  = 'block';
  bomTimers[6] = setTimeout(bomclear6, 250);

  obj = document.getElementById("bom7");
  obj.style.top  = bomY -20 + Math.floor(Math.random() * 40 + 1) ; // -20 + 1から40
  obj.style.left = bomX -20 + Math.floor(Math.random() * 40 + 1) ; // -20 + 1から40
  obj.style.width = Math.floor(Math.random() * 10 + 10); // 10から20
  obj.style.height = Math.floor(Math.random() * 10 + 10); // 10から20
  obj.style.backgroundColor  = makecolor();
  obj.style.display  = 'block';
  bomTimers[7] = setTimeout(bomclear7, 250);

  setTimeout(nextbom4, 30);
}
function nextbom4 () {
  answers[afterbomNum] = 0;
  items[afterbomNum].innerHTML = "〇";
  gameClearCheck();
}

function bomclear1() {
  boms[0].style.display  = 'none';
}
function bomclear2() {
  boms[1].style.display  = 'none';
}
function bomclear3() {
  boms[2].style.display  = 'none';
}
function bomclear4() {
  boms[3].style.display  = 'none';
}
function bomclear5() {
  boms[4].style.display  = 'none';
}
function bomclear6() {
  boms[5].style.display  = 'none';
}
function bomclear7() {
  boms[6].style.display  = 'none';
}
function bomclear8() {
  boms[7].style.display  = 'none';
}

function makecolor() {
  let red, green, blue;
  red   = (Math.floor(Math.random() * 50 + 1)).toString(16); //1から50
  green = (Math.floor(Math.random() * 50 + 1)).toString(16); //1から50
  blue  = (Math.floor(Math.random() * 50 + 1)).toString(16); //1から50
  return '#' + red + green + blue;
}

