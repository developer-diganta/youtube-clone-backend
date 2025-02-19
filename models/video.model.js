const mongoose = require("mongoose");

const videoModelSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    thumbnails: {
        type: Array,
        // required: true
    },
    description: {
        type: String,
        required: true
    },
    public:{
        type: Boolean,
        default: true
    },
    comments: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

const Video = mongoose.model("Video", videoModelSchema);
module.exports = Video;
