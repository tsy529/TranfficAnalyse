function RecommendItem(name, type, address, photos) {
  this.name = name;
  this.type = type;
  this.address = address;
  if (photos.length != 0) {
    this.image = photos[0].url;
  } else {
    this.image = "/images/暂无数据.png";
  }
}

module.exports = RecommendItem;