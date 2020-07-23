function GooutRecord(longitude, latitude, label, time, index, imsi) {
  this.lng = longitude;
  this.lat = latitude;
  this.label = label;
  this.time = time;
  this.index = index;
  this.imsi = imsi;
}

module.exports = GooutRecord;