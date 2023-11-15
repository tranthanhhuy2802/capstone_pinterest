import express from 'express';
import { getAllPicture, getCheckSavePicture, getCmtByPictureId, getInfoPictureAndUserByPictureId, getPictureByName, postCmt } from '../controller/pictureController.js';
import { checkApi } from '../config/jwt.js';


const pictureRoute = express.Router();

pictureRoute.get('/get-all-picture', checkApi, getAllPicture);
pictureRoute.get('/get-picture-by-name/:name', checkApi, getPictureByName);
pictureRoute.get('/get-picture-by-picid/:id', checkApi, getInfoPictureAndUserByPictureId);
pictureRoute.get('/get-cmt-by-picid/:id', checkApi, getCmtByPictureId);
pictureRoute.get('/get-check-save-picture/:id', checkApi, getCheckSavePicture);
pictureRoute.post("/post-cmt", checkApi, postCmt)
export default pictureRoute;