require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("Testing Cloudinary Connection...");
console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);

cloudinary.api.ping()
    .then(res => {
        console.log("✅ Cloudinary Connection Successful!");
        console.log(res);
    })
    .catch(err => {
        console.error("❌ Cloudinary Connection Failed:");
        console.error(err);
    });
