import multer, { diskStorage } from 'multer';

export const upload = multer({
    storage: diskStorage({
        destination: process.cwd() + "/public/img", // đường dẫn mà file sẽ được lưu
        filename: (req, file, callback) => callback(null, new Date().getTime() + "_" + file.originalname)  // đổi tên file
    })
});