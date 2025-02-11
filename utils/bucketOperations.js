const minioClient = require("./minio.connections");

const saveFile = async (
    bucketName,
    objectName,
    file
) => {
    return await minioClient.putObject(
        bucketName,
        objectName,
        file.buffer,
        file.size,
        { "Content-Type": file.mimetype }
    );
}

module.exports = {
    saveFile
}