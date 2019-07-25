const Banner = require('./Banner.model');

const getAllBanners = () => {
  return Banner.find({});
}

const addBanner = input => {
  const banner = new Banner({
    image: input.image,
    action: input.action,
    payload: input.payload
  });
  return banner.save();
}

const updateBanner = (id, input) => {
  console.log(id, input)
  return Banner.findByIdAndUpdate(id, {
    image: input.image,
    action: input.action,
    payload: input.payload
  });
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