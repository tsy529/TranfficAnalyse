// miniprogram/pages/gooutDetail/gooutDetail.js
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
    ec_time: {},
    ec_prop: {},
    records: [],
    out: [],
    live: [],
    xAxisData: ['0', '2', '4', '6', '8', '10-', '12', '14', '16', '18', '20', '22', '24']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var result =  _contentNavigationService.getParameter(_contentNavigationService.gooutDetail);
    this.setData({
      records: result.parameter
    });
    this.getCountByTime();
  },

  echartInit_time: function(e) {
    
    var option = {
      title: {
          text: '时间分布'
      },
      legend: {
          data: ['居住', '出行']
      },
      toolbox: {
          feature: {
              magicType: {
                  type: ['stack', 'tiled']
              },
              dataView: {},
              saveAsImage: {
                  pixelRatio: 2
              }
          }
      },
      tooltip: {},
      xAxis: {
          data: this.data.xAxisData,
          splitLine: {
              show: false
          }
      },
      yAxis: {
      },
      series: [{
          name: '居住',
          type: 'bar',
          data: this.data.live,
          animationDelay: function (idx) {
              return idx * 10;
          }
      }, {
          name: '出行',
          type: 'bar',
          data: this.data.out,
          animationDelay: function (idx) {
              return idx * 10 + 100;
          }
      }],
      animationEasing: 'elasticOut',
      animationDelayUpdate: function (idx) {
        return idx * 5;
      }
    };
    initChart(e.detail.canvas, e.detail.width, e.detail.height, option);
  },

  echartInit_prop: function(e) {
    var live_sum = 0;
    var out_sum = 0;
    var live = this.data.live;
    var out = this.data.out;

    for (var i = 0; i < live.length; i++) {
      live_sum += live[i];
      out_sum += out[i];
    }

    var option = {
      title: {
          text: '住行比例',
      },
      tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
          data: ['居住', '出行']
      },
      series: [
          {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                  {value: live_sum, name: '居住'},
                  {value: out_sum, name: '出行'}
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

  getCountByTime: function () {
    var records = this.data.records;
    var out = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var live = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  
    for (var i = 0; i < records.length; i++) {
      var hour = records[i].time.substring(8, 10);
      if (records[i].label == 0) {
        live[parseInt(hour / 2)]++;
      } else if (records[i].label == 1) {
        out[parseInt(hour / 2)]++;
      }
    }

    this.setData({
      out: out,
      live: live
    });
  },

})
