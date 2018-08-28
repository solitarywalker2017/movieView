var data = require('../../data/data.js');

Page({
  data: {
    'indicator-dots': true,
    "autoplay": true,
    "circular": true,
    "interval": 5000,
    "swiper": [
      "../../images/wx.png",
      "../../images/iqiyi.png",
      "../../images/vr.png"
    ],
    'newsList': []
  },

  onLoad: function(options) {
    this.setData({
      'newsList': data.newsList
    });
  },

  showDetail: function(event) {
    let list_id = 0;
    if (event.currentTarget.dataset.id) {
      list_id = event.currentTarget.dataset.id;
    }
    if (event.target.dataset.id) {
      list_id = event.target.dataset.id;
    }
    wx.navigateTo({
      url: '../detail/detail?id=' + list_id,
    })
  }
})