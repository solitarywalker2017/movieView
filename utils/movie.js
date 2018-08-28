function getMovieData(requestURL, handleCallback) {
  wx.request({
    url: requestURL,
    header: {
      'content-type': "application/json"
    },
    success: function(res) {
      handleCallback(res);
    },
    fail: function(res) {
      console.log(-1);
    }
  })
}
module.exports = {
  getMovieData: getMovieData
};