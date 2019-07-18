const Banner = require('./Banner.model');

const getAllBanners = () => {
  return Banner.find({});
}

const addBanner = image => {
  const banner = new Banner({ image });
  return banner.save();
}

const updateBanner = (id, image) => {
  return Banner.findByIdAndUpdate(id, { image });
}

const deleteBanner = id => {
  return Banner.findByIdAndRemove(id);
}

module.exports = {
  getAllBanners,
  addBanner,
  updateBanner,
  deleteBanner
}