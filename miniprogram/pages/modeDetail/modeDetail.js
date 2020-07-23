// miniprogram/pages/modeDetail/modeDetail.js
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
    ec_prop: {},
    records: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var result =  _contentNavigationService.getParameter(_contentNavigationService.modeDetail);
    this.setData({
      records: result.parameter
    });
  },

  echartInit_count: function(e) {
    var modeCount = this.getAvg();
    var option = {
      title: {
        text: '平均速度',
      },
      xAxis: {
          type: 'category',
          data: ['走路', '跑步', '自行车', '汽车', '火车']
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: modeCount,
          type: 'bar'
      }]
    }
    initChart(e.detail.canvas, e.detail.width, e.detail.height, option);
  },

  echartInit_prop: function(e) {
    var modeCount = this.getModeCount();
    var option = {
      title: {
          text: '方式占比',
      },
      tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
          data: ['走路', '跑步', '自行车', '汽车', '火车'],
          orient: 'vertical',
          right: 5
      },
      series: [
          {
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                  {value: modeCount[0], name: '走路'},
                  {value: modeCount[1], name: '跑步'},
                  {value: modeCount[2], name: '自行车'},
                  {value: modeCount[3], name: '汽车'},
                  {value: modeCount[4], name: '火车'}
              ],
              emphasis: {
                  itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
              }
          }
      ]
    };
    initChart(e.detail.canvas, e.detail.width, e.detail.height, option);
  },
  
  getModeCount: function() {
    var records = this.data.records;
    var modeCount = [0, 0, 0, 0, 0];
    for (var i = 0; i < records.length; i++) {
      if (records[i].mode == 'zoulu') {
        modeCount[0]++;
      } else if (records[i].mode == 'paobu') {
        modeCount[1]++;
      } else if (records[i].mode == 'zixingche') {
        modeCount[2]++;
      } else if (records[i].mode == 'qiche') {
        modeCount[3]++;
      } else if (records[i].mode == 'huoche') {
        modeCount[4]++;
      }
    }
    return modeCount;
  },

  getAvg: function() {
    var records = this.data.records;
    var count = this.getModeCount();
    var sum = [0, 0, 0, 0, 0];
    var avg = [0, 0, 0, 0, 0];
    for (var i = 0; i < records.length; i++) {
      if (records[i].mode == 'zoulu') {
        sum[0] += parseFloat(records[i].speed);
      } else if (records[i].mode == 'paobu') {
        sum[1] += parseFloat(records[i].speed);
      } else if (records[i].mode == 'zixingche') {
        sum[2] += parseFloat(records[i].speed);
      } else if (records[i].mode == 'qiche') {
        sum[3] += parseFloat(records[i].speed);
      } else if (records[i].mode == 'huoche') {
        sum[4] += parseFloat(records[i].speed);
      }
    }
    for (var i = 0; i < sum.length; i++) {
      avg[i] = (sum[i] / count[i]).toFixed(2);
    }
    return avg;
  }
})