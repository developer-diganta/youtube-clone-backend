const { addVideoService } = require("../../services/Video/videoServices");

addVideo = async (req, res) => {
    const videoFile = req.files.videoFile[0]; // Video file
    const thumbnails = req.files.thumbnails || []; // Thumbnail files
    const userId = req.user.id;
    console.log(req.body)
    
    try {
        const response = await addVideoService(userId, videoFile, thumbnails, req.body.videoDetails);
        res.status(200).send("Video Uploaded")
    } catch (error) {
        console.log(error)
        res.status(500).send("Error in uploading video")
    }

}

module.exports = {
    addVideo
}