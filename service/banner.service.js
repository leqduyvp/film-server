const { getAllBannersFromCache, setAllBannersToCache } = require('../service/banner.cache');
const { getAllBanners, addBanner, updateBanner, deleteBanner } = require('../database/banner');
const { checkString } = require('../utils/checkString');

const checkBannerService = imageLink => {
  let error = {
    isError: false,
    errorMessage: {}
  }

  const err = checkString(imageLink);

  if (err.isError) {
    error.isError = true;
    error.errorMessage.image = 'image link ' + err.message;

    return error;
  }

  return error;
}

const checkIdService = id => {
  let error = {
    isError: false,
    errorMessage: {}
  }

  const err = checkString(id);

  if (err.isError) {
    error.isError = true;
    error.errorMessage.id = 'id ' + err.message;

    return error;
  }

  return error;
}

const getAllBannersService = async () => {
  let error = {
    isError: false,
    errorMessage: {}
  }

  try {
    // Check all banners in cache
    console.log('Get allBanners from cache')
    let banners = await getAllBannersFromCache();
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

const addBannerService = async imageLink => {
  let error = {
    isError: false,
    errorMessage: {}
  }

  try {
    await addBanner(imageLink);

    // Update in cache

    return error;
  } catch (err) {
    error.isError = true;
    error.errorMessage.database = err.message;

    return error;
  }
}

const updateBannerService = async (id, imageLink) => {
  let error = {
    isError: false,
    errorMessage: {}
  };

  try {
    // Store data to database
    await updateBanner(id, imageLink);

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
  checkBannerService,
  checkIdService,
  getAllBannersService,
  addBannerService,
  updateBannerService,
  deleteBannerService
}