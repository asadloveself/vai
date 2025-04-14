import multer from "multer";
const storage = multer.memoryStorage()
const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png"]
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true)
        }
        else {
            cb(new Error("Only JPEG, JPG, and PNG are allowed"), false)
        }
    }
})

export default upload.fields([
    {
        name: "personalImage", maxCount: 1
    },
    {
        name: "nomineeImage", maxCount: 1
    }
])