const Video = require("../../models/video.model");

const addVideoRepository = async (videoDetails) => await Video.create(videoDetails);

const getVideosOfUserRepository = async (userId) => await Video.find({
    userId
})
module.exports = {
    addVideoRepository,
    getVideosOfUserRepository
}