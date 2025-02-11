const { addVideoRepository } = require("../../repository/Video/videoRepository");
const { saveFile } = require("../../utils/bucketOperations");
const minioClient = require("../../utils/minio.connections");
const { v4: uuidv4 } = require('uuid');
addVideoService = async (userId, videoFile, thumbnails, videoDetails) => {
    videoDetails.userId = userId
    const bucketName = "videobucket";
    const videoId = uuidv4();
    const objectName = `${userId}/${videoId}/${videoFile.originalname}`; // Path inside MinIO

    const x = await saveFile(bucketName, objectName, videoFile);
    console.log(x)
    return
    // const uploadResponse = await addVideoRepository(videoDetails);
}

module.exports = {
    addVideoService
}