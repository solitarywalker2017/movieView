let moviesComponent = require('../../../utils/movie.js'),
  starComponent = require('../../../utils/star.js');
const countPerPage = 20;
Page({
  data: {
    sort: '',
    movies: [],
    currentUrl: '',
    totalCount: 0,
    isEmpty: true
  },

  onLoad: function(options) {
    let sort = options.sort,
      url = '';
    const globalData = getApp(),
      commonURL = globalData.globalData.g_apiUrl;
    switch (sort) {
      case '正在热映':
        url = commonURL + 'in_theaters';
        break;
      case '即将上映':
        url = commonURL + 'coming_soon';
        break;
      case 'top250':
        url = commonURL + 'top250';
        break;
    }
    moviesComponent.getMovieData(url, this.handleCallback);
    this.setData({
      sort: sort,
      currentUrl: url
    });
  },
  onReady: function() {
    wx.setNavigationBarTitle({
      title: this.data.sort
    })
  },
  onPullDownRefresh: function() {
    let refreshUrl = this.data.currentUrl + "?start=0&count=" + countPerPage;
    this.setData({
      'movies': {},
      'isEmpty': true,
      'totalCount': 0
    });
    moviesComponent.getMovieData(refreshUrl, this.handleCallback);
    wx.showNavigationBarLoading();
  },
  onReachBottom: function() {
    wx.showNavigationBarLoading();
    let totalCount = this.data.totalCount + countPerPage;
    let nextUrl = this.data.currentUrl + '?start=' + totalCount + '&count=' + countPerPage;
    this.setData({
      'totalCount': totalCount
    });
    moviesComponent.getMovieData(nextUrl, this.handleCallback);
  },
  handleCallback: function(result) {
    let movies = [],
      res = result.data.subjects;
    for (var i = 0; i < res.length; i++) {
      var temp = {
        'title': res[i].title,
        'rating': {
          'average': res[i].rating.average,
          'stars': starComponent.constrcutStars(res[i].rating.stars)
        },
        'coverageUrl': res[i].images.large,
        'id': res[i].id
      };
      if (res[i].title.length >= 6) {
        temp.title = temp.title.substring(0, 6) + '...';
      }
      movies.push(temp);
    }
    let totalMovies = [];
    if (this.data.isEmpty) {
      totalMovies = movies;
      this.setData({
        isEmpty: false
      });
    } else {
      totalMovies = this.data.movies.concat(movies);
    }
    this.setData({
      movies: totalMovies
    });
    // wx.hideNavigationBarLoading();
  }
})