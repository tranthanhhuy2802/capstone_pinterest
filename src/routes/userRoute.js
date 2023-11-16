import express from "express";
import { deletePictureByPictureId, getInfoUser, getInfoUserById, getPictureByUserId, getSavePictureByUserId, registerUser, updateUser, uploadAvatar, userLogin } from "../controller/userController.js";
import { checkApi } from "../config/jwt.js";
import { upload } from "../controller/uploadController.js";

const userRoute = express.Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", userLogin);
userRoute.get("/get-info-user/:id", checkApi, getInfoUserById);
userRoute.get("/get-info-user", checkApi, getInfoUser);

userRoute.get('/get-save-picture-by-userId/:id', checkApi, getSavePictureByUserId)
userRoute.get('/get-picture-by-userId/:id', checkApi, getPictureByUserId)
userRoute.delete('/detele-picture-by-picid/:id', checkApi, deletePictureByPictureId)
// userRoute.put('/update-user/:id', checkApi, updateUser)
userRoute.put('/update-user', checkApi, updateUser)
userRoute.put("/upload-avatar", upload.single("file"), uploadAvatar)

export default userRoute;
