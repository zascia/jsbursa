// Ваш код будет здесь
var els = [];
var errMsg = 'Это не число';
function checkNums(nums) {
  'use strict';
  var i = 0;
  var countFalse = 0;
  var errorInput;
  for ( i = 0; i < nums.length; i++ ) {
    if ( isNaN(parseFloat(nums[i].value)) || !isFinite(nums[i].value) ) {
      if (!nums[i].nextElementSibling.classList.contains('error-message')) {
        errorInput = document.createElement('div');
        errorInput.classList.add('error-message');
        errorInput.innerHTML = errMsg;
        nums[i].parentNode.insertBefore(errorInput, nums[i].nextElementSibling);
      }
      countFalse++;
    }
  }
  if (countFalse) {
    return false;
  }
  return true;
}
function countNumbers() {
  'use strict';
  var oldResult = document.querySelector('#result');
  var nums = document.querySelectorAll('input[type="text"]');
  var sum = 0;
  var result = document.createElement('div');
  var i;
  var errorInputs;
  if (oldResult) {
    oldResult.parentNode.removeChild(oldResult);
  }
  if ( checkNums(nums) ) {
    errorInputs = document.querySelectorAll('.error-message');
    if (errorInputs.length) {
      for ( i = 0; i < errorInputs.length; i++ ) {
        errorInputs[i].parentNode.removeChild(errorInputs[i]);
      }
    }
    for ( i = 0; i < nums.length; i++ ) {
      sum += parseFloat(nums[i].value);
    }
    result.id = 'result';
    result.innerHTML = '' + sum;
    document.querySelector('body').appendChild(result);
  }
}
function generateCalcMarkup() {
  'use strict';
  var input1 = document.createElement('input');
  var input2 = document.createElement('input');
  var btn = document.createElement('button');
  var bodyEl = document.querySelector('body');
  var i;
  input1.type = 'text';
  input1.id = 'input1';
  els.push(input1);
  input2.type = 'text';
  input2.id = 'input2';
  els.push(input2);
  btn.innerHTML = 'Посчитать';
  els.push(btn);
  for ( i = 0; i < els.length; i++ ) {
    bodyEl.appendChild(els[i]);
  }
  btn.addEventListener('click', countNumbers);
}
function init() {
  'use strict';
  generateCalcMarkup();
}
window.addEventListener('DOMContentLoaded', function forceToLint() {
  'use strict';
  init();
});
