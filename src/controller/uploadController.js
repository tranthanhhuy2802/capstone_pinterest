import multer, { diskStorage } from 'multer';
// import fs from 'fs'
export const upload = multer({
    storage: diskStorage({
        destination: process.cwd() + "/public/img", // đường dẫn mà file sẽ được lưu
        filename: (req, file, callback) => callback(null, new Date().getTime() + "_" + file.originalname)  // đổi tên file
    })
});

// export const toiUuHinh = (file) => {
//     let data = fs.readFileSync(process.cwd() + "/public/img/" + file.filename);

//     let base64 = `data:${file.mimetype};base64,` + Buffer.from(data).toString("base64");


//     return base64
// }