const Minio = require('minio');

const minioClient = new Minio.Client({
    endPoint: '127.0.0.1', // or 'localhost' if MinIO is running locally
    port: 9000,            // MinIO API port
    useSSL: false,         // Set to true if using HTTPS
    accessKey: 'minioadmin', // Default access key (change if needed)
    secretKey: 'minioadmin'  // Default secret key (change if needed)
});

module.exports = minioClient;