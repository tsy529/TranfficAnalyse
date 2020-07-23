function CurrentRecord(longitude, latitude, name, current) {
  this.lng = longitude;
  this.lat = latitude;
  this.name = name;
  this.cur = current;
}

module.exports = CurrentRecord;