const resultElem = document.querySelector('.result');

const calcObj = {
  operator: undefined, // 연산자
  operandX: undefined, // 피연산자 1
  operandY: undefined, // 피연산자 2
  isDisplayClear: false, // 숫자 표기창 초기화 유무
  isResultClear: false, // 결과 출력 후 숫자표기창 초기화 유무
};

const isNumber = input => {
  return Number.isInteger(parseInt(input)) || input === '.';
};

function ACEvent() {
  resultElem.innerText = 0;
  calcObj.operandX = undefined;
  calcObj.operandY = undefined;
  calcObj.operator = undefined;
  calcObj.isDisplayClear = false;
  calcObj.isResultClear = false;
};

const reset = () => {
  ACEvent();
};

const reverse = () => {
  resultElem.innerText *= -1;
};

const clickNumbers = number => {
  // 입력으로 들어온 숫자가 온점이 아니면서 동시에 0일 경우 입력으로 들어온 숫자로 대체
  if (calcObj.isDisplayClear) {
    resultElem.innerText = number !== '.' ? '' : '0.';
    calcObj.operandY = undefined;
    calcObj.isDisplayClear = false;
  // 이 조건문에는 들어오지 않으면서, 입력으로 들어온 숫자가 마찬가지로 온점이 아니거나 현재 숫자 입력 결과 창에 온점(소수점)이 없을 경우 입력으로 들어온 숫자를 숫자 입력 결과에 적혀있는 숫자 뒤로
  } else if (calcObj.isResultClear) {
    resultElem.innerText = number !== '.' ? '' : '0.';
    calcObj.operandY = undefined;
    calcObj.operator = undefined;
    calcObj.isResultClear = false;
  }

  if (number !== '.' && resultElem.innerText === '0') {
    resultElem.innerText = number;
  } else if (!(number === '.' && resultElem.innerText.indexOf('.') !== -1)) {
    resultElem.innerText += number;
  }
};

// 사칙연산
const add = (x, y) => {
  resultElem.innerText = parseFloat(x) + parseFloat(y);
};

const subtract = (x, y) => {
  resultElem.innerText = x - y;
};

const multiply = (x, y) => {
  resultElem.innerText = x * y;
};

const divide = (x, y) => {
  const value = x / parseFloat(y);
  resultElem.innerText = Math.round(value * 1e12) / 1e12;

  //0으로 나눗셈이 있을 때 막기위한 플래그 초기화
  let zeroDivisionFlag=false;

  // 나누기 0 예외처리
  if ( calcObj.operator == "÷" && calcObj.operandY == 0){
      zeroDivisionFlag=true; 
  } 
  if (zeroDivisionFlag=true) {
      console.log("0으로 나누는 식이 있습니다.");
      // 0으로 나누면 Infinity 가 출력 되어서 콘솔창에 알림이 뜨고 0이 출력 되도록 초기화(C 버튼)로 변경
      ACEvent();
  }
};

const getPercent = () => {
  divide(resultElem.innerText, 100);
};

const calculate = () => {
  switch(calcObj.operator){
    case '÷':
      divide(calcObj.operandX, calcObj.operandY);
      break;
    case '×':
      multiply(calcObj.operandX, calcObj.operandY);
      break;
    case '-':
      subtract(calcObj.operandX, calcObj.operandY);
      break;
    case '+':
      add(calcObj.operandX, calcObj.operandY);
      break;
  }
};

// 연산자 입력
// 나머지 연산, 부호 반전, 백분율 계산, 계산 초기화
const handleCalculator = (event) => {
  const input = event.target.innerText;
  if (isNumber(input)) {
    // 숫자임을 체크하는 함수인 isNumber 함수가 추가
    clickNumbers(input);
  } else {
    switch (input) {
      case 'C':
        reset();
        break;
      case '±':
        reverse();
        break;
      case '%':
        getPercent();
        break;
      case '÷':
      case '×':
      case '-':
      case '+':
         // 연산자 처리 로직 작성 ... 1
        if(!calcObj.isResultClear && !calcObj.isDisplayClear && calcObj.operandX !== undefined && calcObj.operandY !== undefined){
          calculate();
        }
        calcObj.operandX = parseFloat(resultElem.innerText);
        calcObj.operator = input;
        calcObj.isDisplayClear = true;
        calcObj.isResultClear = false;
        break;
      case '=':
        // 결과 처리 로직 작성 ... 2
        if (calcObj.operator === undefined) {
          calcObj.operandX = undefined;
        } else if (calcObj.operandY === undefined) {
          calcObj.operandY = parseFloat(resultElem.innerText);
        }
        if (calcObj.operandX !== undefined && calcObj.operator !== undefined) {
          calculate();
          calcObj.isResultClear = true;
          calcObj.operandX = parseFloat(resultElem.innerText);
        }
        break;
    }
  }
};

