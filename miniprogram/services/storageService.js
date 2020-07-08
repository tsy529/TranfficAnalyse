wx.cloud.init();

var storage = {
  db: wx.cloud.database(),

  getSitesAsync: function(callback) {
    this.dataCollection.get({
      success: function(result) {
        callback(result.data);
      }
    });
  },
};

storage.dataCollection = storage.db.collection("sites");

module.exports = storage;