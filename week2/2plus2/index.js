//Ваш код будет здесь
var els = [];
var errMsg = 'Это не число';
function checkNums(nums) {
  var i = 0;
  var countFalse = 0;
  for ( i = 0; i < nums.length; i++ ) {
    if ( isNaN(nums[i].value) || !isFinite(nums[i].value) ) {
      nums[i].nextElementSibling.innerHTML = errMsg;
      countFalse++;
    }
  }
  if (countFalse) {
    return false;
  } else {
    return true;
  }
};
function countNumbers() {
  var oldResult = document.querySelector('#result');
  var nums = document.querySelectorAll('input[type="text"]');
  var sum = 0;
  var result = document.createElement('div');
  var i;
  if (oldResult) {
    oldResult.parentNode.removeChild(oldResult);
  }
  if ( checkNums(nums) ) {

    for ( i = 0; i < nums.length; i++ ) {
      sum += +nums[i].value;
      nums[i].nextElementSibling.innerHTML = '';
    }

    result.id = 'result';
    result.innerHTML = '' + sum;
    document.querySelector('body').appendChild(result);

  }

}
function generateCalcMarkup() {
  var input1 = document.createElement('input');
  var input2 = document.createElement('input');
  var btn = document.createElement('button');
  var bodyEl = document.querySelector('body');
  var input1Msg = document.createElement('div');
  var input2Msg = document.createElement('div');
  var i;
  input1.type = 'text';
  input1.id = 'input1';
  els.push(input1);
  input1Msg.classList.add('error-message');
  els.push(input1Msg);
  input2.type = 'text';
  input2.id = 'input2';
  els.push(input2);
  input2Msg.classList.add('error-message');
  els.push(input2Msg);
  btn.innerHTML = 'Посчитать';
  els.push(btn);
  for ( i = 0; i < els.length; i++ ) {
    bodyEl.appendChild(els[i]);
  }
  btn.addEventListener('click', countNumbers);
}
function init() {
  generateCalcMarkup();
}
window.addEventListener('DOMContentLoaded', function() {
  'use strict';
  init();
});
