const globalData = getApp(),
  starComponent = require('../../utils/star.js'),
  moviesComponent = require('../../utils/movie.js');
Page({
  data: {
    'inTheaters': [],
    'comingSoon': [],
    'top250': [],
    'searchPanelShow': false,
    'containerShow': true,
    'searchResult': {}
  },
  onLoad: function(options) {
    var commonURL = globalData.globalData.g_apiUrl;
    var inTheatersURL = commonURL + 'in_theaters?start=0&count=3';
    this.getMovieData(inTheatersURL, 'inTheaters', '正在热映');
    var comingSoonURL = commonURL + 'coming_soon?start=0&count=3';
    this.getMovieData(comingSoonURL, 'comingSoon', '即将上映');
    var top250URL = commonURL + 'top250?start=0&count=3';
    this.getMovieData(top250URL, 'top250', 'top250');
  },
  getMovieData: function(requestURL, key, title) {
    var that = this;
    wx.request({
      url: requestURL,
      success: function(res) {
        that.handleMovieData(res, key, title);
      },
      fail: function(res) {
        console.log(-1);
      }
    });
  },
  handleMovieData: function(result, key, title) {
    let movies = [];
    console.log(result);
    // for (var i = 0; i < res.length; i++) {
    //   var temp = {
    //     'title': res[i].title,
    //     'rating': {
    //       'average': res[i].rating.average,
    //       'stars': starComponent.constrcutStars(res[i].rating.stars)
    //     },
    //     'coverageUrl': res[i].images.large,
    //     'id': res[i].id
    //   };
    //   if (res[i].title.length >= 6) {
    //     temp.title = temp.title.substring(0, 6) + '...';
    //   }
    //   movies.push(temp);
    //   let readyData = {};
    //   readyData[key] = {
    //     movies: movies,
    //     title: title
    //   };
    //   this.setData(readyData);
    // }
  },
  moreMovies: function(event) {
    var sort = event.currentTarget.dataset.sort;
    wx.navigateTo({
      url: 'more/more?sort=' + sort,
    })
  },
  showMovieDetail: function(event) {
    const mid = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'detail/detail?mid=' + mid,
    })
  },
  showSearchResult: function() {
    this.setData({
      'containerShow': false,
      'searchPanelShow': true
    });
  },
  cancelSearch: function() {
    this.setData({
      'containerShow': true,
      'searchPanelShow': false,
      'searchResult': {}
    });
  },
  searchInfo: function(event) {
    var text = event.detail.value;
    const url = globalData.globalData.g_apiUrl + 'search?q=' + text;
    moviesComponent.getMovieData(url, function(data) {
      console.log(data);
    });
  }
})