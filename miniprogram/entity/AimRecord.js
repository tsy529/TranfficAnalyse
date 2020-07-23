function AimRecord(longitude, latitude, imsi) {
  this.imsi = imsi;
  this.lng = longitude;
  this.lat = latitude;
}

module.exports = AimRecord;