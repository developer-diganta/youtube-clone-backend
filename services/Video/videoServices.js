const { addVideoRepository, getVideosOfUserRepository } = require("../../repository/Video/videoRepository");
const { saveFile } = require("../../utils/bucketOperations");
const minioClient = require("../../utils/minio.connections");
const { v4: uuidv4 } = require('uuid');
addVideoService = async (userId, videoFile, thumbnails, videoDetails) => {
    videoDetails.userId = userId
    const bucketName = "videobucket";
    const videoId = uuidv4();
    const objectName = `${userId}/${videoId}/${videoFile.originalname}`; // Path inside MinIO

    const x = await saveFile(bucketName, objectName, videoFile);
    videoDetails.filePath = `${bucketName}/${userId}/${videoId}/${videoFile.originalname}`
    const uploadResponse = await addVideoRepository(videoDetails);
    return uploadResponse
}

getVideosOfUserService = async (userId) => {
    return await getVideosOfUserRepository(userId);
}

module.exports = {
    addVideoService,
    getVideosOfUserService
}