const { getAllBannersFromCache, setAllBannersToCache } = require('../service/banner.cache');
const { getAllBanners, addBanner, updateBanner, deleteBanner } = require('../database/banner');

const getAllBannersService = async () => {
  let error = {
    isError: false,
    errorMessage: {}
  }

  try {
    let banners = [];

    // Check all banners in cache
    console.log('Get allBanners from cache')
    banners = await getAllBannersFromCache();
    if (banners) {
      return {
        error,
        banners
      };
    }

    // If there aren't banners in cache, get in database
    console.log('Get allBanners from db')
    banners = await getAllBanners();

    // Set banners to cache
    console.log('Set allBanners to cache');
    setAllBannersToCache(banners);

    return {
      error,
      banners
    };

  } catch (err) {
    error.isError = true;
    error.errorMessage.database = err.message;

    return {
      error
    };
  }
}

const addBannerService = async input => {
  let error = {
    isError: false,
    errorMessage: {}
  }

  try {
    await addBanner(input);

    // Update in cache

    return error;
  } catch (err) {
    error.isError = true;
    error.errorMessage.database = err.message;

    return error;
  }
}

const updateBannerService = async (id, input) => {
  let error = {
    isError: false,
    errorMessage: {}
  };

  try {
    // Store data to database
    await updateBanner(id, input);

    // Update data in cache

    return error;
  } catch (err) {
    error.isError = true;
    error.errorMessage.database = err.message;

    return error;
  }
}

const deleteBannerService = async id => {
  let error = {
    isError: false,
    errorMessage: {}
  };

  try {
    // Delete in database
    await deleteBanner(id);

    // Delete in cache

    return error;
  } catch (err) {
    error.isError = true;
    error.errorMessage.database = err.message;

    return error;
  }
}

module.exports = {
  getAllBannersService,
  addBannerService,
  updateBannerService,
  deleteBannerService
}