import express from "express";
import userRoot from "./userRoute.js";
import pictureRoute from "./pictureRoute.js";


const rootRoute = express.Router();
rootRoute.use("/user", userRoot);
rootRoute.use("/picture", pictureRoute);

export default rootRoute;
