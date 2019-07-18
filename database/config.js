// Load Config model
const Config = require('../database/Config.model');

const getAllConfigs = () => {
  return Config.find({});
}

const addConfig = (key, values) => {
  const config = new Config({ key, values });
  return config.save();
}

const updateConfig = (id, key, values) => {
  return Config.findByIdAndUpdate(id, {key, values});
}

const deleteConfig = id => {
  return Config.findByIdAndRemove(id);
}

const searchConfigByKey = key => {
  return Config.find({ key: { $regex: `${key}` } });
}

module.exports = {
  getAllConfigs,
  addConfig,
  updateConfig,
  deleteConfig,
  searchConfigByKey
}