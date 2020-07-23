// miniprogram/pages/home/home.js

var _requestService = require("../../services/requestService.js");

var _contentNavigationService = require("../../services/contentNavigationService.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [],
    center_marker: null,
    goout_records: [],
    goout_imsi: '',
    aim_records: [],
    aim_imsi: '',
    mode_records: [],
    mode_imsi: '',
    current_records: [],
    polyline: [],
    showLine: true,
    hideLine: false,
    views: ["驻留分析", "出行方式", "出行目的", "人流密度"],
    viewIndex: 0,
    imsiInput: '',
    hideTools: true,
  },

  bindMoreTap: function(e) {
    if (this.data.hideTools == false) {
      this.toolAnimation.height('20px').step()
      this.setData({
        toolAnimation: this.toolAnimation.export(),
        hideTools: true,
        more_src: '/images/more_blue.png'
      })
    } else {
      this.toolAnimation.height('280px').step()
      this.setData({
        toolAnimation: this.toolAnimation.export(),
        hideTools: false,
        more_src: '/images/more_green.png'
      })
    }
    
  },

  bindImsiInput: function(e) {
    this.setData({
      imsiInput: e.detail.value
    });
  },

  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      viewIndex: e.detail.value
    })  
  },

  bindSearchTap: function(e) {
    
    this.setData({
      polyline: [],
      showLine: true,
      hideLine: false
    });
    
    if (this.data.viewIndex == 0) {
      //驻留分析
      if (this.data.imsiInput == '') {
        wx.showToast({
          title: '请输入imsi再查询',
          icon: 'none'
        })
      } else {
        this.setGooutMarkers();
      }
    } else if (this.data.viewIndex == 1) {
      //出行方式
      if (this.data.imsiInput == '') {
        wx.showToast({
          title: '请输入imsi再查询',
          icon: 'none'
        })
      } else {
        this.setModeMarkers();
      }
    } else if (this.data.viewIndex == 2) {
      //出行目的
      if (this.data.imsiInput == '') {
        wx.showToast({
          title: '请输入imsi再查询',
          icon: 'none'
        })
      } else {
        this.setAimMarkers();
      }
    } else if (this.data.viewIndex == 3) {
      //实时人流
      this.setCurrentMarkers();
    }
  },


  bindDetailTap: function(e) {
    if (this.data.viewIndex == 0) {
      //驻留分析
      _contentNavigationService.navigateToAsync(_contentNavigationService.gooutDetail, this.data.goout_records);
    } else if (this.data.viewIndex == 1) {
      //出行方式
      _contentNavigationService.navigateToAsync(_contentNavigationService.modeDetail, this.data.mode_records);
    } else if (this.data.viewIndex == 2) {
      //出行目的
      
    } else if (this.data.viewIndex == 3) {
      //实时人流
      _contentNavigationService.navigateToAsync(_contentNavigationService.currentDetail, this.data.current_records);
    }
  },

  bindShowLine: function(e) {
    var that = this;
    var points = [{
      latitude: null,
      longitude: null
    }];
    var records = this.data.goout_records;
    if (records.length == 0) {
      wx.showToast({
        title: '没有可显示的路径',
        icon: 'none'
      });
    } else {
      for (var i = 0; i < records.length; i++) {
        points[i] = {
          latitude: records[i].lat,
          longitude: records[i].lng
        }
      }
      that.setData({
        polyline: [{
          points: points,
          color: "#ff0000",
          width: 2
        }],
        showLine: false,
        hideLine: true
      });
      wx.showToast({
        title: '路径显示成功',
      });
    }
  },

  bindHideLine: function(e) {
    this.setData({
      polyline: [],
      showLine: true,
      hideLine: false
    });
    wx.showToast({
      title: '路径隐藏成功',
    })
  },

  onLoad: function (options) {
    //设置中心点
    var center = {
        latitude: 41.765,
        longitude: 123.419,
        iconPath: '../../images/site_red.png',
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
    };

    this.setData({
      center_marker: center,
      markers: [center]
    });

    //初始化动画
    this.toolAnimation = wx.createAnimation()
  },

  setGooutMarkers: function() { 
    var that = this;
    var center = this.data.center_marker;
    if (this.data.goout_imsi == this.data.imsiInput && this.data.goout_markers.length != 0) {
      this.setData({
        markers: this.data.goout_records
      });
      wx.showToast({title: '查询成功！'});
    } else {
      this.setData({
        goout_imsi: this.data.imsiInput
      });
      _requestService.getGooutRecordsByImsiAsync(this.data.imsiInput, function (records) {
        if (records.length == 0) {
          wx.showToast({
            title: '没有查询结果',
            icon: 'none'
          })
        } else {
          var goout_markers = [];
          for (var i = 0; i < records.length; i++) {
            if (records[i].label == 0) {
              goout_markers.push({
                latitude: records[i].lat,
                longitude: records[i].lng,
                iconPath: "../../images/site_red.png",
                width: 50,
                height: 50,
                callout: {
                  content: "居住:" + records[i].time,
                  fontSize: 13,
                  borderRadius: 5,
                  padding: 6,
                  display: 'BYCLICK',
                }
              });
            } else if (records[i].label == 1) {
              goout_markers.push({
                latitude: records[i].lat,
                longitude: records[i].lng,
                iconPath: "../../images/site_blue.png",
                width: 50,
                height: 50,
                callout: {
                  content: "出行:" + records[i].time,
                  fontSize: 13,
                  borderRadius: 5,
                  padding: 6,
                  display: 'BYCLICK',
                }
              });
            }
          }
          that.setData({
            goout_records: records,
            markers: goout_markers
          });
          wx.showToast({title: '查询成功！'});
        }
      });
    }
  },

  setModeMarkers: function() {
    var that = this;
    if (this.data.mode_imsi == this.data.imsiInput && this.data.mode_records.length != 0) {
      this.setData({
        markers: this.data.mode_records
      });
      wx.showToast({title: '查询成功！'});
    } else {
      _requestService.getModeRecordsByImsiAsync(this.data.imsiInput, function(records) {
        if (records.length == 0) {
          wx.showToast({
            title: '没有查询结果',
            icon: 'none'
          })
        } else {
          var mode_markers = [];
          for (var i = 1; i < records.length; i++) {
            mode_markers.push({
              latitude: records[i].lat,
              longitude: records[i].lng,
              iconPath: "../../images/"+ records[i].mode + ".png",
              width: 50,
              height: 50,
              callout: {
                content: "出行时间:" + records[i].time,
                fontSize: 13,
                borderRadius: 5,
                padding: 6,
                display: 'BYCLICK',
              }
            });
          }
          that.setData({
            mode_records: records,
            markers: mode_markers
          });
          wx.showToast({title: '查询成功！'});
        }
      });
    }
  },

  setAimMarkers: function() {
    var that = this;
    if (this.data.aim_imsi == this.data.imsiInput && this.data.aim_records.length != 0) {
      this.setData({
        markers: this.data.aim_records
      });
      wx.showToast({title: '查询成功！'});
    } else {
      _requestService.getAimRecordsByImsiAsync(this.data.imsiInput, function(records) {
        if (records.length == 0) {
          wx.showToast({
            title: '没有查询结果',
            icon: 'none'
          })
        } else {
          var aim_markers = [];
          for (var i = 1; i < records.length; i++) {
            aim_markers.push({
              latitude: records[i].lat,
              longitude: records[i].lng,
              iconPath: "../../images/site_blue.png",
              width: 50,
              height: 50,
              callout: {
                content: "目的地",
                fontSize: 13,
                borderRadius: 5,
                padding: 6,
                display: 'BYCLICK',
              }
            });
          }
          that.setData({
            aim_records: records,
            markers: aim_markers
          });
          wx.showToast({title: '查询成功！'});
        }
      });
    }
  },
  
  setCurrentMarkers: function() {
    var that = this;
    _requestService.getCurrentRecordsAsync(function(records) {
      if (records.length == 0) {
        wx.showToast({
          title: '没有查询结果',
          icon: 'none'
        });
      } else {
        var current_markers = [];
        for (var i = 0; i < records.length; i++) {
          current_markers.push({
            latitude: records[i].lat,
            longitude: records[i].lng,
            iconPath: "../../images/site_red.png",
            width: 50,
            height: 50,
            callout: {
              content: records[i].name + " 当前人数:" + records[i].cur,
              fontSize: 13,
              borderRadius: 5,
              padding: 6,
              display: 'ALWAYS',
            }
          });
        }
        that.setData({
          current_records: records,
          markers: current_markers
        });
      }
    });
  },
})