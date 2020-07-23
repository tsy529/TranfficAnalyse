var GooutRecord = require("../entity/GooutRecord.js");
var ModeRecord = require("../entity/ModeRecord.js");
var AimRecord = require("../entity/AimRecord.js");
var CurrentRecord = require("../entity/CurrentRecord.js");
var RecommendItem = require("../entity/RecommendItem.js");

var requestService = {
  getGooutRecordsByImsiAsync: function(imsi, callback) {
    wx.request({
      url: 'http://localhost:8080/MyServlet/GooutServlet',
      data: {
        imsi: imsi
      },
      method: 'GET',
      success: function(res) {
        console.log(res);
        var records = [];
        for (var i = 0; i < res.data.length; i++) {
          var record = new GooutRecord(
            res.data[i].longitude,
            res.data[i].latitude,
            res.data[i].label,
            res.data[i].time,
            res.data[i].seq,
            res.data[i].imsi
          );
          records.push(record);
        }
        callback(records);
      }
    });
  },

  getModeRecordsByImsiAsync: function(imsi, callback) {
    wx.request({
      url: 'http://localhost:8080/MyServlet/ModeServlet',
      data: {
        imsi: imsi
      },
      method: 'GET',
      success: function(res) {
        console.log(res);
        var records = [];
        for (var i = 0; i < res.data.length; i++) {
          var record = new ModeRecord(
            res.data[i].longitude,
            res.data[i].latitude,
            res.data[i].mode,
            res.data[i].time,
            res.data[i].speed,
            res.data[i].imsi
          );
          records.push(record);
        }
        callback(records);
      }
    });
  },

  getAimRecordsByImsiAsync: function(imsi, callback) {
    wx.request({
      url: 'http://localhost:8080/MyServlet/AimServlet',
      data: {
        imsi: imsi
      },
      method: 'GET',
      success: function(res) {
        console.log(res);
        var records = [];
        for (var i = 0; i < res.data.length; i++) {
          var record = new AimRecord(
            res.data[i].longitude,
            res.data[i].latitude,
            res.data[i].imsi
          );
          records.push(record);
        }
        callback(records);
      }
    });
  },

  getCurrentRecordsAsync: function(callback) {
    wx.request({
      url: 'http://localhost:8080/MyServlet/CurrentServlet',
      method: 'GET',
      success: function(res) {
        console.log(res);
        var records = [];
        for(var i = 0; i < res.data.length; i++) {
          var record = new CurrentRecord(
            res.data[i].longitude,
            res.data[i].latitude,
            res.data[i].name,
            res.data[i].current
          );
          records.push(record);
        }
        callback(records);
      }
    });
  },

  getRecommendAsync: function(parameter, skip, take, callback) {
    var currentPage = parseInt(skip / take);

    wx.request({
      url: 'https://restapi.amap.com/v3/place/around',
      data: {
        key: 'e36cd1926e2e004c2a3cff98eafebdc9',
        //location: '116.473168,39.993015',
        location: parameter.location,
        radius: '10000',
        types: parameter.type,
        offset: take,
        page: currentPage
      },
      method: 'GET',
      success: function(res) {
        var items = [];
        var pois = res.data.pois;
        for (var i = 0; i < pois.length; i++) {
          var item = new RecommendItem(
            pois[i].name,
            pois[i].type,
            pois[i].address,
            pois[i].photos
          )
          items.push(item)
        }
        callback(items);
      }
    })
  }
}

module.exports = requestService;