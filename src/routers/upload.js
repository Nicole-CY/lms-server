const path = require('path');
const fs = require('fs');

const express = require('express');
const multer = require('multer');

const router = express.Router();

// configure storage to save files to the 'public/images/courses' directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../../public/images/courses');
        // make sure the directory exists
        fs.mkdirSync(uploadDir, { recursive: true });
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext);
        cb(null, `${name}-${Date.now()}${ext}`);
    },
});

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5, // <= 5MB
    },
    fileFilter: (req, file, cb) => {
        const allowed = ['.jpg', '.jpeg', '.png'];
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowed.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error('Only jpg/jpeg/png allowed'));
        }
    },
});

router.post('/upload', upload.single('file'), (req, res) => {
    console.log('Upload request received', {
        body: req.body,
        file: req.file
            ? {
                  filename: req.file.filename,
                  path: req.file.path,
                  mimetype: req.file.mimetype,
                  size: req.file.size,
              }
            : null,
    });

    if (!req.file) {
        return res.status(400).json({ status: 0, message: 'No file uploaded' });
    }
    const fileUrl = `/images/courses/${req.file.filename}`;
    console.log('Upload successful, returning URL:', fileUrl);
    res.json({ status: 1, message: 'File uploaded successfully', data: { url: fileUrl } });
});

router.use((err, req, res, next) => {
    console.error('upload error:', err);
    res.status(400).json({ status: 0, message: err.message || 'Upload failed' });
});

module.exports = router;
