// miniprogram/pages/home/home.js

var _storage = require("../../services/storageService.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [],
    polyline: [],
    views: ["驻留分析", "出行方式", "出行目的", "人流密度"],
    viewIndex: 0
  },

  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      viewIndex: e.detail.value
    })  
  },

  showLine: function(res) {
    var that = this;
    var res_points = [{
      latitude: null,
      longitude: null
    }];
    _storage.getSitesAsync(function (sites) {
      for (var i = 0; i < sites.length; i++) {
        res_points[i] = {
          latitude: sites[i].lat,
          longitude: sites[i].lng
        }
      }
      that.setData({
        polyline: [{
          points: res_points,
          color: "#ff0000",
          width: 4
        }]
      });
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      markers: [
        {
          latitude: 41.8078804,
          longitude: 123.4119873,
          iconPath: '../../images/site.png',
          width: 50,
          height: 50,
          callout: {
            content: "当前位置",
            fontSize: 13,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#ff0000',
            padding: 6,
            display: 'ALWAYS',
          }
        }
      ]
    });

    _storage.getSitesAsync(function (sites) {
      for (var i = 0; i < sites.length; i++) {
        let lat = sites[i].lat;
        let lng = sites[i].lng;
        var index = "markers[" + (i + 1) + "]";
        that.setData({
          [index]:{
            latitude: lat,
            longitude: lng,
            iconPath: '../../images/site.png',
            width: 50,
            height: 50,
            callout: {
              content: "驻留结果",
              fontSize: 13,
              borderRadius: 5,
              padding: 6,
              display: 'BYCLICK',
            }
          }
        });
      }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})