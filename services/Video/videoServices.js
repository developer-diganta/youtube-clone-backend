const { addVideoRepository } = require("../../repository/Video/videoRepository");
const minioClient = require("../../utils/minio.connections");

addVideoService = async (userId, videoFile, thumbnails, videoDetails) => {
    videoDetails.userId = userId
    const uploadResponse = await addVideoRepository(videoDetails);
    minioClient.fPutObject()
}

module.exports = {
    addVideoService
}