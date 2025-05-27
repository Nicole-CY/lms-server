const express = require("express");
require('express-async-errors');
const upload = require("../middlewares/uploadMedia");

const router = express.Router();

// upload
router.post("/uploadMedia", upload.fields([{ name: "file" }, { name: "thumbnail" }]), (req, res) => {
    try {
        const filePath = req.files?.file?.[0]?.path?.replace(/\\/g, "/");
        const thumbnailPath = req.files?.thumbnail?.[0]?.path?.replace(/\\/g, "/");

        return res.status(200).json({
            status: 1,
            message: "File(s) uploaded successfully",
            data: {
                filePath: `/${filePath}`,
                thumbnailPath: thumbnailPath ? `/${thumbnailPath}` : null,
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: 0, message: "Upload failed" });
    }
});

module.exports = router;
