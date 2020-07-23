// miniprogram/pages/currentDetail/currentDetail.js
import * as echarts from '../../ec-canvas/echarts'
var chart = null;

var _contentNavigationService = require("../../services/contentNavigationService.js");

function initChart(canvas, width, height, option) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  var option = option;
  chart.setOption(option);
  return chart;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec_count: {},
    records: [],
    blocks: ["太原街", "北站", "中街", "棋盘山", "世博园"],
    blockIndex: 0,
    types: ["餐饮", "购物", "风景名胜", "休闲体育"],
    typeIndex: 0
  },

  bindBlockChange: function(e) {
    console.log('block发送选择改变，携带值为', e.detail.value)
    this.setData({
      blockIndex: e.detail.value
    })  
  },

  bindTypeChange: function(e) {
    console.log('type发送选择改变，携带值为', e.detail.value)
    this.setData({
      typeIndex: e.detail.value
    })  
  },

  bindRecommendTap: function(e) {
    var location = this.data.records[this.data.blockIndex].lng + ',' + this.data.records[this.data.blockIndex].lat;
    var type = '';
    if (this.data.typeIndex == 0) {type = '050000'}
    else if (this.data.typeIndex == 1) {type = '060000'}
    else if (this.data.typeIndex == 2) {type = '110000'}
    else if (this.data.typeIndex == 3) {type = '080000'}
    _contentNavigationService.navigateToAsync(_contentNavigationService.recommend, {
      location: location,
      type: type
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var result =  _contentNavigationService.getParameter(_contentNavigationService.currentDetail);
    this.setData({
      records: result.parameter
    });
  },

  echartInit_count: function(e) {
    var count = [];
    var data = this.data.blocks;
    var records = this.data.records;
    for (var i = 0; i < records.length; i++) {
      count.push(records[i].cur);
    }
    var option = {
      title: {
        text: '区域计数',
      },
      xAxis: {
          type: 'category',
          data: data,
          axisLabel: {interval: 0},
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: count,
          type: 'bar'
      }]
    }
    initChart(e.detail.canvas, e.detail.width, e.detail.height, option);
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