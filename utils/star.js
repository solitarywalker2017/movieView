function constrcutStars(star) {
  var num = star.toString().substring(0, 1); //只要整数部分
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    } else {
      array.push(0);
    }
  }
  return array;
}
module.exports = {
  constrcutStars: constrcutStars
}