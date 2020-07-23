function ModeRecord(longitude, latitude, mode, time, speed, imsi) {
  this.time = time;
  this.imsi = imsi;
  this.lng = longitude;
  this.lat = latitude;
  this.speed = speed;
  this.mode = mode;
}

module.exports = ModeRecord;