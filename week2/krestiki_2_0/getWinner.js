
function getWinner() {
  alert('Внимание! getWinner не дописан. Он будет возвращать победу крестика либо нолика с вероятностью 10%. Вы получите getWinner непосредственно в среду');
  var x = Math.random();
  if (x > 0.2) {
    return;
  }
  if (x > 0.1) {
    return 'o';
  }
  return 'x';
}
