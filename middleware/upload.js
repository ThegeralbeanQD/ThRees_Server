const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("post_image");

module.exports = upload;
