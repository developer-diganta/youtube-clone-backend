const { addVideoService } = require("../../services/Video/videoServices");

addVideo = async (req, res) => {
    const videoFile = req.files.videoFile[0]; // Video file
    const thumbnails = req.files.thumbnails || []; // Thumbnail files
    const userId = req.user.id;
    console.log(req.body)
    const videoDetails = {
        title: req.body.title,
        description: req.body.description,
        public: req.body.public,
        comments: req.body.comments
    }
    
    try {
        const response = await addVideoService(userId, videoFile, thumbnails, videoDetails);
        res.status(200).send("Video Uploaded")
    } catch (error) {
        console.log(error)
        res.status(500).send("Error in uploading video")
    }

}

module.exports = {
    addVideo
}