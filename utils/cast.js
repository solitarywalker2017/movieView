function constructCast(casts) {
  let cast = '';
  for (var i = 0; i < casts.length; i++) {
    cast += casts[i].name + '/';
  }
  return cast.substring(0, cast.length - 2);
}

function constructCastInfo(casts) {
  let castsArray = [];
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

module.exports = {
  constructCast: constructCast,
  constructCastInfo: constructCastInfo
}