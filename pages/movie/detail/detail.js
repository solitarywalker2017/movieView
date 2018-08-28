const globalData = getApp();
let moviesComponent = require('../../../utils/movie.js'),
  castComponent = require('../../../utils/cast.js'),
  starComponent = require('../../../utils/star.js');
Page({
  data: {
    'movieDetail': {}
  },
  onLoad: function(options) {
    let mid = options.mid;
    const url = globalData.globalData.g_apiUrl + 'subject/' + mid;
    moviesComponent.getMovieData(url, this.handleCallback);
  },
  handleCallback: function(result) {
    var res = result.data;
    var director = {
      avatar: '',
      name: '',
      id: 0
    };
    if (res.directors[0] != null) {
      director.avatar = res.directors[0].avatars.large;
    }
    director.name = res.directors[0].name;
    director.id = res.directors[0].id;
    let movieDetail = {
      movieImg: res.images ? res.images.large : '',
      country: res.countries[0],
      title: res.title,
      originalTitle: res.original_title,
      wishCount: res.comments_count,
      commentsCount:res.comments_count,
      year: res.year,
      genres: res.genres.join("  "),
      rating: {
        'average': res.rating.average,
        'stars': starComponent.constrcutStars(res.rating.stars)
      },
      director: director,
      casts: castComponent.constructCast(res.casts),
      castsInfo: castComponent.constructCastInfo(res.casts),
      summary: res.summary
    };
    this.setData({
      movieDetail: movieDetail
    });
  }
})