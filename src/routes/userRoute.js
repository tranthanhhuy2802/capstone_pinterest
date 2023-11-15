import express from "express";
import { deletePictureByPictureId, getInfoUser, getInfoUserById, getPictureByUserId, getSavePictureByUserId, registerUser, updateUser, userLogin } from "../controller/userController.js";
import { checkApi } from "../config/jwt.js";

const userRoot = express.Router();

userRoot.post("/register", registerUser);
userRoot.post("/login", userLogin);
userRoot.get("/get-info-user/:id", checkApi, getInfoUserById);
userRoot.get("/get-info-user", checkApi, getInfoUser);

userRoot.get('/get-save-picture-by-userId/:id', checkApi, getSavePictureByUserId)
userRoot.get('/get-picture-by-userId/:id', checkApi, getPictureByUserId)
userRoot.delete('/detele-picture-by-picid/:id', checkApi, deletePictureByPictureId)
// userRoot.put('/update-user/:id', checkApi, updateUser)
userRoot.put('/update-user', checkApi, updateUser)

export default userRoot;
