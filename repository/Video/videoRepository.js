const Video = require("../../models/video.model");

const addVideoRepository = async (videoDetails) => await Video.create(videoDetails).exec();

module.exports = {
    addVideoRepository
}