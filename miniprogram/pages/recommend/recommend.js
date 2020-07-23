// miniprogram/pages/recommend/recommend.js

var _requestService = require("../../services/requestService.js");

var _contentNavigationService = require("../../services/contentNavigationService.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    status: "",
    parameter: {}
  },

  _where: null,

  _canLoadMore: false,

  PageSize: 20,

  Loading: "正在载入",

  NoResult: "没有满足条件的结果",

  NoMoreResult: "没有更多结果",

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var result =  _contentNavigationService.getParameter(_contentNavigationService.recommend);
    this.setData({
      parameter: result.parameter
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      items: []
    });
    this._canLoadMore = true;
    this.loadMore();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  loadMore: function() {
    var that = this;
    if (!this._canLoadMore) return;
    this.setData({
      status: this.Loading
    });

    _requestService.getRecommendAsync(this.data.parameter ,this.data.items.length, this.PageSize, function(res) {
      that.setData({
        items: that.data.items.concat(res),
        status: ""
      });

      if (res.length < that.PageSize) {
        that._canLoadMore = false;
        that.setData({
          status: that.NoMoreResult
        });
      }

      if (res.length == 0 && that.data.items.length == 0) {
        that.setData({
          status: that.NoResult
        });
      }
    })
  }
})