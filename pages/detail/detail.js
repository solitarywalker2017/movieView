var data = require('../../data/data.js');
var globalData = getApp();
Page({
  data: {
    'currentID': 0,
    'msgDetail': {},
    'isCollected': false,
    'isMusicPlaying': false
  },
  onLoad: function(options) {
    var currentID = options.id;
    this.setData({
      'msgDetail': data.newsList[currentID],
      'currentID': currentID
    });

    // 文章收藏状态
    var isCollectedList = wx.getStorageSync('isCollectedList');
    if (isCollectedList) {
      var collectedStatus = isCollectedList[currentID];
      if (collectedStatus) {
        this.setData({
          'isCollected': collectedStatus
        });
      }
    } else {
      isCollectedList = {};
      isCollectedList[currentID] = this.data.isCollected;
      wx.setStorageSync('isCollectedList', isCollectedList);
    }
    if (globalData.globalData.g_isPlayingMusic && globalData.globalData.g_currentMusicID == currentID) {
      this.setData({
        isMusicPlaying: true
      });
    }
    // 音乐播放功能
    this.setAudioMonitor();
  },

  setAudioMonitor: function() {
    var that = this;
    wx.onBackgroundAudioPlay(function() {
      that.setData({
        isMusicPlaying: true
      });
      globalData.globalData.g_isPlayingMusic = true;
      globalData.globalData.g_currentMusicID = that.data.currentID;
    });
    wx.onBackgroundAudioPause(function() {
      that.setData({
        isMusicPlaying: false
      });
      globalData.globalData.g_isPlayingMusic = false;
      globalData.globalData.g_currentMusicID = 0;
    });
    wx.onBackgroundAudioStop(function () {
      that.setData({
        isMusicPlaying: false
      });
      globalData.globalData.g_isPlayingMusic = false;
      globalData.globalData.g_currentMusicID = 0;
    });
  },

  collectArticle: function() {
    var isCollectedList = wx.getStorageSync('isCollectedList'),
      collectionStatus = isCollectedList[this.data.currentID];
    isCollectedList[this.data.currentID] = !collectionStatus;
    wx.setStorageSync('isCollectedList', isCollectedList);
    this.setData({
      'isCollected': !collectionStatus
    });
    wx.showToast({
      title: !collectionStatus ? '收藏成功' : '取消成功！',
      icon: 'success',
      duration: 2000
    });
  },
  controlMusic: function() {
    var music = this.data.msgDetail.music;
    if (this.data.isMusicPlaying) {
      wx.pauseBackgroundAudio();
      this.setData({
        'isMusicPlaying': false
      });
    } else {
      wx.playBackgroundAudio({
        dataUrl: music.url,
        title: music.title,
        coverImgUrl: music.coverImg
      });
      this.setData({
        'isMusicPlaying': true
      });
    }
  }
})